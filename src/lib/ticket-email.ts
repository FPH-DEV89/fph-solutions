// ============================================================
// ticket-email.ts — Gabarits d'email pour les tickets SAV
// 1. buildTicketNotificationEmail : notification interne
// 2. buildTicketAckEmail : accusé de réception client
// ============================================================

// ── Helpers ──────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function criticiteColor(criticite: string): string {
  if (criticite === "P1") return "#ef4444";
  if (criticite === "P2") return "#f97316";
  if (criticite === "P3") return "#3b82f6";
  return "#8b5cf6";
}

// ── Types ────────────────────────────────────────────────────

export interface TicketNotificationData {
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
  /** Libellé court de l'échéance SLA (usage interne uniquement) */
  echeanceSla?: string;
}

export interface TicketAckData {
  reference: string;
  nom: string;
  email: string;
  sujet: string;
  criticite: string;
  criticiteLabel: string;
  delaiPriseEnCharge: string;
  palier: string;
}

// ── Email interne (notification Florian) ─────────────────────

export function buildTicketNotificationEmail(
  data: TicketNotificationData
): { html: string; text: string } {
  const e = (s: string) => escapeHtml(s);
  const color = criticiteColor(data.criticite);

  const orgRow = data.organisation
    ? `<tr>
        <td width="130" style="font-size:12px;color:#8899aa;text-transform:uppercase;letter-spacing:1px;padding:6px 0;vertical-align:top;">Structure</td>
        <td style="font-size:14px;color:#1a2733;font-weight:600;padding:6px 0;">${e(data.organisation)}</td>
      </tr>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau ticket SAV — FPH Solutions</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f6f8;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;border-collapse:separate;">
          <tr>
            <td align="center" style="background:linear-gradient(135deg,#081120 0%,#0d2b4a 55%,#0a4a6e 100%);padding:28px;text-align:center;">
              <div style="font-size:20px;font-weight:800;color:#ffffff;">FPH <span style="color:#00d4ff;">Solutions</span></div>
              <div style="font-size:12px;color:#8fb3d9;margin-top:4px;letter-spacing:2px;text-transform:uppercase;">Nouveau ticket SAV</div>
              <div style="margin-top:16px;">
                <div style="display:inline-block;background:${color};color:#fff;font-size:12px;font-weight:700;padding:6px 16px;border-radius:999px;letter-spacing:0.5px;">${e(data.criticite)} — ${e(data.criticiteLabel)}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background:#ffffff;padding:8px 32px 32px;">
              <p style="font-size:15px;color:#1a2733;font-weight:700;margin:20px 0 4px;">Nouveau ticket : <span style="color:#00b2ec;">${e(data.reference)}</span></p>
              <p style="font-size:14px;color:#334155;margin:0 0 8px;">Voici le détail de la demande :</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td>
                  <h2 style="font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#00b2ec;margin:24px 0 12px;border-bottom:2px solid #eef2f6;padding-bottom:8px;">Contact</h2>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="130" style="font-size:12px;color:#8899aa;text-transform:uppercase;letter-spacing:1px;padding:6px 0;vertical-align:top;">Nom</td>
                      <td style="font-size:14px;color:#1a2733;font-weight:600;padding:6px 0;">${e(data.nom)}</td>
                    </tr>
                    <tr>
                      <td width="130" style="font-size:12px;color:#8899aa;text-transform:uppercase;letter-spacing:1px;padding:6px 0;">Email</td>
                      <td style="font-size:14px;color:#1a2733;font-weight:600;padding:6px 0;"><a href="mailto:${e(data.email)}" style="color:#0088ff;text-decoration:none;">${e(data.email)}</a></td>
                    </tr>
                    ${orgRow}
                    <tr>
                      <td width="130" style="font-size:12px;color:#8899aa;text-transform:uppercase;letter-spacing:1px;padding:6px 0;">Palier</td>
                      <td style="font-size:14px;color:#1a2733;font-weight:600;padding:6px 0;">${e(data.palier)}</td>
                    </tr>
                    <tr>
                      <td width="130" style="font-size:12px;color:#8899aa;text-transform:uppercase;letter-spacing:1px;padding:6px 0;">Site</td>
                      <td style="font-size:14px;color:#1a2733;font-weight:600;padding:6px 0;">${e(data.site)}</td>
                    </tr>
                  </table>
                </td></tr>
                <tr><td>
                  <h2 style="font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#00b2ec;margin:24px 0 12px;border-bottom:2px solid #eef2f6;padding-bottom:8px;">Demande</h2>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="130" style="font-size:12px;color:#8899aa;text-transform:uppercase;letter-spacing:1px;padding:6px 0;">Sujet</td>
                      <td style="font-size:14px;color:#1a2733;font-weight:600;padding:6px 0;">${e(data.sujet)}</td>
                    </tr>
                    <tr>
                      <td width="130" style="font-size:12px;color:#8899aa;text-transform:uppercase;letter-spacing:1px;padding:6px 0;">Criticité</td>
                      <td style="font-size:14px;font-weight:700;padding:6px 0;color:${color};">${e(data.criticite)} — ${e(data.criticiteLabel)}</td>
                    </tr>
                    ${data.echeanceSla ? `<tr>
                      <td width="130" style="font-size:12px;color:#8899aa;text-transform:uppercase;letter-spacing:1px;padding:6px 0;">Échéance SLA</td>
                      <td style="font-size:14px;color:#1a2733;font-weight:600;padding:6px 0;">${e(data.echeanceSla)}</td>
                    </tr>` : ""}
                  </table>
                  <div style="background:#f7fafc;border-left:4px solid ${color};border-radius:8px;padding:14px 16px;margin-top:16px;font-size:14px;line-height:1.7;color:#334155;white-space:pre-wrap;">${e(data.description)}</div>
                </td></tr>
              </table>
              <p style="font-size:14px;color:#334155;margin:24px 0 0;">Merci de traiter ce ticket selon les délais du palier <strong>${e(data.palier)}</strong>.</p>
            </td>
          </tr>
          <tr>
            <td style="background:#f7fafc;padding:20px 32px;border-top:1px solid #eef2f6;">
              <div style="font-size:13px;color:#1a2733;font-weight:700;">FPH Solutions</div>
              <div style="font-size:12px;color:#8899aa;margin-top:2px;">ticket@fph-solutions.com · contact@fph-solutions.com</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const orgText = data.organisation ? `\nStructure: ${data.organisation}` : "";
  const slaText = data.echeanceSla ? `\nÉchéance SLA : ${data.echeanceSla}` : "";
  const text = `Nouveau ticket SAV : ${data.reference}
Criticité : ${data.criticite} — ${data.criticiteLabel}

CONTACT
Nom: ${data.nom}
Email: ${data.email}${orgText}
Palier: ${data.palier}
Site: ${data.site}

DEMANDE
Sujet: ${data.sujet}${slaText}

${data.description}

Merci de traiter ce ticket selon les délais du palier ${data.palier}.

FPH Solutions — ticket@fph-solutions.com`;

  return { html, text };
}

// ── Email client (accusé de réception) ───────────────────────

export function buildTicketAckEmail(
  data: TicketAckData
): { html: string; text: string } {
  const e = (s: string) => escapeHtml(s);
  const color = criticiteColor(data.criticite);

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Votre ticket a bien été ouvert — FPH Solutions</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f6f8;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;border-collapse:separate;">
          <tr>
            <td align="center" style="background:linear-gradient(135deg,#081120 0%,#0d2b4a 55%,#0a4a6e 100%);padding:28px;text-align:center;">
              <div style="font-size:20px;font-weight:800;color:#ffffff;">FPH <span style="color:#00d4ff;">Solutions</span></div>
              <div style="font-size:12px;color:#8fb3d9;margin-top:4px;letter-spacing:2px;text-transform:uppercase;">Confirmation de ticket</div>
              <div style="margin-top:16px;">
                <div style="display:inline-block;background:#00d4ff;color:#06101f;font-size:12px;font-weight:700;padding:6px 16px;border-radius:999px;">Ticket ouvert</div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background:#ffffff;padding:8px 32px 32px;">
              <h1 style="font-size:22px;color:#1a2733;margin:24px 0 8px;font-weight:700;">Votre ticket a bien été ouvert</h1>
              <p style="font-size:14px;color:#334155;line-height:1.7;margin:0 0 20px;">Bonjour ${e(data.nom)}, je confirme la réception de votre demande.</p>
              <div style="background:#f7fafc;border-left:4px solid #00d4ff;border-radius:8px;padding:14px 16px;margin:20px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="160" style="font-size:12px;color:#8899aa;text-transform:uppercase;letter-spacing:1px;padding:6px 0;vertical-align:top;">Référence</td>
                    <td style="font-size:14px;color:#1a2733;font-weight:700;padding:6px 0;">${e(data.reference)}</td>
                  </tr>
                  <tr>
                    <td width="160" style="font-size:12px;color:#8899aa;text-transform:uppercase;letter-spacing:1px;padding:6px 0;vertical-align:top;">Sujet</td>
                    <td style="font-size:14px;color:#1a2733;font-weight:600;padding:6px 0;">${e(data.sujet)}</td>
                  </tr>
                  <tr>
                    <td width="160" style="font-size:12px;color:#8899aa;text-transform:uppercase;letter-spacing:1px;padding:6px 0;vertical-align:top;">Criticité</td>
                    <td style="font-size:14px;font-weight:700;color:${color};padding:6px 0;">${e(data.criticite)} — ${e(data.criticiteLabel)}</td>
                  </tr>
                  <tr>
                    <td width="160" style="font-size:12px;color:#8899aa;text-transform:uppercase;letter-spacing:1px;padding:6px 0;vertical-align:top;">Prise en charge</td>
                    <td style="font-size:14px;color:#1a2733;font-weight:600;padding:6px 0;">Sous <strong>${e(data.delaiPriseEnCharge)}</strong> (palier ${e(data.palier)})</td>
                  </tr>
                </table>
              </div>
              <p style="font-size:14px;color:#334155;line-height:1.7;margin:20px 0 0;">Pour tout suivi ou complément d'information, répondez à cet email ou écrivez directement à <a href="mailto:ticket@fph-solutions.com" style="color:#0088ff;text-decoration:none;">ticket@fph-solutions.com</a> en indiquant votre référence.</p>
              <p style="font-size:14px;color:#1a2733;line-height:1.7;margin:16px 0 0;">Cordialement,<br><span style="font-weight:700;">Florian — FPH Solutions</span></p>
            </td>
          </tr>
          <tr>
            <td style="background:#f7fafc;padding:20px 32px;border-top:1px solid #eef2f6;">
              <div style="font-size:13px;color:#1a2733;font-weight:700;">FPH Solutions</div>
              <div style="font-size:12px;color:#8899aa;margin-top:2px;">ticket@fph-solutions.com · contact@fph-solutions.com</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `Votre ticket a bien été ouvert

Bonjour ${data.nom},

Je confirme la réception de votre demande.

RÉCAPITULATIF
- Référence : ${data.reference}
- Sujet : ${data.sujet}
- Criticité : ${data.criticite} — ${data.criticiteLabel}
- Prise en charge : sous ${data.delaiPriseEnCharge} (palier ${data.palier})

Pour tout suivi, répondez à cet email ou écrivez à ticket@fph-solutions.com en indiquant votre référence.

Cordialement,
Florian — FPH Solutions
ticket@fph-solutions.com`;

  return { html, text };
}
