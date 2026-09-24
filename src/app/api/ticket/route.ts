import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildTicketNotificationEmail,
  buildTicketAckEmail,
} from "@/lib/ticket-email";
import { createTicketPage } from "@/lib/notion-tickets";
import { sendTelegramTicketAlert } from "@/lib/telegram-notify";
import { echeanceSla, formatEcheance } from "@/lib/sla";
import { sla } from "@/data/sav";
import type { PalierId, CriticitéId } from "@/data/sav";

// ── Rate limiting : 5 envois / 10 min / IP ───────────────────
const rateLimit = new Map<string, number[]>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateLimit.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_REQUESTS) return true;
  hits.push(now);
  rateLimit.set(ip, hits);
  return false;
}

// ── Labels ───────────────────────────────────────────────────

const CRITICITE_LABELS: Record<string, string> = {
  P1: "Critique",
  P2: "Majeure",
  P3: "Mineure",
  P4: "Evolution",
};

const PALIER_LABELS: Record<string, string> = {
  serenite: "Sérénité",
  croissance: "Croissance",
  partenaire: "Partenaire",
  non_client: "Non client",
};

const VALID_CRITICITES = ["P1", "P2", "P3", "P4"] as const;
const VALID_PALIERS = ["serenite", "croissance", "partenaire", "non_client"] as const;

// ── Référence de ticket ───────────────────────────────────────

function generateReference(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hex = crypto.randomUUID().replace(/-/g, "").slice(0, 4).toUpperCase();
  return `SAV-${yy}${mm}${dd}-${hex}`;
}

// ── Délai SLA selon palier + criticité ───────────────────────

function getDelaiPriseEnCharge(palier: string, criticite: string): string {
  const level = sla.find((s) => s.id === (criticite as CriticitéId));
  if (!level) return "48 h ouvrées";
  const palierKey = palier as PalierId;
  return level.delais[palierKey] ?? "48 h ouvrées";
}

// ── Validation email ─────────────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Handler POST ─────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Honeypot
    if (formData.get("website")) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnu";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { errors: [{ message: "Trop de messages envoyés, réessayez dans quelques minutes." }] },
        { status: 429 }
      );
    }

    // Extraction
    const nom = ((formData.get("nom") as string) ?? "").trim();
    const email = ((formData.get("email") as string) ?? "").trim();
    const organisation = ((formData.get("organisation") as string) ?? "").trim();
    const site = ((formData.get("site") as string) ?? "").trim();
    const palier = ((formData.get("palier") as string) ?? "").trim();
    const criticite = ((formData.get("criticite") as string) ?? "P3").trim();
    const sujet = ((formData.get("sujet") as string) ?? "").trim();
    const description = ((formData.get("description") as string) ?? "").trim();
    const consent = formData.get("consent");

    // Validation
    const errors: string[] = [];
    if (!nom) errors.push("Le champ Nom est obligatoire.");
    if (!email || !isValidEmail(email)) errors.push("L'adresse email est invalide.");
    if (!site) errors.push("Le champ Site est obligatoire.");
    if (!sujet) errors.push("Le champ Sujet est obligatoire.");
    if (!description) errors.push("La description est obligatoire.");
    if (!VALID_CRITICITES.includes(criticite as typeof VALID_CRITICITES[number])) {
      errors.push("La criticité est invalide.");
    }
    if (!VALID_PALIERS.includes(palier as typeof VALID_PALIERS[number])) {
      errors.push("Le palier est invalide.");
    }
    if (consent !== "true") {
      errors.push("Le consentement au traitement des données est requis.");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { errors: errors.map((message) => ({ message })) },
        { status: 400 }
      );
    }

    const reference = generateReference();
    const criticiteLabel = CRITICITE_LABELS[criticite] ?? criticite;
    const palierLabel = PALIER_LABELS[palier] ?? palier;
    const delaiPriseEnCharge = getDelaiPriseEnCharge(palier, criticite);

    const { echeance, delaiLabel: delaiSlaLabel } = echeanceSla(new Date(), delaiPriseEnCharge);
    const echeanceLabel = formatEcheance(echeance);

    // ── Email interne ──────────────────────────────────────────
    const apiKey = process.env.RESEND_API_KEY;
    const resend = apiKey ? new Resend(apiKey) : null;

    if (!resend) {
      console.warn("RESEND_API_KEY manquante — envoi des emails ignoré :", {
        reference,
      });
    }

    // Fail-open : un échec d'email ne bloque jamais l'enregistrement du ticket.
    if (resend) {
      try {
        const { html: notifHtml, text: notifText } = buildTicketNotificationEmail({
          reference,
          nom,
          email,
          organisation: organisation || undefined,
          site,
          palier: palierLabel,
          criticite,
          criticiteLabel,
          sujet,
          description,
          echeanceSla: echeanceLabel,
        });

        const { error: sendError } = await resend.emails.send({
          from: "FPH Solutions <contact@fph-solutions.com>",
          to: "contact@fph-solutions.com",
          replyTo: email,
          subject: `[SAV ${reference}] ${criticite} ${sujet}`,
          html: notifHtml,
          text: notifText,
        });

        if (sendError) {
          console.error("Ticket notification email failed:", sendError.message);
        }
      } catch (err) {
        console.error("Ticket notification email failed:", err);
      }
    }

    // ── Actions fail-open ──────────────────────────────────────

    // 1. Accusé de réception client
    if (resend) {
      try {
        const { html: ackHtml, text: ackText } = buildTicketAckEmail({
          reference,
          nom,
          email,
          sujet,
          criticite,
          criticiteLabel,
          delaiPriseEnCharge,
          palier: palierLabel,
        });
        await resend.emails.send({
          from: "FPH Solutions <contact@fph-solutions.com>",
          to: email,
          subject: `[${reference}] Votre ticket SAV a bien été ouvert`,
          html: ackHtml,
          text: ackText,
        });
      } catch (err) {
        console.error("Ticket ACK email failed:", err);
      }
    }

    // 2. Notion
    try {
      await createTicketPage({
        reference,
        nom,
        email,
        organisation: organisation || undefined,
        site,
        palier: palierLabel,
        criticite,
        sujet,
        description,
        echeanceSla: echeance.toISOString(),
        delaiSla: delaiSlaLabel,
      });
    } catch (err) {
      console.error("Notion ticket creation failed:", err);
    }

    // 3. Telegram
    try {
      await sendTelegramTicketAlert({
        reference,
        nom,
        email,
        organisation: organisation || undefined,
        site,
        palier: palierLabel,
        criticite,
        criticiteLabel,
        sujet,
        description,
        echeanceSla: echeanceLabel,
      });
    } catch (err) {
      console.error("Telegram ticket alert failed:", err);
    }

    return NextResponse.json({ success: true, reference }, { status: 200 });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Une erreur interne est survenue.";
    return NextResponse.json(
      { errors: [{ message: errorMessage }] },
      { status: 500 }
    );
  }
}
