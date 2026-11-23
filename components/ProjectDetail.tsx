import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { Breadcrumbs } from "./Breadcrumbs";
import { Button, Eyebrow } from "./Button";
import { BrowserFrame, PhoneFrame, DevicePair } from "./Device";
import { DemoBadge } from "./DemoBadge";
import { Reveal } from "./Reveal";
import { JsonLd } from "./JsonLd";
import { caseHref } from "./CaseFeature";
import { waLink, absoluteUrl } from "@/lib/site";

const ytId = (u = "") => u.match(/(?:youtu\.be\/|v=|shorts\/)([\w-]{11})/)?.[1];

/**
 * Página individual de case. A apresentação muda conforme o tipo:
 * sites mostram mockups desktop e mobile; conteúdo e campanhas mostram galeria e materiais.
 * Seções sem dados não são exibidas (nada é preenchido com informação não confirmada).
 */
export function ProjectDetail({ p, base, crumbs, next }: { p: Project; base: string; crumbs: { href: string; label: string }[]; next?: Project }) {
  const isSite = p.types.includes("websites") || p.types.includes("landing-pages");
  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  return (
    <>
      {/* 1. Hero */}
      <section className="container-x pb-14 pt-36 sm:pt-44">
        <Breadcrumbs items={[...crumbs, { href: `${base}/${p.slug}`, label: p.client }]} />
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3"><Eyebrow className="text-ash">{p.siteType || "Case"}</Eyebrow>{p.demo && <DemoBadge className="text-stone" />}</div>
            <h1 className="t-display mt-6 max-w-[12ch]">{p.client}</h1>
            {p.headline && <p className="mt-8 max-w-2xl font-serif text-[clamp(1.5rem,1.2rem+1.1vw,2.2rem)] italic leading-snug">{p.headline}</p>}
          </div>
          <dl className="grid gap-5 border-t border-line pt-6 text-[0.95rem] lg:col-span-4">
            <div className="flex justify-between gap-6"><dt className="text-ash">Segmento</dt><dd className="text-right">{p.segment}</dd></div>
            {p.location && <div className="flex justify-between gap-6"><dt className="text-ash">Localização</dt><dd className="text-right">{p.location}</dd></div>}
            {p.url && <div className="flex justify-between gap-6"><dt className="text-ash">Site</dt><dd className="text-right"><a className="link-u" href={p.url} target="_blank" rel="noopener noreferrer">{p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</a></dd></div>}
          </dl>
        </div>
      </section>

      <section className={isSite ? "bg-mist py-14 sm:py-24" : "container-x"}>
        {isSite ? (
          <div className="container-x"><DevicePair desktop={p.desktop[0] || p.cover} mobile={p.mobile[0]} url={p.url} priority /></div>
        ) : (
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-mist sm:aspect-[16/10]"><Image src={p.cover.src} alt={p.cover.alt} fill priority sizes="100vw" className="object-cover object-[50%_35%]" /></div>
        )}
      </section>

      {/* 2. Contexto */}
      {(p.context || p.challenge) && (
        <section className="container-x section-y">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4"><Eyebrow n={num()} className="text-ash">Contexto</Eyebrow></div>
            <div className="space-y-8 lg:col-span-7 lg:col-start-6">
              <p className="t-lead">{p.summary}</p>
              {p.context && <p className="leading-relaxed text-[#2a2a2a]">{p.context}</p>}
              {p.challenge && <div className="border-t border-line pt-6"><h2 className="t-eyebrow text-ash">Necessidade do negócio</h2><p className="mt-3 text-[1.08rem] leading-relaxed">{p.challenge}</p></div>}
            </div>
          </div>
        </section>
      )}

      {/* 3. Objetivos e abordagem  +  4. Serviços */}
      {(p.objective || p.solution || p.services.length > 0) && (
        <section className="grain section-y bg-ink text-paper">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4"><Eyebrow n={num()} className="text-smoke">{p.objective || p.solution ? "Objetivos e abordagem" : "Serviços"}</Eyebrow></div>
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="grid gap-10 sm:grid-cols-2">
                {p.objective && <div><h2 className="t-eyebrow text-smoke">Objetivo</h2><p className="mt-4 leading-relaxed text-paper/85">{p.objective}</p></div>}
                {p.solution && <div><h2 className="t-eyebrow text-smoke">Abordagem</h2><p className="mt-4 leading-relaxed text-paper/85">{p.solution}</p></div>}
              </div>
              <div className={p.objective || p.solution ? "mt-14 border-t border-line-dark pt-8" : ""}>
                <h2 className="t-eyebrow text-smoke">Serviços desenvolvidos pela Unaro</h2>
                <ul className="mt-5 flex flex-wrap gap-2">{p.services.map((s) => <li key={s} className="rounded-full border border-line-dark px-4 py-2 text-[0.9rem]">{s}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Identidade visual (cases de site e branding) */}
      {p.identity && (
        <section className="container-x section-y">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4"><Eyebrow n={num()} className="text-ash">Identidade visual</Eyebrow></div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="grid grid-cols-3 gap-3">{p.identity.colors.map((c) => <li key={c}><span className="block aspect-[4/5] rounded-xl border border-line" style={{ background: c }} /><span className="mt-3 block font-mono text-[0.8rem] uppercase text-ash">{c}</span></li>)}</ul>
              <dl className="mt-10 grid gap-8 sm:grid-cols-2">
                <div><dt className="t-eyebrow text-ash">Tipografia</dt><dd className="mt-3 leading-relaxed">{p.identity.typography}</dd></div>
                <div><dt className="t-eyebrow text-ash">Direção de arte</dt><dd className="mt-3 leading-relaxed">{p.identity.direction}</dd></div>
              </dl>
            </div>
          </div>
        </section>
      )}

      {/* 5. Galeria editorial */}
      {p.gallery && p.gallery.length > 0 && (
        <section className="container-x pb-24">
          <Eyebrow n={num()} className="text-ash">Galeria</Eyebrow>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {p.gallery.map((g, i) => (
              <Reveal key={g.src} className={i % 3 === 0 ? "sm:col-span-2" : ""}>
                <figure>
                  <div className={`relative overflow-hidden rounded-[1.25rem] bg-mist ${i % 3 === 0 ? "aspect-[16/9]" : "aspect-[4/5]"}`}><Image src={g.src} alt={g.alt} fill sizes={i % 3 === 0 ? "100vw" : "50vw"} className="object-cover" /></div>
                  {g.caption && <figcaption className="mt-3 text-[0.85rem] text-ash">{g.caption}</figcaption>}
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* 6. Materiais produzidos: sites (telas) */}
      {isSite && p.desktop.length > 0 && (
        <section className="container-x pb-24">
          <Eyebrow n={num()} className="text-ash">Experiência digital</Eyebrow>
          <div className="mt-10 space-y-10">{p.desktop.map((img, i) => <Reveal key={img.src}><BrowserFrame src={img.src} alt={img.alt} url={i === 0 ? p.url : undefined} /></Reveal>)}</div>
        </section>
      )}
      {isSite && p.mobile.length > 0 && (
        <section className="bg-mist section-y">
          <div className="container-x">
            <Eyebrow n={num()} className="text-ash">Versão mobile</Eyebrow>
            <div className="mt-12 grid grid-cols-2 gap-5 sm:gap-8 md:grid-cols-4">{p.mobile.map((img, i) => <Reveal key={img.src} delay={i * 80}><PhoneFrame src={img.src} alt={img.alt} /></Reveal>)}</div>
          </div>
        </section>
      )}

      {/* 6. Materiais produzidos: vídeos, peças, links */}
      {p.materials && p.materials.length > 0 && (
        <section className="container-x section-y">
          <Eyebrow n={num()} className="text-ash">Materiais produzidos</Eyebrow>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {p.materials.map((m, i) => {
              const yt = ytId(m.url);
              return (
                <figure key={i}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-ink">
                    {m.kind === "video" && m.src ? <video src={m.src} controls playsInline preload="metadata" className="size-full object-cover" />
                      : yt ? <iframe src={`https://www.youtube-nocookie.com/embed/${yt}`} title={m.alt} loading="lazy" allow="encrypted-media; picture-in-picture" allowFullScreen className="size-full" />
                      : m.src ? <Image src={m.src} alt={m.alt} fill sizes="33vw" className="object-cover" /> : null}
                  </div>
                  <figcaption className="mt-3 flex items-start justify-between gap-4 text-[0.88rem] text-ash">
                    <span>{m.caption || m.alt}</span>
                    {m.url && !yt && <a href={m.url} target="_blank" rel="noopener noreferrer" className="link-u shrink-0">Abrir</a>}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      )}

      {/* 7. Resultados comprovados (somente quando fornecidos) */}
      {p.results && p.results.length > 0 && (
        <section className="container-x section-y">
          <Eyebrow n={num()} className="text-ash">Resultados</Eyebrow>
          <ul className="mt-8 divide-y divide-line border-y border-line">{p.results.map((r) => <li key={r} className="py-6 t-h3">{r}</li>)}</ul>
        </section>
      )}

      {/* 8. CTA */}
      <section className="container-x section-y">
        <div className="grain grid gap-10 rounded-[2rem] bg-ink p-8 text-paper sm:p-12 lg:grid-cols-12 lg:items-end lg:p-16">
          <h2 className="t-h1 lg:col-span-7">{isSite ? <>Vamos desenvolver o site da sua <span className="serif-accent">empresa</span>?</> : <>Vamos conversar sobre a sua <span className="serif-accent">empresa</span>?</>}</h2>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="leading-relaxed text-smoke">Conte um pouco sobre o seu negócio e o que você precisa. Podemos conversar sobre as possibilidades para o seu projeto.</p>
            <Button href={waLink(isSite ? "Olá, Unaro! Vi o portfólio de sites e quero solicitar um orçamento." : `Olá, Unaro! Vi o case ${p.client} no site e quero conversar.`)} variant="light" className="mt-7" dataEvent="cta_case">{isSite ? "Solicitar orçamento" : "Conversar com a Unaro"}</Button>
          </div>
        </div>
      </section>

      {/* 9. Próximo projeto */}
      {next && (
        <nav aria-label="Próximo projeto" className="border-t border-line">
          <Link href={caseHref(next)} className="group container-x grid gap-8 py-16 sm:grid-cols-12 sm:items-center sm:py-24">
            <div className="sm:col-span-7">
              <p className="t-eyebrow text-ash">Próximo projeto</p>
              <p className="mt-5 font-display text-[clamp(2.4rem,1.5rem+4vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.045em] transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:translate-x-2">{next.client}</p>
              <p className="mt-3 text-ash">{[next.segment, next.location].filter(Boolean).join(" · ")}</p>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-mist sm:col-span-4 sm:col-start-9">
              <Image src={next.cover.src} alt="" fill sizes="35vw" className="object-cover object-top transition-transform duration-[1.2s] group-hover:scale-[1.04]" />
              <span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-paper text-ink"><ArrowUpRight className="size-5" strokeWidth={1.6} /></span>
            </div>
          </Link>
        </nav>
      )}

      {!p.demo && <JsonLd data={{ "@context": "https://schema.org", "@type": "CreativeWork", name: p.client, about: p.segment, description: p.summary, url: absoluteUrl(`${base}/${p.slug}`), creator: { "@id": absoluteUrl("/#organizacao") }, ...(p.url ? { sameAs: p.url } : {}) }} />}
    </>
  );
}
