import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProjects } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { PageHead, ContactSection } from "@/components/sections";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProjectFilter } from "@/components/ProjectFilter";
import { DemoNotice } from "@/components/DemoBadge";

export const metadata: Metadata = buildMetadata({
  title: "Projetos e cases | Portfólio da Unaro",
  description: "Projetos de marketing, conteúdo, campanhas e sites desenvolvidos pela Unaro. Filtre por tipo de serviço.",
  path: "/projetos",
});
export const revalidate = 300;

export default async function ProjetosPage() {
  const projects = await getProjects();
  return (
    <>
      <PageHead eyebrow="Projetos" title={<>Conheça alguns dos nossos <span className="serif-accent">trabalhos</span>.</>}
        text="Projetos de marketing, conteúdo, campanhas e sites. Cada trabalho mostra o contexto, o que foi desenvolvido e, quando disponíveis, os resultados comprovados.">
        <Breadcrumbs items={[{ href: "/projetos", label: "Projetos" }]} />
      </PageHead>
      <section className="container-x pb-10">
        <Link href="/sites" className="group flex items-center justify-between gap-6 rounded-[1.5rem] bg-ink p-7 text-paper sm:p-10">
          <span><span className="t-eyebrow text-smoke">Destaque</span><span className="mt-3 block font-display text-[clamp(1.6rem,1.2rem+1.6vw,2.6rem)] font-medium tracking-[-0.03em]">Sites desenvolvidos pela Unaro</span></span>
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-paper text-ink transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight className="size-5" aria-hidden /></span>
        </Link>
      </section>
      <section className="container-x pb-24 pt-10">
        {projects.some((p) => p.demo) && <div className="mb-10"><DemoNotice /></div>}
        {projects.length ? <ProjectFilter projects={projects} /> : <p className="rounded-2xl bg-mist p-10 text-ash">Os projetos estão sendo cadastrados.</p>}
      </section>
      <ContactSection />
    </>
  );
}
