// ============================================================
// notion-tickets.ts — Création d'une page ticket dans Notion
// Base de données identifiée par NOTION_TICKETS_DATABASE_ID
// ============================================================

export interface TicketPageData {
  reference: string;
  nom: string;
  email: string;
  organisation?: string;
  site: string;
  palier: string;
  criticite: string;
  sujet: string;
  description: string;
  /** ISO 8601 — échéance SLA calculée */
  echeanceSla?: string;
  /** Libellé public du délai SLA (ex. "4 h ouvrées") */
  delaiSla?: string;
  /** ISO 8601 — horodatage de la dernière action (défaut = maintenant) */
  derniereAction?: string;
}

function richText(content: string) {
  return [{ type: "text", text: { content } }];
}

const NOTION_VERSION = "2025-09-03";

export async function createTicketPage(data: TicketPageData): Promise<boolean> {
  try {
    const token = process.env.NOTION_TOKEN;
    const databaseId = process.env.NOTION_TICKETS_DATABASE_ID;

    if (!token || !databaseId) {
      console.warn(
        "NOTION_TOKEN or NOTION_TICKETS_DATABASE_ID is not defined. Skipping Notion ticket creation."
      );
      return false;
    }

    const properties: Record<string, unknown> = {
      Référence: {
        title: richText(data.reference),
      },
      Client: {
        rich_text: richText(data.nom),
      },
      Email: {
        email: data.email,
      },
      Site: {
        url: data.site || null,
      },
      Palier: {
        select: { name: data.palier },
      },
      Criticité: {
        select: { name: data.criticite },
      },
      Sujet: {
        rich_text: richText(data.sujet),
      },
      Description: {
        rich_text: richText(data.description.slice(0, 2000)),
      },
      Statut: {
        select: { name: "Nouveau" },
      },
      Canal: {
        select: { name: "Site web" },
      },
      Date: {
        date: { start: new Date().toISOString() },
      },
    };

    if (data.organisation?.trim()) {
      properties["Organisation"] = {
        rich_text: richText(data.organisation.trim()),
      };
    }

    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: {
          type: "database_id",
          database_id: databaseId,
        },
        properties,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "Notion ticket API error:",
        response.status,
        response.statusText,
        errorText.slice(0, 500)
      );
      return false;
    }

    // Récupérer l'id de la page créée pour le PATCH SLA
    let pageId: string | undefined;
    try {
      const json = (await response.json()) as { id?: string };
      pageId = json.id;
    } catch {
      // Non-bloquant : on continuera sans le PATCH
    }

    // PATCH SLA — fail-safe : un échec ne fait JAMAIS échouer la création du ticket
    if (pageId && (data.echeanceSla || data.delaiSla || data.derniereAction)) {
      try {
        const slaProps: Record<string, unknown> = {};

        if (data.echeanceSla) {
          slaProps["Échéance SLA"] = { date: { start: data.echeanceSla } };
        }
        if (data.delaiSla) {
          slaProps["Délai SLA"] = { rich_text: richText(data.delaiSla) };
        }
        slaProps["Heures consommées"] = { number: 0 };
        slaProps["Dernière action"] = {
          date: {
            start: data.derniereAction ?? new Date().toISOString(),
          },
        };

        const patchHeaders = {
          Authorization: `Bearer ${token}`,
          "Notion-Version": NOTION_VERSION,
          "Content-Type": "application/json",
        };

        const patchRes = await fetch(
          `https://api.notion.com/v1/pages/${pageId}`,
          {
            method: "PATCH",
            headers: patchHeaders,
            body: JSON.stringify({ properties: slaProps }),
          }
        );

        if (!patchRes.ok) {
          const errText = await patchRes.text();
          console.error(
            "Notion SLA PATCH error:",
            patchRes.status,
            patchRes.statusText,
            errText.slice(0, 500)
          );

          // Retry sur 400 : n'envoyer que Échéance SLA + Délai SLA
          if (patchRes.status === 400) {
            try {
              const minimalProps: Record<string, unknown> = {};
              if (data.echeanceSla) {
                minimalProps["Échéance SLA"] = { date: { start: data.echeanceSla } };
              }
              if (data.delaiSla) {
                minimalProps["Délai SLA"] = { rich_text: richText(data.delaiSla) };
              }
              const retryRes = await fetch(
                `https://api.notion.com/v1/pages/${pageId}`,
                {
                  method: "PATCH",
                  headers: patchHeaders,
                  body: JSON.stringify({ properties: minimalProps }),
                }
              );
              if (!retryRes.ok) {
                const retryText = await retryRes.text();
                console.error(
                  "Notion SLA PATCH retry error:",
                  retryRes.status,
                  retryRes.statusText,
                  retryText.slice(0, 500)
                );
              }
            } catch (retryErr) {
              console.error("Notion SLA PATCH retry failed (non-bloquant):", retryErr);
            }
          }
        }
      } catch (patchErr) {
        console.error("Notion SLA PATCH failed (non-bloquant):", patchErr);
      }
    }

    return true;
  } catch (err: unknown) {
    console.error("Failed to create Notion ticket page:", err);
    return false;
  }
}
