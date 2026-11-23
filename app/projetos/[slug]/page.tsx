import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { ProjectDetail } from "@/components/ProjectDetail";

/** Projetos que não são sites (conteúdo, campanhas, estratégia). Sites usam /sites/[slug]. */
export const revalidate = 300;
const isSite = (t: string[]) => t.includes("websites") || t.includes("landing-pages");

export async function generateStaticParams() {
  const list = (await getProjects()).filter((p) => !isSite(p.types)).map((p) => ({ slug: p.slug }));
  return list.length ? list : [{ slug: "_vazio" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await getProjectBySlug((await params).slug);
  if (!p) return {};
  return buildMetadata({ title: `${p.client} | Projeto Unaro`, description: p.summary, path: `/projetos/${p.slug}`, image: p.cover.src, noindex: p.demo });
}

export default async function ProjetoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p || isSite(p.types)) notFound();
  const all = await getProjects();
  const next = all.length > 1 ? all[(all.findIndex((o) => o.slug === slug) + 1) % all.length] : undefined;
  return <ProjectDetail p={p} base="/projetos" crumbs={[{ href: "/projetos", label: "Projetos" }]} next={next} />;
}
