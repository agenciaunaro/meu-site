import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { DemoBadge } from "./DemoBadge";

export const caseHref = (p: Project) => (p.types.includes("websites") || p.types.includes("landing-pages") ? `/sites/${p.slug}` : `/projetos/${p.slug}`);

/** Case editorial: imagem grande de um lado, conteúdo do outro. Alterna o lado quando `flip`. */
export function CaseFeature({ p, index, total, flip = false }: { p: Project; index: number; total: number; flip?: boolean }) {
  const href = caseHref(p);
  return (
    <article className="grid gap-10 border-t border-line pt-10 lg:grid-cols-2 lg:gap-16 lg:pt-14">
      <Link href={href} tabIndex={-1} aria-hidden className={`group/img relative block aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-mist sm:aspect-[5/4] lg:aspect-[4/5] ${flip ? "lg:order-2" : ""}`}>
        <Image src={p.cover.src} alt="" fill sizes="(min-width:1024px) 46vw, 100vw" className="object-cover object-top transition-transform duration-[1.4s] ease-[var(--ease-out-soft)] group-hover/img:scale-[1.035]" />
        <span className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover/img:bg-ink/[0.06]" />
        <span className="absolute bottom-5 right-5 grid size-12 translate-y-2 place-items-center rounded-full bg-paper text-ink opacity-0 transition-all duration-500 group-hover/img:translate-y-0 group-hover/img:opacity-100"><ArrowUpRight className="size-5" strokeWidth={1.6} /></span>
      </Link>

      <div className="flex flex-col lg:py-4">
        <div className="flex items-center justify-between gap-4 text-ash">
          <span className="t-eyebrow tabular-nums">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          {p.demo && <DemoBadge className="text-stone" />}
        </div>

        <h3 className="mt-8 font-display text-[clamp(2rem,1.4rem+2.2vw,3.4rem)] font-medium leading-[0.98] tracking-[-0.045em]">{p.client}</h3>
        <p className="mt-3 text-[0.95rem] text-ash">{[p.segment, p.location].filter(Boolean).join(" · ")}</p>

        {p.headline && <p className="mt-8 font-serif text-[clamp(1.4rem,1.15rem+0.9vw,1.9rem)] italic leading-snug tracking-[-0.01em]">{p.headline}</p>}
        <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-[#2a2a2a]">{p.summary}</p>

        {(p.challenge || p.solution) && (
          <dl className="mt-10 grid gap-px overflow-hidden border-y border-line sm:grid-cols-2">
            {p.challenge && <div className="py-6 sm:pr-6"><dt className="t-eyebrow text-ash">Desafio</dt><dd className="mt-3 text-[0.95rem] leading-relaxed">{p.challenge}</dd></div>}
            {p.solution && <div className="border-t border-line py-6 sm:border-l sm:border-t-0 sm:pl-6"><dt className="t-eyebrow text-ash">Solução</dt><dd className="mt-3 text-[0.95rem] leading-relaxed">{p.solution}</dd></div>}
          </dl>
        )}

        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Serviços realizados">
          {p.services.map((s) => <li key={s} className="rounded-full border border-line px-3.5 py-1.5 text-[0.82rem] text-ash">{s}</li>)}
        </ul>

        <div className="mt-10 lg:mt-auto lg:pt-10">
          <Link href={href} className="group inline-flex min-h-12 items-center gap-4 border-b border-ink pb-1.5 text-[1rem] font-medium" data-event="cta_explorar_projeto">
            Explorar projeto
            <span className="grid size-9 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-1 group-hover:-rotate-45"><ArrowUpRight className="size-4" strokeWidth={1.6} /></span>
          </Link>
        </div>
      </div>
    </article>
  );
}
