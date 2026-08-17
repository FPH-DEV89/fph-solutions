export interface ContactEmailData {
  firstName: string;
  lastName: string;
  email: string;
  typeLabel: string;          // "Particulier" | "Entreprise" | "Association"
  organization?: string;      // présent seulement si entreprise/association
  projectTypeLabel: string;
  budgetLabel: string;
  deadlineLabel: string;
  projectDescription: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getProfileBadgeStyle(typeLabel: string): { bg: string; color: string } {
  const normalized = typeLabel.toLowerCase();
  if (normalized.includes("entreprise")) {
    return { bg: "#e6fbff", color: "#0088cc" };
  }
  if (normalized.includes("association")) {
    return { bg: "#e9f9ef", color: "#16a34a" };
  }
  return { bg: "#eef4ff", color: "#2563eb" }; // Particulier / default
}

export function buildContactEmail(data: ContactEmailData): { html: string; text: string } {
  const escapedFirstName = escapeHtml(data.firstName);
  const escapedLastName = escapeHtml(data.lastName);
  const escapedEmail = escapeHtml(data.email);
  const escapedTypeLabel = escapeHtml(data.typeLabel);
  const escapedProjectTypeLabel = escapeHtml(data.projectTypeLabel);
  const escapedBudgetLabel = escapeHtml(data.budgetLabel);
  const escapedDeadlineLabel = escapeHtml(data.deadlineLabel);
  const escapedProjectDescription = escapeHtml(data.projectDescription);
  const escapedOrganization = data.organization ? escapeHtml(data.organization.trim()) : "";

  const profileStyle = getProfileBadgeStyle(data.typeLabel);

  const organizationRowHtml = escapedOrganization
    ? `<tr>
                        <td width="130" style="font-size:12px;color:#8899aa;text-transform:uppercase;letter-spacing:1px;padding:6px 0;vertical-align:top;">Structure</td>
                        <td style="font-size:14px;color:#1a2733;font-weight:600;padding:6px 0;">${escapedOrganization}</td>
                      </tr>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle demande de contact — FPH Solutions</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f6f8;padding:24px 12px;margin:0;width:100%;">
    <tr>
      <td align="center" style="padding:0;margin:0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;border-collapse:separate;">
          <!-- Header -->
          <tr>
            <td align="center" style="background:#081120;background:linear-gradient(135deg,#081120 0%,#0d2b4a 55%,#0a4a6e 100%);padding:28px;text-align:center;">
              <div>
                <span style="font-size:20px;font-weight:800;letter-spacing:0.5px;color:#ffffff;">FPH <span style="color:#00d4ff;">Solutions</span></span>
              </div>
              <div style="font-size:12px;color:#8fb3d9;margin-top:4px;letter-spacing:2px;text-transform:uppercase;">Nouvelle demande de contact</div>
              <div style="margin-top:16px;">
                <div style="display:inline-block;background:#00d4ff;color:#06101f;font-size:12px;font-weight:700;padding:6px 16px;border-radius:999px;letter-spacing:0.5px;">${escapedTypeLabel}</div>
              </div>
            </td>
          </tr>
          <!-- Corps -->
          <tr>
            <td style="background:#ffffff;padding:8px 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;">
                <!-- Bloc CONTACT -->
                <tr>
                  <td>
                    <h2 style="font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#00b2ec;margin:24px 0 12px;border-bottom:2px solid #eef2f6;padding-bottom:8px;">👤 Contact</h2>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="130" style="font-size:12px;color:#8899aa;text-transform:uppercase;letter-spacing:1px;padding:6px 0;vertical-align:top;">Prénom</td>
                        <td style="font-size:14px;color:#1a2733;font-weight:600;padding:6px 0;">${escapedFirstName}</td>
                      </tr>
                      <tr>
                        <td width="130" style="font-size:12px;color:#8899aa;text-transform:uppercase;letter-spacing:1px;padding:6px 0;vertical-align:top;">Nom</td>
                        <td style="font-size:14px;color:#1a2733;font-weight:600;padding:6px 0;">${escapedLastName}</td>
                      </tr>
                      <tr>
                        <td width="130" style="font-size:12px;color:#8899aa;text-transform:uppercase;letter-spacing:1px;padding:6px 0;vertical-align:top;">Email</td>
                        <td style="font-size:14px;color:#1a2733;font-weight:600;padding:6px 0;"><a href="mailto:${escapedEmail}" style="color:#0088ff;text-decoration:none;">${escapedEmail}</a></td>
                      </tr>
                      <tr>
                        <td width="130" style="font-size:12px;color:#8899aa;text-transform:uppercase;letter-spacing:1px;padding:6px 0;vertical-align:top;">Profil</td>
                        <td style="font-size:14px;color:#1a2733;font-weight:600;padding:6px 0;">
                          <div style="display:inline-block;padding:2px 10px;border-radius:999px;font-size:12px;font-weight:700;background:${profileStyle.bg};color:${profileStyle.color};">${escapedTypeLabel}</div>
                        </td>
                      </tr>
                      ${organizationRowHtml}
                    </table>
                  </td>
                </tr>
                <!-- Bloc PROJET -->
                <tr>
                  <td>
                    <h2 style="font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#00b2ec;margin:24px 0 12px;border-bottom:2px solid #eef2f6;padding-bottom:8px;">🚀 Projet</h2>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="130" style="font-size:12px;color:#8899aa;text-transform:uppercase;letter-spacing:1px;padding:6px 0;vertical-align:top;">Type de projet</td>
                        <td style="font-size:14px;color:#1a2733;font-weight:600;padding:6px 0;">${escapedProjectTypeLabel}</td>
                      </tr>
                      <tr>
                        <td width="130" style="font-size:12px;color:#8899aa;text-transform:uppercase;letter-spacing:1px;padding:6px 0;vertical-align:top;">Budget estimé</td>
                        <td style="font-size:14px;color:#1a2733;font-weight:600;padding:6px 0;">${escapedBudgetLabel}</td>
                      </tr>
                      <tr>
                        <td width="130" style="font-size:12px;color:#8899aa;text-transform:uppercase;letter-spacing:1px;padding:6px 0;vertical-align:top;">Délai souhaité</td>
                        <td style="font-size:14px;color:#1a2733;font-weight:600;padding:6px 0;">${escapedDeadlineLabel}</td>
                      </tr>
                    </table>
                    <div style="background:#f7fafc;border-left:4px solid #00d4ff;border-radius:8px;padding:14px 16px;margin-top:16px;font-size:14px;line-height:1.7;color:#334155;white-space:pre-wrap;">${escapedProjectDescription}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f7fafc;padding:20px 32px;border-top:1px solid #eef2f6;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7fafc;">
                <tr>
                  <td>
                    <div style="font-size:13px;color:#1a2733;font-weight:700;">FPH Solutions</div>
                    <div style="font-size:12px;color:#8899aa;margin-top:2px;">contact@fph-solutions.com · <a href="https://cal.com/fph-solutions.com/15min" style="color:#0088ff;text-decoration:none;">Réserver un appel</a></div>
                    <div style="font-size:11px;color:#aab8c5;margin-top:10px;">Réponse garantie sous 24h ouvrées.</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const contactTextLines = [
    "CONTACT",
    `Prénom: ${data.firstName}`,
    `Nom: ${data.lastName}`,
    `Email: ${data.email}`,
    `Profil: ${data.typeLabel}`,
  ];

  if (data.organization && data.organization.trim()) {
    contactTextLines.push(`Structure: ${data.organization.trim()}`);
  }

  const text = `NOUVELLE DEMANDE DE CONTACT — FPH Solutions
============================================

${contactTextLines.join("\n")}

PROJET
Type de projet: ${data.projectTypeLabel}
Budget estimé: ${data.budgetLabel}
Délai souhaité: ${data.deadlineLabel}

Description du projet:
${data.projectDescription}

---
FPH Solutions — contact@fph-solutions.com
Réserver un appel : https://cal.com/fph-solutions.com/15min`;

  return { html, text };
}
