import type { Metadata } from "next";
import { getSiteProjects } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Eyebrow, Button } from "@/components/Button";
import { SiteCard } from "@/components/ProjectCard";
import { DemoNotice } from "@/components/DemoBadge";
import { Reveal } from "@/components/Reveal";
import { waLink } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Sites desenvolvidos pela Unaro | Portfólio de sites e landing pages",
  description: "Conheça sites institucionais e landing pages desenvolvidos pela Unaro para empresas de diferentes segmentos, com versões desktop e mobile.",
  path: "/sites",
});
export const revalidate = 300;

export default async function SitesPage() {
  const sites = await getSiteProjects();
  const hasDemo = sites.some((s) => s.demo);
  return (
    <>
      <section className="container-x pb-16 pt-36 sm:pt-44">
        <Breadcrumbs items={[{ href: "/projetos", label: "Projetos" }, { href: "/sites", label: "Sites desenvolvidos" }]} />
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8"><Eyebrow className="text-ash">Portfólio</Eyebrow><h1 className="t-display mt-6 max-w-[11ch]">Sites desenvolvidos pela <span className="serif-accent">Unaro</span>.</h1></div>
          <p className="t-lead text-ash lg:col-span-4">Conheça alguns dos projetos que desenvolvemos para empresas de diferentes segmentos. Cada site é pensado de acordo com a identidade da marca, suas necessidades e a experiência que deseja oferecer aos clientes.</p>
        </div>
      </section>
      <section className="container-x pb-24">
        {hasDemo && <div className="mb-12"><DemoNotice /></div>}
        {sites.length === 0 ? (
          <p className="rounded-2xl bg-mist p-10 text-ash">Os projetos estão sendo cadastrados. Enquanto isso, fale com a gente para ver exemplos do nosso trabalho.</p>
        ) : (
          <div className="grid gap-x-8 gap-y-20 md:grid-cols-2">
            {sites.map((p, i) => <Reveal key={p.slug} className={i % 3 === 0 ? "md:col-span-2" : ""}><SiteCard p={p} priority={i === 0} /></Reveal>)}
          </div>
        )}
      </section>
      <section className="container-x pb-24">
        <div className="grain grid gap-10 rounded-[2rem] bg-ink p-8 text-paper sm:p-12 lg:grid-cols-12 lg:items-end lg:p-16">
          <h2 className="t-h1 lg:col-span-7">Vamos desenvolver o site da sua <span className="serif-accent">empresa</span>?</h2>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="leading-relaxed text-smoke">Conte um pouco sobre o seu negócio e o que você precisa. Podemos conversar sobre as possibilidades para o seu projeto.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={waLink("Olá, Unaro! Vi o portfólio de sites e quero solicitar um orçamento.")} variant="light" dataEvent="cta_orcamento_sites">Solicitar orçamento</Button>
              <Button href="/servicos/criacao-de-sites" variant="outline-light">Como trabalhamos</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
