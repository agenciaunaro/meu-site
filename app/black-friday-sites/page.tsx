import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { site, absoluteUrl, hasWhatsapp } from "@/lib/site";
import { campanha, brl, economia, descontoPct, waCampanha, beneficios, escopo, etapas, faq, projetos } from "@/lib/campanha";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { CookiePrefsButton } from "@/components/CookieConsent";
import { CampanhaHeader, CtaMobile, CampanhaEventos } from "@/components/campanha/CampanhaChrome";
import { Pair } from "@/components/campanha/Shots";
import { Portfolio } from "@/components/campanha/Portfolio";

const TITLE = "Black Friday Unaro | Site Profissional por R$ 595";
const DESC = "Aproveite a Black Friday Unaro e desenvolva um site profissional por R$ 595. Conheça os projetos, confira o escopo e solicite sua condição especial.";

export const metadata: Metadata = {
  ...buildMetadata({ title: TITLE, description: DESC, path: campanha.rota, image: "/og-black-unaro.png" }),
  title: { absolute: TITLE },
};

const pad = (i: number) => String(i + 1).padStart(2, "0");

function WaButton({ children, cta, event, variant = "light", className = "" }: { children: React.ReactNode; cta: string; event: string; variant?: "light" | "solid"; className?: string }) {
  const v = variant === "light" ? "bg-paper text-ink hover:bg-mist" : "bg-ink text-paper hover:bg-[#2b2b2b]";
  return (
    <a href={waCampanha} target="_blank" rel="noopener noreferrer" data-event={event} data-cta={cta}
      className={`group inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-5 text-[0.86rem] font-semibold uppercase sm:px-7 sm:text-[0.92rem] tracking-[0.02em] transition-colors duration-300 ${v} ${className}`}>
      <span>{children}</span>
      <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} />
    </a>
  );
}

function Preco({ size = "hero" }: { size?: "hero" | "final" }) {
  const big = size === "hero" ? "text-[clamp(5.6rem,2.4rem+10vw,11rem)]" : "text-[clamp(4.5rem,2.2rem+9vw,10rem)]";
  return (
    <div>
      <p className="t-eyebrow text-smoke">De <s className="decoration-1">{brl(campanha.precoRegular)}</s></p>
      <p className="mt-3 flex items-start gap-3">
        <span className="t-eyebrow mt-[0.9em] text-smoke">Por</span>
        <span className={`font-display font-medium leading-[0.82] tracking-[-0.06em] ${big}`}>
          <span className="sr-only">{brl(campanha.precoPromo)}</span>
          <span aria-hidden><span className="align-top text-[0.32em] tracking-[-0.02em]">R$</span>595<span className="text-[0.32em] tracking-[-0.02em]">,00</span></span>
        </span>
      </p>
      <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.92rem] text-smoke">
        <span className="rounded-full border border-line-dark px-3 py-1 text-paper">{descontoPct}% de desconto</span>
        <span>Economia de {brl(economia)} sobre o valor regular</span>
      </p>
    </div>
  );
}

