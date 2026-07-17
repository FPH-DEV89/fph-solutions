import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return NextResponse.json(
        { errors: [{ message: "Tous les champs sont obligatoires." }] },
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
      from: "FPH Solutions <onboarding@resend.dev>",
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
