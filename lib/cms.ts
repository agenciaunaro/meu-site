/**
 * Camada de dados.
 * Com NEXT_PUBLIC_SANITY_PROJECT_ID configurado, tudo vem do Sanity (com revalidação).
 * Sem CMS, usa o conteúdo local em /content (seed), útil para desenvolvimento e preview.
 */
import { posts as localPosts, categories as localCategories } from "@/content/posts";
import { projects as localProjects } from "@/content/projects";
import { services as localServices } from "@/content/services";
import type { Block, Category, Post, Project } from "./types";
import { showDemo } from "./site";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_READ_TOKEN;
export const cmsEnabled = Boolean(projectId);

async function groq<T>(query: string, params: Record<string, unknown> = {}, tags: string[] = []): Promise<T> {
  const qs = new URLSearchParams({ query });
  for (const [k, v] of Object.entries(params)) qs.set(`$${k}`, JSON.stringify(v));
  const host = token ? "api.sanity.io" : "apicdn.sanity.io";
  const res = await fetch(`https://${projectId}.${host}/v2025-02-19/data/query/${dataset}?${qs}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    next: { revalidate: 300, tags: ["sanity", ...tags] },
  });
  if (!res.ok) throw new Error(`Sanity ${res.status}`);
  return (await res.json()).result as T;
}

/* ---------- Portable Text -> Block ---------- */
type PT = { _type: string; style?: string; listItem?: string; markDefs?: { _key: string; href?: string }[]; children?: { text: string; marks?: string[] }[]; asset?: { url: string }; alt?: string; title?: string; text?: string };
const slugify = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function ptToBlocks(pt: PT[] = []): Block[] {
  const out: Block[] = [];
  for (const b of pt) {
    if (b._type === "callout") { out.push({ type: "callout", title: b.title || "", text: b.text || "" }); continue; }
    if (b._type !== "block") continue;
    const text = (b.children || []).map((c) => {
      const link = (c.marks || []).map((m) => b.markDefs?.find((d) => d._key === m)?.href).find(Boolean);
      return link ? `[${c.text}](${link})` : c.text;
    }).join("");
    if (b.listItem) {
      const last = out[out.length - 1];
      if (last && last.type === "list") last.items.push(text); else out.push({ type: "list", items: [text] });
      continue;
    }
    if (b.style === "h2") out.push({ type: "h2", text, id: slugify(text) });
    else if (b.style === "h3") out.push({ type: "h3", text });
    else if (b.style === "blockquote") out.push({ type: "quote", text });
    else if (text.trim()) out.push({ type: "p", text });
  }
  return out;
}

const POST_FIELDS = `"slug": slug.current, title, subtitle, excerpt, "category": category->slug.current,
  publishedAt, "updatedAt": _updatedAt, "author": author->name,
  "cover": {"src": cover.asset->url, "alt": cover.alt}, "seoTitle": seo.title, "seoDescription": seo.description,
  "related": related[]->slug.current, "serviceCta": serviceCta->slug.current, faq, sources, keyword, relatedTerms, body`;

const PROJECT_FIELDS = `"slug": slug.current, client, segment, location, headline, types, siteType, services, summary, challenge, context, objective, solution,
  identity, features, results, url, featured, publishedAt,
  "cover": {"src": cover.asset->url, "alt": cover.alt},
  "desktop": desktop[]{"src": asset->url, alt}, "mobile": mobile[]{"src": asset->url, alt},
  "gallery": gallery[]{"src": asset->url, alt, caption},
  "materials": materials[]{kind, alt, caption, url, "src": coalesce(image.asset->url, file.asset->url)}`;

/* ---------- Posts ---------- */
export async function getPosts(): Promise<Post[]> {
  if (!cmsEnabled) return [...localPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const rows = await groq<(Omit<Post, "body"> & { body: PT[] })[]>(
    `*[_type=="post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc){${POST_FIELDS}}`, {}, ["post"]);
  return rows.map((r) => ({ ...r, body: ptToBlocks(r.body), serviceCta: r.serviceCta || "consultoria-de-marketing" }));
}

export async function getPostBySlug(slug: string) {
  return (await getPosts()).find((p) => p.slug === slug);
}

export async function getCategories(): Promise<Category[]> {
  if (!cmsEnabled) return localCategories;
  return groq<Category[]>(`*[_type=="category"] | order(title asc){"slug": slug.current, title, description}`, {}, ["category"]);
}

/* ---------- Projetos ---------- */
export async function getProjects(): Promise<Project[]> {
  if (!cmsEnabled) return showDemo ? localProjects : [];
  return groq<Project[]>(`*[_type=="project" && defined(slug.current) && !(_id in path("drafts.**"))] | order(coalesce(order, 999) asc, publishedAt desc){${PROJECT_FIELDS}}`, {}, ["project"]);
}

export async function getSiteProjects() {
  return (await getProjects()).filter((p) => p.types.includes("websites") || p.types.includes("landing-pages"));
}

export async function getProjectBySlug(slug: string) {
  return (await getProjects()).find((p) => p.slug === slug);
}

/* ---------- Serviços (conteúdo base local; textos editáveis no CMS na fase 2) ---------- */
export async function getServices() {
  return localServices;
}
