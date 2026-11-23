import type { MetadataRoute } from "next";
import { getPosts, getCategories, getProjects } from "@/lib/cms";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories, projects] = await Promise.all([getPosts(), getCategories(), getProjects()]);
  const now = new Date();
  const fixed = ["/", "/sobre", "/servicos", "/projetos", "/sites", "/blog", "/contato", "/politica-de-privacidade", "/politica-de-cookies"].map((p) => ({ url: absoluteUrl(p), lastModified: now, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.7 }));
  const isSite = (t: string[]) => t.includes("websites") || t.includes("landing-pages");
  return [
    ...fixed,
    ...services.map((s) => ({ url: absoluteUrl(`/servicos/${s.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...posts.map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: new Date(p.updatedAt || p.publishedAt), changeFrequency: "yearly" as const, priority: 0.6 })),
    ...categories.filter((c) => posts.some((p) => p.category === c.slug)).map((c) => ({ url: absoluteUrl(`/blog/categoria/${c.slug}`), lastModified: now, priority: 0.4 })),
    // projetos demonstrativos ficam fora do sitemap
    ...projects.filter((p) => !p.demo).map((p) => ({ url: absoluteUrl(`${isSite(p.types) ? "/sites" : "/projetos"}/${p.slug}`), lastModified: new Date(p.publishedAt), priority: 0.6 })),
  ];
}
