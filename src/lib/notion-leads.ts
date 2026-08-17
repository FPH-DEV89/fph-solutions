export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  type: string;              // valeur brute : particulier | entreprise | association
  organization?: string;
  projectType: string;       // valeur brute
  budget: string;            // valeur brute
  deadline: string;          // valeur brute
  projectDescription: string;
}

const NOTION_TYPE: Record<string, string> = {
  particulier: "Particulier",
  entreprise: "Entreprise",
  association: "Association",
};

const NOTION_PROJECT: Record<string, string> = {
  "site-vitrine": "Site vitrine",
  ecommerce: "E-commerce",
  application: "Application web",
  refonte: "Refonte",
  automatisation: "Automatisation",
  autre: "Autre",
};

const NOTION_BUDGET: Record<string, string> = {
  unknown: "Je ne sais pas encore",
  "moins-500": "Moins de 500 €",
  "500-1500": "500 € – 1 500 €",
  "1500-5000": "1 500 € – 5 000 €",
  "plus-5000": "Plus de 5 000 €",
};

const NOTION_DEADLINE: Record<string, string> = {
  flexible: "Flexible",
  urgent: "Urgent (< 1 mois)",
  "1-3-mois": "1 à 3 mois",
  "3-6-mois": "3 à 6 mois",
};

export async function createLeadPage(lead: LeadData): Promise<boolean> {
  try {
    const token = process.env.NOTION_TOKEN;
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!token || !databaseId) {
      console.warn("NOTION_TOKEN or NOTION_DATABASE_ID is not defined. Skipping Notion lead creation.");
      return false;
    }

    const typeOption = NOTION_TYPE[lead.type] ?? lead.type;
    const projectOption = NOTION_PROJECT[lead.projectType] ?? lead.projectType;
    const budgetOption = NOTION_BUDGET[lead.budget] ?? lead.budget;
    const deadlineOption = NOTION_DEADLINE[lead.deadline] ?? lead.deadline;
    const fullName = `${lead.firstName} ${lead.lastName}`.trim();

    const properties: Record<string, unknown> = {
      Name: {
        title: [
          {
            type: "text",
            text: { content: fullName },
          },
        ],
      },
      "Prénom": {
        rich_text: [
          {
            type: "text",
            text: { content: lead.firstName },
          },
        ],
      },
      Email: {
        rich_text: [
          {
            type: "text",
            text: { content: lead.email },
          },
        ],
      },
      Profil: {
        select: {
          name: typeOption,
        },
      },
      "Type de projet": {
        select: {
          name: projectOption,
        },
      },
      Budget: {
        select: {
          name: budgetOption,
        },
      },
      "Délai": {
        select: {
          name: deadlineOption,
        },
      },
      Statut: {
        select: {
          name: "Nouveau",
        },
      },
      "Reçu le": {
        date: {
          start: new Date().toISOString(),
        },
      },
    };

    if (lead.organization && lead.organization.trim()) {
      properties["Structure"] = {
        rich_text: [
          {
            type: "text",
            text: { content: lead.organization.trim() },
          },
        ],
      };
    }

    const children = [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: lead.projectDescription },
            },
          ],
        },
      },
    ];

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
        children,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Notion API error: ${response.status} ${response.statusText}`,
        errorText.slice(0, 500)
      );
      return false;
    }

    return true;
  } catch (err: unknown) {
    console.error("Failed to create Notion lead page:", err);
    return false;
  }
}
