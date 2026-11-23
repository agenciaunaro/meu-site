import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { services, getService } from "@/content/services";
import { getPosts, getCategories, getProjects } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { waLink, absoluteUrl, site } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button, Eyebrow } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { PostCard } from "@/components/PostCard";
import { SiteCard } from "@/components/ProjectCard";
import { ContactSection } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";

export const dynamicParams = false;
export function generateStaticParams() { return services.map((s) => ({ slug: s.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return buildMetadata({ title: s.seoTitle, description: s.seoDescription, path: `/servicos/${s.slug}` });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const [posts, categories, projects] = await Promise.all([getPosts(), getCategories(), getProjects()]);
  const related = posts.filter((p) => s.relatedPosts.includes(p.slug)).slice(0, 2);
  const relatedProjects = s.portfolioType ? projects.filter((p) => p.types.includes(s.portfolioType as never) || (s.slug === "criacao-de-sites" && p.types.includes("landing-pages"))).slice(0, 2) : [];
  const others = services.filter((x) => x.slug !== s.slug);
  const isSites = s.slug === "criacao-de-sites";

  return (
    <>
      <section className="container-x pb-16 pt-36 sm:pt-44 lg:pb-24">
        <Breadcrumbs items={[{ href: "/servicos", label: "Serviços" }, { href: `/servicos/${s.slug}`, label: s.title }]} />
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow className="text-ash">{s.short}</Eyebrow>
            <h1 className="t-h1 mt-6 max-w-[14ch]">{s.title}</h1>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
            <Button href={waLink(s.cta.whatsappMessage)} dataEvent={`whatsapp_servico_${s.slug}`}>Solicitar informações</Button>
            {isSites && <Button href="/sites" variant="outline">Ver sites desenvolvidos</Button>}
          </div>
        </div>
        <div className="mt-14 grid gap-8 border-t border-line pt-10 text-[1.1rem] leading-relaxed text-[#2a2a2a] md:grid-cols-2 lg:mt-20">
          {s.intro.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
        </div>
      </section>

      {/* Problemas */}
      <section className="bg-mist section-y" aria-labelledby="problemas">
        <div className="container-x">
          <Eyebrow n="01" className="text-ash">Situações comuns</Eyebrow>
          <h2 id="problemas" className="t-h2 mt-6 max-w-[18ch]">O que costuma travar quem nos procura.</h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2">
            {s.problems.map((p) => (
              <div key={p.title} className="bg-mist p-7 sm:p-10"><h3 className="t-h3">{p.title}</h3><p className="mt-4 max-w-md leading-relaxed text-ash">{p.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Incluído */}
      <section className="container-x section-y" aria-labelledby="incluido">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow n="02" className="text-ash">O que está incluído</Eyebrow>
              <h2 id="incluido" className="t-h2 mt-6">Escopo do <span className="serif-accent">trabalho</span>.</h2>
              <p className="mt-6 text-ash">O escopo final é definido a partir do diagnóstico. Estes são os componentes mais frequentes.</p>
            </div>
          </div>
          <ul className="lg:col-span-7 lg:col-start-6">
            {s.included.map((it, i) => (
              <li key={it.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-7 last:border-b">
                <span className="t-eyebrow tabular-nums pt-2 text-stone">{String(i + 1).padStart(2, "0")}</span>
                <div><h3 className="font-display text-[1.45rem] font-medium tracking-[-0.03em]">{it.title}</h3><p className="mt-2 leading-relaxed text-ash">{it.text}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Processo */}
      <section className="grain section-y bg-ink text-paper" aria-labelledby="processo">
        <div className="container-x">
          <Eyebrow n="03" className="text-smoke">Como funciona a entrega</Eyebrow>
          <h2 id="processo" className="t-h2 mt-6 max-w-[16ch]">Etapas do <span className="serif-accent">processo</span>.</h2>
          <ol className="mt-16 grid gap-px overflow-hidden rounded-[1.5rem] bg-line-dark sm:grid-cols-2 lg:grid-cols-5">
            {s.process.map((st, i) => (
              <li key={st.title} className="flex min-h-64 flex-col justify-between gap-10 bg-ink p-7">
                <span className="font-display text-[2.6rem] font-medium leading-none tracking-[-0.04em] text-paper/25 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div><h3 className="text-[1.2rem] font-medium">{st.title}</h3><p className="mt-3 text-[0.95rem] leading-relaxed text-smoke">{st.text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="container-x section-y" aria-labelledby="diferenciais">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow n="04" className="text-ash">Diferenciais</Eyebrow>
            <h2 id="diferenciais" className="t-h2 mt-6">Por que com a <span className="serif-accent">Unaro</span>.</h2>
          </div>
          <ul className="space-y-6 lg:col-span-6 lg:col-start-7">
            {s.differentials.map((d) => (
              <li key={d} className="flex gap-5 text-[1.12rem] leading-relaxed"><span aria-hidden className="mt-[0.8em] h-px w-6 shrink-0 bg-ink" />{d}</li>
            ))}
          </ul>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="container-x pb-24" aria-labelledby="projetos-relacionados">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 id="projetos-relacionados" className="t-h3">Projetos relacionados</h2>
            <Link href={isSites ? "/sites" : "/projetos"} className="link-u text-[0.95rem]">Ver portfólio completo</Link>
          </div>
          <div className="grid gap-10 md:grid-cols-2">{relatedProjects.map((p) => <SiteCard key={p.slug} p={p} base={isSites ? "/sites" : "/projetos"} />)}</div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-mist section-y" aria-labelledby="faq">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><Eyebrow n="05" className="text-ash">Perguntas frequentes</Eyebrow><h2 id="faq" className="t-h2 mt-6">Dúvidas sobre {s.title.toLowerCase()}.</h2></div>
          <div className="lg:col-span-7 lg:col-start-6"><Faq items={s.faq} /></div>
        </div>
      </section>

      {/* Conteúdos */}
      {related.length > 0 && (
        <section className="container-x section-y" aria-labelledby="conteudos">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div><Eyebrow className="text-ash">Conteúdos complementares</Eyebrow><h2 id="conteudos" className="t-h3 mt-4">Para aprofundar o assunto</h2></div>
            <Link href="/blog" className="link-u text-[0.95rem]">Ir para o blog</Link>
          </div>
          <div className="grid gap-10 md:grid-cols-2">{related.map((p) => <PostCard key={p.slug} post={p} categories={categories} />)}</div>
        </section>
      )}

      {/* CTA contextual */}
      <section className="container-x pb-24">
        <div className="grid gap-10 rounded-[2rem] bg-ink p-8 text-paper sm:p-12 lg:grid-cols-12 lg:items-end lg:p-16">
          <h2 className="t-h2 lg:col-span-7">{s.cta.title}</h2>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="leading-relaxed text-smoke">{s.cta.text}</p>
            <Button href={waLink(s.cta.whatsappMessage)} variant="light" className="mt-7" dataEvent={`whatsapp_servico_${s.slug}_cta`}>{isSites ? "Solicitar orçamento" : "Solicitar informações"}</Button>
          </div>
        </div>
      </section>

      {/* Outras soluções */}
      <section className="container-x pb-24" aria-labelledby="outras">
        <h2 id="outras" className="t-eyebrow text-ash">Outras soluções</h2>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {others.map((o) => (
            <li key={o.slug}><Link href={`/servicos/${o.slug}`} className="group flex h-full items-start justify-between gap-4 bg-paper p-6 transition-colors hover:bg-mist"><span className="font-medium leading-snug">{o.title}</span><ArrowUpRight className="size-4 shrink-0 text-stone group-hover:text-ink" aria-hidden /></Link></li>
          ))}
        </ul>
      </section>

      <ContactSection title="Vamos conversar sobre sua empresa?" defaultService={s.title} />

      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "Service", name: s.title, description: s.seoDescription, url: absoluteUrl(`/servicos/${s.slug}`), areaServed: "Curitiba e região", provider: { "@id": absoluteUrl("/#organizacao"), name: site.name } },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: s.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      ]} />
    </>
  );
}
