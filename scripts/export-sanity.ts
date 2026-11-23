/**
 * Gera studio/seed/conteudo.ndjson com categorias, autor, artigos e projetos
 * no formato do Sanity. Para importar no CMS:
 *   cd studio && npx sanity dataset import seed/conteudo.ndjson production --replace
 * As imagens são enviadas automaticamente a partir das URLs públicas do site
 * (defina SITE_URL com o domínio publicado antes de rodar).
 * Uso: npx tsx scripts/export-sanity.ts
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { categories, posts } from "../content/posts";
import { projects } from "../content/projects";
import { services } from "../content/services";
import type { Block } from "../lib/types";

const SITE = (process.env.SITE_URL || "https://www.agenciaunaro.com.br").replace(/\/$/, "");
let k = 0;
const key = () => `k${(k++).toString(36)}`;

/** Texto com [rótulo](url) vira spans com markDefs de link. */
function spans(text: string) {
  const children: object[] = [], markDefs: object[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g; let last = 0, m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) children.push({ _type: "span", _key: key(), text: text.slice(last, m.index), marks: [] });
    const mk = key(); markDefs.push({ _type: "link", _key: mk, href: m[2] });
    children.push({ _type: "span", _key: key(), text: m[1], marks: [mk] });
    last = m.index + m[0].length;
  }
  if (last < text.length) children.push({ _type: "span", _key: key(), text: text.slice(last), marks: [] });
  return { children, markDefs };
}
const block = (style: string, text: string, extra: object = {}) => ({ _type: "block", _key: key(), style, ...spans(text), ...extra });

function toPortableText(body: Block[]) {
  const out: object[] = [];
  for (const b of body) {
    if (b.type === "p") out.push(block("normal", b.text));
    else if (b.type === "h2") out.push(block("h2", b.text));
    else if (b.type === "h3") out.push(block("h3", b.text));
    else if (b.type === "quote") out.push(block("blockquote", b.text));
    else if (b.type === "list") b.items.forEach((it) => out.push(block("normal", it, { listItem: "bullet", level: 1 })));
    else if (b.type === "callout") out.push({ _type: "callout", _key: key(), title: b.title, text: b.text });
    else if (b.type === "table") {
      // tabelas viram lista de linhas (o editor pode transformar em imagem ou bloco próprio)
      b.rows.forEach((r) => out.push(block("normal", r.filter(Boolean).join(" · "), { listItem: "bullet", level: 1 })));
    }
  }
  return out;
}
const img = (src: string, alt: string) => ({ _type: "image", _sanityAsset: `image@${SITE}${src}`, alt });

const docs: object[] = [];
docs.push({ _id: "author-equipe-unaro", _type: "author", name: "Equipe Unaro" });
for (const c of categories) docs.push({ _id: `category-${c.slug}`, _type: "category", title: c.title, slug: { _type: "slug", current: c.slug }, description: c.description });
for (const s of services) docs.push({ _id: `service-${s.slug}`, _type: "service", title: s.title, slug: { _type: "slug", current: s.slug }, homeSummary: s.homeSummary, intro: s.intro, faq: s.faq.map((f) => ({ _key: key(), ...f })), whatsappMessage: s.cta.whatsappMessage, seo: { title: s.seoTitle, description: s.seoDescription } });
for (const p of posts) docs.push({
  _id: `post-${p.slug}`, _type: "post", title: p.title, slug: { _type: "slug", current: p.slug }, subtitle: p.subtitle, excerpt: p.excerpt,
  category: { _type: "reference", _ref: `category-${p.category}` }, author: { _type: "reference", _ref: "author-equipe-unaro" },
  publishedAt: p.publishedAt, cover: img(p.cover.src, p.cover.alt), body: toPortableText(p.body),
  faq: (p.faq || []).map((f) => ({ _key: key(), ...f })), sources: (p.sources || []).map((s) => ({ _key: key(), ...s })),
  keyword: p.keyword, relatedTerms: p.relatedTerms,
  related: (p.related || []).map((r) => ({ _type: "reference", _ref: `post-${r}`, _key: key() })),
  serviceCta: { _type: "reference", _ref: `service-${p.serviceCta}` },
  seo: { title: p.seoTitle, description: p.seoDescription },
});
for (const p of projects.filter((x) => !x.demo)) docs.push({
  _id: `project-${p.slug}`, _type: "project", client: p.client, slug: { _type: "slug", current: p.slug }, segment: p.segment, location: p.location,
  headline: p.headline, types: p.types, services: p.services, summary: p.summary, challenge: p.challenge, solution: p.solution,
  featured: p.featured, publishedAt: p.publishedAt, cover: img(p.cover.src, p.cover.alt),
});

mkdirSync("studio/seed", { recursive: true });
writeFileSync("studio/seed/conteudo.ndjson", docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
console.log(`${docs.length} documentos (${posts.length} artigos, ${categories.length} categorias, ${projects.filter((x) => !x.demo).length} projetos)`);
