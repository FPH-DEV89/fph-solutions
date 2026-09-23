export interface TelegramLeadData {
  firstName: string;
  lastName: string;
  email: string;
  typeLabel: string;
  organization?: string;
  projectTypeLabel: string;
  budgetLabel: string;
  deadlineLabel: string;
  projectDescription: string;
}

function escapeTelegram(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendTelegramAlert(lead: TelegramLeadData): Promise<boolean> {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.warn("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not defined. Skipping Telegram alert.");
      return false;
    }

    const escapedFirstName = escapeTelegram(lead.firstName);
    const escapedLastName = escapeTelegram(lead.lastName);
    const escapedEmail = escapeTelegram(lead.email);
    const escapedTypeLabel = escapeTelegram(lead.typeLabel);
    const escapedOrganization =
      lead.organization && lead.organization.trim()
        ? escapeTelegram(lead.organization.trim())
        : "—";
    const escapedProjectTypeLabel = escapeTelegram(lead.projectTypeLabel);
    const escapedBudgetLabel = escapeTelegram(lead.budgetLabel);
    const escapedDeadlineLabel = escapeTelegram(lead.deadlineLabel);
    const escapedProjectDescription = escapeTelegram(lead.projectDescription);

    const text = `👋 <b>Bonjour Florian,</b>

Une nouvelle demande vient d'arriver sur fph-solutions.com 👇

👤 <b>${escapedFirstName} ${escapedLastName}</b> (${escapedTypeLabel})
📧 ${escapedEmail}
🏢 ${escapedOrganization}
📋 ${escapedProjectTypeLabel}
💰 ${escapedBudgetLabel}
⏱️ ${escapedDeadlineLabel}

💬 ${escapedProjectDescription}

Merci de la traiter dès que possible.

L'équipe FPH Solutions vous souhaite une bonne journée ☀️`;

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "Telegram API error:",
        response.status,
        response.statusText,
        errorText.slice(0, 500)
      );
      return false;
    }

    return true;
  } catch (err: unknown) {
    console.error("Failed to send Telegram alert:", err);
    return false;
  }
}

// ── Alerte ticket SAV ────────────────────────────────────────

export interface TelegramTicketData {
  reference: string;
  nom: string;
  email: string;
  organisation?: string;
  site: string;
  palier: string;
  criticite: string;
  criticiteLabel: string;
  sujet: string;
  description: string;
}

export async function sendTelegramTicketAlert(
  ticket: TelegramTicketData
): Promise<boolean> {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.warn(
        "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not defined. Skipping Telegram ticket alert."
      );
      return false;
    }

    const e = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const org = ticket.organisation?.trim()
      ? e(ticket.organisation.trim())
      : "—";

    const criticiteEmoji: Record<string, string> = {
      P1: "🔴",
      P2: "🟠",
      P3: "🔵",
      P4: "🟣",
    };
    const emoji = criticiteEmoji[ticket.criticite] ?? "⚪";

    const text = `${emoji} <b>Nouveau ticket SAV : ${e(ticket.reference)}</b>

<b>Criticité :</b> ${e(ticket.criticite)} — ${e(ticket.criticiteLabel)}
<b>Palier :</b> ${e(ticket.palier)}

👤 <b>${e(ticket.nom)}</b>
📧 ${e(ticket.email)}
🏢 ${org}
🌐 ${e(ticket.site)}

📋 <b>Sujet :</b> ${e(ticket.sujet)}

💬 ${e(ticket.description)}

Répondre à : ${e(ticket.email)}`;

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "Telegram ticket API error:",
        response.status,
        response.statusText,
        errorText.slice(0, 500)
      );
      return false;
    }

    return true;
  } catch (err: unknown) {
    console.error("Failed to send Telegram ticket alert:", err);
    return false;
  }
}
