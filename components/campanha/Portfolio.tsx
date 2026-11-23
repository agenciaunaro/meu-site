import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { projetos, type ProjetoCampanha } from "@/lib/campanha";
import { Browser, Phone, Pair } from "./Shots";

const total = String(projetos.length).padStart(2, "0");
const n = (p: ProjetoCampanha) => String(projetos.indexOf(p) + 1).padStart(2, "0");
const get = (id: string) => projetos.find((p) => p.id === id)!;

function Visualizar({ p, className = "" }: { p: ProjetoCampanha; className?: string }) {
  return (
    <a href={p.url} target="_blank" rel="noopener noreferrer" data-event="bf_portfolio_click" data-cta={p.id}
      aria-label={`Visualizar site ${p.nome} (abre em nova aba)`}
      className={`group inline-flex min-h-12 items-center gap-4 border-b border-current pb-1.5 text-[0.98rem] font-medium ${className}`}>
      Visualizar site
      <span className="grid size-9 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-rotate-45 group-hover:translate-x-1">
        <ArrowUpRight className="size-4" strokeWidth={1.6} />
      </span>
    </a>
  );
}

function Info({ p, big = false, children }: { p: ProjetoCampanha; big?: boolean; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <p className="t-eyebrow flex items-center gap-3 text-ash">
        <span className="tabular-nums">{n(p)} / {total}</span>
        <span aria-hidden className="h-px w-8 bg-current opacity-40" />
        <span>{p.segmento}</span>
      </p>
      <h3 className={`mt-5 font-display font-medium leading-[0.98] tracking-[-0.045em] ${big ? "text-[clamp(2.2rem,1.4rem+2.6vw,3.8rem)]" : "text-[clamp(1.9rem,1.4rem+1.6vw,2.8rem)]"}`}>{p.nome}</h3>
      {children}
      <p className="mt-5 max-w-lg text-[1rem] leading-relaxed text-[#2a2a2a]">{p.descricao}</p>
      <div className="mt-8"><Visualizar p={p} /></div>
    </div>
  );
}

export function Portfolio() {
  const piva = get("piva"), viva = get("viva4you"), natan = get("natan-lacerda"), stati = get("stati-uniti"), klein = get("klein");
  return (
    <div className="space-y-24 sm:space-y-32">
      {/* Bloco 1 | destaque em largura total */}
      <Reveal as="article" className="grid gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:items-end lg:gap-16 lg:pt-14">
        <div className="lg:col-span-8"><Pair desktop={piva.desktop} mobile={piva.mobile} url={piva.url} nome={piva.nome} /></div>
        <div className="lg:col-span-4 lg:pb-[8%]"><Info p={piva} big /></div>
      </Reveal>

      {/* Bloco 2 | dupla lado a lado */}
      <div className="grid gap-x-10 gap-y-24 md:grid-cols-2 lg:gap-x-16">
        {[viva, natan].map((p, i) => (
          <Reveal as="article" key={p.id} delay={i * 120} className="border-t border-line pt-10">
            <Pair desktop={p.desktop} mobile={p.mobile} url={p.url} nome={p.nome} phoneWidth="w-[26%]" />
            <div className="mt-10"><Info p={p} /></div>
          </Reveal>
        ))}
      </div>

      {/* Bloco 3 | Stati Uniti em painel editorial + Klein em coluna complementar */}
      <div className="grid gap-x-10 gap-y-24 lg:grid-cols-12 lg:gap-x-16">
        <Reveal as="article" className="lg:col-span-7">
          <div className="rounded-[1.75rem] bg-mist p-5 sm:p-10 lg:p-12">
            <p className="t-eyebrow text-ash">Direção editorial <span className="serif-accent normal-case tracking-normal text-[1.05rem] text-ink">· Coleção Bassa Marea</span></p>
            <div className="mt-8 grid grid-cols-[1fr_28%] items-end gap-4 sm:gap-6">
              <Browser src={stati.desktop} alt={`Site ${stati.nome}, versão desktop`} url={stati.url} />
              <Phone src={stati.mobile} alt={`Site ${stati.nome}, versão mobile`} className="-mb-2 sm:-mb-4" />
            </div>
          </div>
          <div className="mt-10">
            <Info p={stati} big>
              <p className="mt-4 font-serif text-[clamp(1.3rem,1.1rem+0.7vw,1.7rem)] italic leading-snug tracking-[-0.01em] text-ash">Uma coleção contada como editorial.</p>
            </Info>
          </div>
        </Reveal>

        <Reveal as="article" delay={120} className="border-t border-line pt-10 lg:col-span-5 lg:mt-24 lg:border-t-0 lg:pt-0">
          <div className="grid grid-cols-[38%_1fr] items-end gap-4 sm:gap-6">
            <Phone src={klein.mobile} alt={`Site ${klein.nome}, versão mobile`} />
            <Browser src={klein.desktop} alt={`Site ${klein.nome}, versão desktop`} url={klein.url} className="mb-[12%]" />
          </div>
          <div className="mt-10"><Info p={klein} /></div>
        </Reveal>
      </div>
    </div>
  );
}
