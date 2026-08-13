import { NextResponse } from "next/server";
import { Resend } from "resend";

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

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return NextResponse.json(
        { errors: [{ message: "Tous les champs sont obligatoires." }] },
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

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn("RESEND_API_KEY is not defined. Email content:", { name, email, message });
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
      subject: `Nouveau message de ${name} via FPH Solutions`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
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
