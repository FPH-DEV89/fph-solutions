import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { cache } from "react";

// Le HTML brut présent dans un fichier Markdown est échappé (jamais injecté tel quel)
// et les liens sont assainis : protocoles dangereux (javascript:, data:, vbscript:) bloqués.
marked.use({
  renderer: {
    html({ text }: { text: string }) {
      return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },
    link({ href, title, tokens }: { href?: string | null; title?: string | null; tokens: { raw: string }[] }) {
      const unsafe = /^(javascript|data|vbscript):/i;
      // Échappement des attributs : un href contenant des guillemets ne doit jamais
      // permettre d'injecter un attribut onmouseover ou similaire.
      const escapeAttr = (s: string) =>
        s
          .replace(/&/g, "&amp;")
          .replace(/"/g, "&quot;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      const safeHref = href && !unsafe.test(href) ? escapeAttr(href) : "#";
      const titleAttr = title ? ` title="${escapeAttr(title)}"` : "";
      // Le texte du lien est échappé : un lien [<script>](url) ne doit jamais injecter du HTML
      const text = tokens
        .map((t) =>
          t.raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        )
        .join("");
      return `<a href="${safeHref}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
    },
  },
});

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  image?: string;
};

export type Post = PostMeta & {
  contentHtml: string;
};

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

/**
 * Calcule le temps de lecture estimé à partir du HTML généré
 * (~ 200 mots par minute, minimum 1 min).
 */
export function readingTime(contentHtml: string): string {
  const text = contentHtml.replace(/<[^>]*>/g, " ").trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min de lecture`;
}

/**
 * Formate une date ISO en chaîne de caractères fr-FR (ex. « 16 août 2026 »).
 */
export function formatPostDate(dateStr: string): string {
  if (!dateStr) return "";
  const isoSafe = dateStr.length === 10 ? `${dateStr}T12:00:00Z` : dateStr;
  const parsedDate = new Date(isoSafe);
  if (isNaN(parsedDate.getTime())) return dateStr;
  return parsedDate.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Récupère tous les articles publiés, triés par date décroissante.
 * Mémoïsé avec React cache() : une seule lecture/parse par build.
 */
export const getPosts = cache(async (): Promise<Post[]> => {
  try {
    const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
    const mdFiles = entries.filter(
      (entry) => entry.isFile() && entry.name.endsWith(".md")
    );

    const posts: Post[] = [];

    for (const file of mdFiles) {
      try {
        const fullPath = path.join(BLOG_DIR, file.name);
        const rawContent = await fs.readFile(fullPath, "utf-8");
        const { data, content } = matter(rawContent);

        const published = data.published === true;
        if (!published) continue;

        let dateStr = "";
        if (data.date instanceof Date) {
          dateStr = data.date.toISOString().slice(0, 10);
        } else if (typeof data.date === "string") {
          dateStr = data.date;
        } else if (data.date) {
          dateStr = String(data.date);
        }

        const fileSlug = file.name.replace(/\.md$/, "");
        const rawSlug = String(data.slug || fileSlug);
        // Slug strict : uniquement minuscules, chiffres, tirets — sinon fallback nom de fichier
        const slug = /^[a-z0-9-]+$/.test(rawSlug) ? rawSlug : fileSlug;
        const title = String(data.title || "");
        const description = String(data.description || "");
        const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
        // XSS guard (semgrep gate 20/08/2026)
        const contentHtml = DOMPurify.sanitize(marked.parse(content) as string);

        posts.push({
          slug,
          title,
          description,
          date: dateStr,
          tags,
          published,
          image: typeof data.image === "string" ? data.image : undefined,
          contentHtml,
        });
      } catch (err) {
        // Un article illisible ne doit pas faire tomber tout le blog :
        // on logge le fichier fautif et on continue avec les autres.
        console.error(`[blog] Article illisible: ${file.name}`, err);
        continue;
      }
    }

    return posts
      .filter((p) => !isNaN(new Date(p.date).getTime()))
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  } catch (err) {
    // Ne jamais avaler silencieusement une erreur de lecture/parse :
    // un article défectueux ne doit pas faire disparaître tout le blog sans trace.
    console.error("[blog] Erreur de lecture des articles:", err);
    return [];
  }
});

/**
 * Récupère un article publié spécifique par son slug.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

/**
 * Récupère la liste de tous les slugs des articles publiés.
 */
export async function getAllSlugs(): Promise<string[]> {
  const posts = await getPosts();
  return posts.map((post) => post.slug);
}
