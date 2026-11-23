import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Eyebrow, Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Rod } from "@/components/Rod";
import { IllustrativePhoto } from "@/components/IllustrativePhoto";
import { CaseFeature } from "@/components/CaseFeature";
import { PostCard } from "@/components/PostCard";
import { ServicesIndex, Founder, ContactSection } from "@/components/sections";
import { getCategories, getPosts, getProjects } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Unaro | Agência de marketing personalizado em Curitiba",
  description: "Estratégia, tráfego pago, conteúdo, sites e CRM planejados a partir do negócio de cada cliente. Conheça a Unaro e o Método ROD.",
  path: "/",
});
export const revalidate = 300;

export default async function Home() {
  const [posts, categories, projects] = await Promise.all([getPosts(), getCategories(), getProjects()]);
  const latest = posts.slice(0, 5);
  const featured = projects.filter((p) => p.featured);
  const cases = (featured.length ? featured : projects).slice(0, 3);

  return (
    <>
      <Hero />

      {/* Sobre */}
      <section className="container-x section-y" aria-labelledby="sobre-titulo">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><Eyebrow n="01" className="text-ash">Sobre a Unaro</Eyebrow></div>
          <div className="lg:col-span-8">
            <Reveal><h2 id="sobre-titulo" className="t-h2 max-w-[18ch]">Uma agência <span className="serif-accent">próxima</span> do seu negócio.</h2></Reveal>
            <div className="mt-10 grid gap-8 text-[1.08rem] leading-relaxed text-[#2a2a2a] md:grid-cols-2">
              <p>A Unaro é uma agência de marketing personalizado que atua com estratégia, conteúdo, mídia paga, desenvolvimento de sites e soluções digitais. Nosso trabalho começa entendendo o que cada empresa precisa, quais oportunidades existem e como o marketing pode contribuir para seus objetivos.</p>
              <p>Acompanhamos o desenvolvimento das estratégias de perto, com atenção aos resultados e à construção de uma presença digital consistente.</p>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-12">
          {/* Foto ilustrativa de banco de imagens: substituir por foto real da Unaro */}
          <Reveal className="lg:col-span-7">
            <IllustrativePhoto src="/images/institucional/ambiente-de-trabalho.webp" alt="Mesa de trabalho em um estúdio criativo com luz natural" className="aspect-[16/11]" sizes="(min-width:1024px) 55vw, 100vw" note="Ambiente de trabalho criativo" />
          </Reveal>
          <ol className="grid gap-px self-stretch overflow-hidden rounded-[1.5rem] border border-line bg-line lg:col-span-5">
            {[
              ["Proximidade", "Participamos das decisões e acompanhamos os projetos de perto."],
              ["Personalização", "Cada estratégia considera as particularidades do negócio."],
              ["Análise", "Acompanhamos indicadores para orientar ajustes e decisões."],
            ].map(([t, d], i) => (
              <li key={t} className="flex flex-col justify-between gap-8 bg-paper p-7 sm:p-8">
                <span className="t-eyebrow tabular-nums text-stone">{String(i + 1).padStart(2, "0")}</span>
                <div><h3 className="t-h3">{t}</h3><p className="mt-3 text-ash">{d}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Serviços */}
      <section className="container-x pb-[clamp(5rem,3rem+8vw,10rem)]" aria-labelledby="servicos-titulo">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow n="02" className="text-ash">Serviços</Eyebrow>
            <h2 id="servicos-titulo" className="t-h2 mt-6">Como podemos ajudar <span className="serif-accent">sua empresa</span>.</h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:text-right"><Button href="/servicos" variant="outline">Ver todos os serviços</Button></div>
        </div>
        <ServicesIndex />
      </section>

      {/* Método ROD */}
      <section className="grain section-y bg-ink text-paper" aria-labelledby="rod-titulo">
        <div className="container-x"><Rod n="03" /></div>
      </section>

      {/* Cases selecionados */}
      {cases.length > 0 && (
        <section className="container-x section-y" aria-labelledby="projetos-titulo">
          <div className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow n="04" className="text-ash">Cases</Eyebrow>
              <h2 id="projetos-titulo" className="t-h2 mt-6">Conheça alguns dos nossos <span className="serif-accent">trabalhos</span>.</h2>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <Button href="/projetos" variant="outline">Ver portfólio</Button>
              {projects.some((p) => p.types.includes("websites") || p.types.includes("landing-pages")) && <Button href="/sites" dataEvent="cta_home_sites">Ver projetos de sites</Button>}
            </div>
          </div>
          <div className="space-y-20 lg:space-y-28">
            {cases.map((p, i) => <Reveal key={p.slug}><CaseFeature p={p} index={i} total={cases.length} flip={i % 2 === 1} /></Reveal>)}
          </div>
        </section>
      )}

      <Founder />

      {/* Insights */}
      <section className="container-x section-y" aria-labelledby="insights-titulo">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow n="05" className="text-ash">Blog</Eyebrow>
            <h2 id="insights-titulo" className="t-h2 mt-6">Insights <span className="serif-accent">Unaro</span>.</h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:text-right"><Button href="/blog" variant="outline">Explorar conteúdos</Button></div>
        </div>
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-12">
          {latest[0] && <Reveal className="md:col-span-2 lg:col-span-6"><PostCard post={latest[0]} categories={categories} large /></Reveal>}
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 md:col-span-2 lg:col-span-6">
            {latest.slice(1).map((p, i) => <Reveal key={p.slug} delay={(i % 2 + 1) * 80}><PostCard post={p} categories={categories} /></Reveal>)}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
