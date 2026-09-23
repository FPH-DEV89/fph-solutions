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
}

function richText(content: string) {
  return [{ type: "text", text: { content } }];
}

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
        "Notion-Version": "2025-09-03",
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

    return true;
  } catch (err: unknown) {
    console.error("Failed to create Notion ticket page:", err);
    return false;
  }
}
