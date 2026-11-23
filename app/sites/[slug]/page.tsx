import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteProjects, getProjectBySlug, getProjects } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { ProjectDetail } from "@/components/ProjectDetail";

export const revalidate = 300;
export async function generateStaticParams() {
  const list = (await getSiteProjects()).map((p) => ({ slug: p.slug }));
  return list.length ? list : [{ slug: "_vazio" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await getProjectBySlug((await params).slug);
  if (!p) return {};
  return buildMetadata({ title: `${p.client} | ${p.siteType || "Site"} desenvolvido pela Unaro`, description: p.summary, path: `/sites/${p.slug}`, image: p.cover.src, noindex: p.demo });
}

export default async function SitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) notFound();
  const all = await getProjects();
  const next = all.length > 1 ? all[(all.findIndex((o) => o.slug === slug) + 1) % all.length] : undefined;
  return <ProjectDetail p={p} base="/sites" crumbs={[{ href: "/projetos", label: "Projetos" }, { href: "/sites", label: "Sites desenvolvidos" }]} next={next} />;
}