export default function BlackFridaySites() {
  const ld = [
    {
      "@context": "https://schema.org", "@type": "Service", name: campanha.produto, serviceType: "Criação de sites",
      provider: { "@id": absoluteUrl("/#organizacao") }, url: absoluteUrl(campanha.rota), areaServed: "BR",
      offers: { "@type": "Offer", price: campanha.precoPromo.toFixed(2), priceCurrency: "BRL", url: absoluteUrl(campanha.rota) },
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  const stati = projetos.find((p) => p.id === "stati-uniti")!;
  const piva = projetos.find((p) => p.id === "piva")!;

  return (
    <div className="bg-paper">
      <CampanhaHeader wa={waCampanha} />

      {/* HERO */}
      <section id="oferta" data-bf-hero className="grain relative overflow-hidden bg-ink text-paper">
        <div aria-hidden className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,var(--color-line-dark)_1px,transparent_1px)] [background-size:calc(100%/6)_100%] opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <div className="container-x relative grid gap-14 pb-20 pt-28 sm:pt-36 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-28 lg:pt-40">
          <div className="lg:col-span-7">
            <p className="t-eyebrow flex items-center gap-3 text-smoke"><span>{campanha.etiqueta}</span><span aria-hidden className="h-px w-8 bg-current opacity-40" /></p>
            <h1 className="t-h1 mt-7 max-w-[13ch]">Seu negócio merece um site <span className="serif-accent">profissional</span>.</h1>
            <p className="t-lead mt-7 max-w-xl text-smoke">Aproveite a condição especial da Black Unaro para apresentar sua empresa com um site personalizado, moderno e preparado para facilitar o contato com novos clientes.</p>
            <div className="mt-12 border-t border-line-dark pt-10"><Preco /></div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <WaButton cta="hero_principal" event="bf_cta_principal">Quero meu site por R$ 595</WaButton>
              <a href="#escopo" data-event="bf_cta_escopo" data-cta="hero_secundario"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-paper/40 px-7 text-[0.92rem] font-medium uppercase tracking-[0.02em] transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink">
                Conhecer o que está incluso<ArrowDown aria-hidden className="size-4 transition-transform duration-500 group-hover:translate-y-0.5" strokeWidth={1.6} />
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Pair desktop={stati.desktop} mobile={piva.mobile} url={stati.url} nome={stati.nome} nomeMobile={piva.nome} priority phoneWidth="w-[30%]" />
            <p className="mt-5 text-[0.78rem] text-smoke">Sites reais desenvolvidos pela Unaro: {stati.nome} e {piva.nome}.</p>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section id="beneficios" className="container-x section-y">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <p className="t-eyebrow text-ash lg:col-span-3">Benefícios da oferta</p>
          <h2 className="t-h2 max-w-[18ch] lg:col-span-9">Uma presença digital <span className="serif-accent">profissional</span> para o seu negócio.</h2>
        </Reveal>
        <div className="mt-16 grid gap-x-8 sm:grid-cols-2 lg:mt-24 lg:grid-cols-5">
          {beneficios.map((b, i) => (
            <Reveal key={b.t} delay={i * 80} className="border-t border-line py-8 lg:pr-4">
              <span className="t-eyebrow tabular-nums text-stone">{pad(i)}</span>
              <h3 className="mt-6 font-display text-[1.3rem] font-medium leading-tight tracking-[-0.025em]">{b.t}</h3>
              <p className="mt-3 text-[0.96rem] leading-relaxed text-ash">{b.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ESCOPO */}
      <section id="escopo" className="scroll-mt-16 bg-mist">
        <div className="container-x section-y grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="t-eyebrow text-ash">Escopo da promoção</p>
              <h2 className="t-h2 mt-6 max-w-[12ch]">O que está incluso no seu <span className="serif-accent">novo site</span>.</h2>
              <p className="mt-8 max-w-sm leading-relaxed text-ash">Quatro entregas por {brl(campanha.precoPromo)}. Domínio, hospedagem, manutenção recorrente e outros serviços não fazem parte desta condição.</p>
            </div>
          </Reveal>
          <ol className="border-t border-ink/15 lg:col-span-7">
            {escopo.map((e, i) => (
              <Reveal as="li" key={e.t} delay={i * 80} className="group border-b border-ink/15">
                <div className="grid grid-cols-[3rem_1fr] gap-4 py-9 sm:grid-cols-[5rem_1fr] sm:py-11">
                  <span className="font-display text-[0.95rem] tabular-nums text-stone transition-colors duration-500 group-hover:text-ink">{pad(i)}.</span>
                  <div>
                    <h3 className="t-h3 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:translate-x-1.5">{e.t}</h3>
                    <p className="mt-3 max-w-xl leading-relaxed text-ash">{e.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* PORTFÓLIO */}
      <section id="portfolio" className="container-x section-y">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="t-eyebrow text-ash">Portfólio | sites desenvolvidos pela Unaro</p>
            <h2 className="t-h2 mt-6 max-w-[16ch]">Projetos que mostram como <span className="serif-accent">trabalhamos</span>.</h2>
          </div>
          <p className="t-lead text-ash lg:col-span-4">Conheça alguns dos sites que desenvolvemos para empresas de diferentes segmentos.</p>
        </Reveal>
        <div className="mt-16 lg:mt-24"><Portfolio /></div>
        <p className="mt-20 max-w-2xl border-t border-line pt-6 text-[0.85rem] leading-relaxed text-ash">Os projetos apresentados fazem parte do portfólio da Unaro e podem conter funcionalidades adicionais às previstas nesta oferta promocional.</p>
      </section>

      {/* CTA PÓS-PORTFÓLIO */}
      <section className="container-x pb-24 sm:pb-32">
        <Reveal className="grain grid gap-10 rounded-[2rem] bg-ink p-8 text-paper sm:p-12 lg:grid-cols-12 lg:items-end lg:p-16">
          <h2 className="t-h2 lg:col-span-7">Gostou do que viu? O próximo site pode ser o <span className="serif-accent">seu</span>.</h2>
          <div className="lg:col-span-5">
            <p className="leading-relaxed text-smoke">Aproveite a condição especial da Black Unaro para desenvolver uma presença digital profissional para sua empresa.</p>
            <WaButton cta="pos_portfolio" event="bf_cta_pos_portfolio" className="mt-8 w-full sm:w-auto">Quero aproveitar a Black Unaro</WaButton>
          </div>
        </Reveal>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="border-t border-line">
        <div className="container-x section-y">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <p className="t-eyebrow text-ash lg:col-span-3">Como funciona a contratação</p>
            <h2 className="t-h2 max-w-[16ch] lg:col-span-9">Do primeiro contato ao seu <span className="serif-accent">novo site</span>.</h2>
          </Reveal>
          <ol className="mt-16 grid gap-x-8 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
            {etapas.map((e, i) => (
              <Reveal as="li" key={e.t} delay={i * 90} className="relative border-t border-ink py-8">
                <span className="font-display text-[clamp(2.6rem,2rem+2vw,3.6rem)] font-medium leading-none tracking-[-0.05em] text-line">{pad(i)}</span>
                <h3 className="mt-6 font-display text-[1.35rem] font-medium tracking-[-0.025em]">{e.t}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-ash">{e.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* CONDIÇÃO ESPECIAL */}
      <section id="condicao" data-bf-stop className="grain bg-ink text-paper">
        <div className="container-x section-y grid gap-14 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="t-eyebrow text-smoke">Condição especial Black Unaro</p>
            <h2 className="t-h1 mt-6 max-w-[11ch]">Seu novo site começa <span className="serif-accent">aqui</span>.</h2>
            <div className="mt-12"><Preco size="final" /></div>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={120}>
            <ul className="divide-y divide-line-dark border-y border-line-dark">
              {escopo.map((e, i) => (
                <li key={e.t} className="flex items-baseline gap-5 py-4 text-[0.98rem]"><span className="t-eyebrow tabular-nums text-smoke">{pad(i)}</span>{e.t}</li>
              ))}
            </ul>
            {(campanha.validade || campanha.pagamento) && (
              <p className="mt-6 text-[0.9rem] leading-relaxed text-smoke">{[campanha.validade, campanha.pagamento].filter(Boolean).join(" ")}</p>
            )}
            <WaButton cta="condicao_final" event="bf_cta_condicao" className="mt-8 w-full">Garantir minha condição</WaButton>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container-x section-y grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="t-eyebrow text-ash">Perguntas frequentes</p>
          <h2 className="t-h2 mt-6 max-w-[10ch]">Ficou com alguma <span className="serif-accent">dúvida</span>?</h2>
          <p className="mt-8 max-w-xs leading-relaxed text-ash">Se a sua pergunta não estiver aqui, fale com a gente pelo WhatsApp.</p>
        </Reveal>
        <div className="border-t border-line lg:col-span-8">
          {faq.map((f) => (
            <details key={f.q} data-bf-faq data-q={f.q} className="group border-b border-line">
              <summary className="flex min-h-14 cursor-pointer list-none items-start justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                <span className="font-display text-[1.15rem] font-medium leading-snug tracking-[-0.02em] sm:text-[1.3rem]">{f.q}</span>
                <span aria-hidden className="relative mt-2 size-4 shrink-0"><span className="absolute top-1/2 h-px w-4 bg-ink" /><span className="absolute top-1/2 h-px w-4 rotate-90 bg-ink transition-transform duration-300 group-open:rotate-0" /></span>
              </summary>
              <p className="max-w-2xl pb-7 leading-relaxed text-ash">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* RODAPÉ DA CAMPANHA */}
      <footer data-bf-stop className="grain bg-ink text-paper">
        <div className="container-x pb-8 pt-16 sm:pt-20">
          <div className="mb-14 flex flex-col gap-6 border-b border-line-dark pb-14 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="t-eyebrow text-smoke">Agência Unaro</p>
              <p className="mt-4 max-w-md font-display text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] font-medium leading-tight tracking-[-0.03em]">Quer conhecer melhor a <span className="serif-accent">Unaro</span>?</p>
            </div>
            <Link href="/" data-event="bf_site_institucional" data-cta="rodape_destaque"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-paper/40 px-6 text-[0.92rem] font-medium transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink sm:w-auto">
              Visitar o site da Unaro
              <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.6} />
            </Link>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Link href="/" aria-label="Unaro, site institucional" className="inline-flex"><Image src="/brand/logo-unaro-branco.png" alt="Unaro" width={344} height={123} className="h-10 w-auto" /></Link>
              <p className="t-eyebrow mt-6 text-smoke">{campanha.nome}</p>
            </div>
            <div className="lg:col-span-3 lg:col-start-7">
              <h2 className="t-eyebrow text-smoke">Contato</h2>
              <ul className="mt-5 space-y-2.5 text-[0.95rem]">
                {hasWhatsapp() && <li><a className="link-u" href={waCampanha} target="_blank" rel="noopener noreferrer" data-event="bf_whatsapp_rodape" data-cta="rodape">WhatsApp {site.phoneDisplay}</a></li>}
                {site.email && <li><a className="link-u" href={`mailto:${site.email}`}>{site.email}</a></li>}
                <li className="text-smoke">{site.address.street}, {site.address.district}<br />{site.address.city}, {site.address.region}</li>
              </ul>
            </div>
            <div className="lg:col-span-3">
              <h2 className="t-eyebrow text-smoke">Unaro</h2>
              <ul className="mt-5 space-y-2.5 text-[0.95rem]">
                <li><Link className="link-u" href="/" data-event="bf_site_institucional" data-cta="rodape">Site institucional</Link></li>
                <li><Link className="link-u" href="/sites">Sites desenvolvidos</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-14 flex flex-col gap-3 border-t border-line-dark pt-6 pb-20 text-[0.82rem] text-smoke sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 md:pb-0">
            <p>© {new Date().getFullYear()} Unaro · {campanha.nome}</p>
            <Link href="/politica-de-privacidade" className="link-u w-fit hover:text-paper">Política de Privacidade</Link>
            <Link href="/politica-de-cookies" className="link-u w-fit hover:text-paper">Política de Cookies</Link>
            <CookiePrefsButton className="link-u w-fit text-left hover:text-paper" />
          </div>
        </div>
      </footer>

      <CtaMobile wa={waCampanha} label="Quero meu site por R$ 595" />
      <CampanhaEventos />
      <JsonLd data={ld} />
    </div>
  );
}
