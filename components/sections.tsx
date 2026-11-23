import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, Button } from "./Button";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";
import { services } from "@/content/services";
import { site, waLink, hasWhatsapp } from "@/lib/site";

/* Lista editorial de serviços: linhas grandes, resumo ao lado */
export function ServicesIndex() {
  return (
    <ul className="border-t border-line">
      {services.map((s, i) => (
        <li key={s.slug} className="border-b border-line">
          <Link href={`/servicos/${s.slug}`} className="group grid gap-3 py-7 sm:py-9 lg:grid-cols-12 lg:items-baseline lg:gap-8">
            <span className="t-eyebrow tabular-nums text-stone lg:col-span-1">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="font-display text-[clamp(1.75rem,1.2rem+2vw,3.1rem)] font-medium leading-[1.02] tracking-[-0.04em] transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:translate-x-2 lg:col-span-6">{s.title}</h3>
            <p className="max-w-md text-[1rem] leading-relaxed text-ash lg:col-span-4">{s.homeSummary}</p>
            <span className="hidden justify-self-end lg:col-span-1 lg:block">
              <span className="grid size-11 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                <ArrowUpRight className="size-4" strokeWidth={1.6} aria-hidden />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* Seção do fundador com campos editáveis */
export function Founder() {
  return (
    <section className="section-y bg-mist" aria-labelledby="fundador-titulo">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          {/* Fotografia do fundador: /public/images/fundador.webp */}
          <figure className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-ink">
            <Image src="/images/fundador.webp" alt={`${site.founder.name}, ${site.founder.role.toLowerCase()}`} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover object-[50%_20%]" />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/70 to-transparent p-6 pt-16 text-[0.85rem] text-paper">
              <span className="font-medium">{site.founder.name}</span><span className="text-paper/75">{site.founder.role}</span>
            </figcaption>
          </figure>
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <Eyebrow className="text-ash">Quem está por trás da Unaro</Eyebrow>
          <h2 id="fundador-titulo" className="t-h2 mt-6">Prazer, somos a <span className="serif-accent">Unaro</span>.</h2>
          <div className="mt-8 space-y-5 text-[1.08rem] leading-relaxed text-[#2a2a2a]">
            <p>A Unaro nasceu em Curitiba com uma ideia simples: marketing precisa partir do negócio de cada cliente, e não de um pacote pronto. Por isso, cada projeto começa com conversa, análise e um plano feito para aquela empresa.</p>
            <p>À frente da agência está {site.founder.name}, que acompanha de perto o planejamento, a produção de conteúdo, as campanhas de tráfego pago e o relacionamento com cada cliente. Quem contrata a Unaro fala diretamente com quem pensa e executa a estratégia.</p>
            <p>Hoje a agência atende empresas de segmentos como mercado imobiliário, concessionárias, e-commerce de moda e prestadores de serviços, sempre com o mesmo cuidado de entender a realidade de cada negócio antes de propor qualquer ação.</p>
          </div>
          {/* Campos editáveis: preencher com informações confirmadas (formação, ano de fundação, experiências anteriores) */}
          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {[["Base", "Curitiba, PR"], ["Atuação", "Estratégia, conteúdo, mídia paga e sites"], ["Atendimento", "Direto com quem executa"]].map(([k, v]) => (
              <div key={k} className="bg-mist p-5"><dt className="t-eyebrow text-ash">{k}</dt><dd className="mt-2 text-[0.98rem] leading-snug">{v}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* Contato final */
export function ContactSection({ title = "Vamos conversar sobre sua empresa?", text = "Se você está procurando uma agência para desenvolver seu marketing, criar um site ou estruturar novas ações digitais, entre em contato com a Unaro.", defaultService = "" }: { title?: string; text?: string; defaultService?: string }) {
  return (
    <section id="formulario" className="grain section-y bg-ink text-paper" aria-labelledby="contato-titulo">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow className="text-smoke">Contato</Eyebrow>
          <h2 id="contato-titulo" className="t-h1 mt-6 max-w-[12ch]">{title}</h2>
          <p className="t-lead mt-8 max-w-md text-smoke">{text}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            {hasWhatsapp() && <Button href={waLink("Olá, Unaro! Vim pelo site e gostaria de conversar.")} variant="light" dataEvent="whatsapp_contato">Falar com a Unaro</Button>}
            <Button href={site.social.instagram} variant="outline-light">Instagram</Button>
          </div>
          <address className="mt-12 not-italic text-[0.95rem] leading-relaxed text-smoke">
            {site.address.street}<br />{site.address.district}, {site.address.city} · {site.address.region}
          </address>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm dark defaultService={defaultService} />
        </div>
      </div>
    </section>
  );
}

/* Faixa de CTA */
export function CtaBand({ title, text, button, href, event }: { title: string; text: string; button: string; href: string; event?: string }) {
  return (
    <section className="container-x section-y">
      <div className="grid gap-10 rounded-[2rem] bg-mist p-8 sm:p-12 lg:grid-cols-12 lg:items-end lg:p-16">
        <h2 className="t-h2 lg:col-span-7">{title}</h2>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="text-[1.05rem] leading-relaxed text-ash">{text}</p>
          <Button href={href} className="mt-7" dataEvent={event}>{button}</Button>
        </div>
      </div>
    </section>
  );
}

export function PageHead({ eyebrow, title, text, children }: { eyebrow: string; title: React.ReactNode; text?: string; children?: React.ReactNode }) {
  return (
    <section className="container-x pb-14 pt-36 sm:pt-44 lg:pb-20">
      {children}
      <Eyebrow className="mt-8 text-ash">{eyebrow}</Eyebrow>
      <h1 className="t-h1 mt-6 max-w-[16ch]">{title}</h1>
      {text && <p className="t-lead mt-8 max-w-2xl text-ash">{text}</p>}
    </section>
  );
}
