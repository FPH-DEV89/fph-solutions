import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildContactEmail } from "@/lib/contact-email";

// Rate limiting simple en mémoire : 5 envois / 10 min / IP
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

const TYPE_LABELS: Record<string, string> = {
  particulier: "Particulier",
  entreprise: "Entreprise",
  association: "Association",
};

const PROJECT_TYPE_LABELS: Record<string, string> = {
  "site-vitrine": "Site vitrine",
  ecommerce: "E-commerce / boutique en ligne",
  application: "Application web / sur mesure",
  refonte: "Refonte de site existant",
  automatisation: "Automatisation / outils internes",
  autre: "Autre",
};

const BUDGET_LABELS: Record<string, string> = {
  unknown: "Je ne sais pas encore",
  "moins-500": "Moins de 500 €",
  "500-1500": "500 € – 1 500 €",
  "1500-5000": "1 500 € – 5 000 €",
  "plus-5000": "Plus de 5 000 €",
};

const DEADLINE_LABELS: Record<string, string> = {
  flexible: "Flexible / pas d'urgence",
  urgent: "Urgent (moins d'un mois)",
  "1-3-mois": "1 à 3 mois",
  "3-6-mois": "3 à 6 mois",
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Honeypot : si le champ caché est rempli, c'est un bot — on fait semblant
    // que tout s'est bien passé pour ne rien lui apprendre.
    const honeypot = formData.get("website");
    if (honeypot) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "inconnu";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { errors: [{ message: "Trop de messages envoyés, réessayez dans quelques minutes." }] },
        { status: 429 }
      );
    }

    const firstName = ((formData.get("firstName") as string) ?? "").trim();
    const lastName = ((formData.get("lastName") as string) ?? "").trim();
    const email = ((formData.get("email") as string) ?? "").trim();
    const type = ((formData.get("type") as string) ?? "").trim();
    const organization = ((formData.get("organization") as string) ?? "").trim();
    const projectType = ((formData.get("projectType") as string) ?? "").trim();
    const projectDescription = ((formData.get("projectDescription") as string) ?? "").trim();
    const budget = ((formData.get("budget") as string) ?? "").trim() || "unknown";
    const deadline = ((formData.get("deadline") as string) ?? "").trim() || "flexible";

    if (!firstName || !lastName || !email || !type || !projectType || !projectDescription) {
      return NextResponse.json(
        { errors: [{ message: "Tous les champs obligatoires doivent être remplis." }] },
        { status: 400 }
      );
    }

    if (!["particulier", "entreprise", "association"].includes(type)) {
      return NextResponse.json(
        { errors: [{ message: "Le type de demandeur est invalide." }] },
        { status: 400 }
      );
    }

    if (type !== "particulier" && !organization) {
      return NextResponse.json(
        { errors: [{ message: "Merci d'indiquer le nom de votre structure." }] },
        { status: 400 }
      );
    }

    const consent = formData.get("consent");

    if (consent !== "true") {
      return NextResponse.json(
        { errors: [{ message: "Le consentement au traitement des données personnelles est requis." }] },
        { status: 400 }
      );
    }

    const typeLabel = TYPE_LABELS[type] ?? type;
    const projectTypeLabel = PROJECT_TYPE_LABELS[projectType] ?? projectType;
    const budgetLabel = BUDGET_LABELS[budget] ?? budget;
    const deadlineLabel = DEADLINE_LABELS[deadline] ?? deadline;

    const { html, text } = buildContactEmail({
      firstName,
      lastName,
      email,
      typeLabel,
      organization: type !== "particulier" ? organization : undefined,
      projectTypeLabel,
      budgetLabel,
      deadlineLabel,
      projectDescription,
    });

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn("RESEND_API_KEY is not defined. Email content:", {
        firstName,
        lastName,
        email,
        type,
        organization,
        projectType,
        projectDescription,
        budget,
        deadline,
      });
      return NextResponse.json(
        {
          message: "Formulaire soumis (mode simulation, clé API manquante).",
          simulated: true,
        },
        { status: 200 }
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "FPH Solutions <contact@fph-solutions.com>",
      to: "contact@fph-solutions.com",
      replyTo: email,
      subject: `Nouvelle demande de ${firstName} ${lastName} (${typeLabel}) via FPH Solutions`,
      text,
      html,
    });

    if (error) {
      return NextResponse.json(
        { errors: [{ message: error.message }] },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Une erreur interne est survenue.";
    return NextResponse.json(
      { errors: [{ message: errorMessage }] },
      { status: 500 }
    );
  }
}
