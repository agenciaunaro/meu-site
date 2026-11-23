import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { DevicePair } from "./Device";
import { DemoBadge } from "./DemoBadge";

export function SiteCard({ p, base = "/sites", priority = false }: { p: Project; base?: string; priority?: boolean }) {
  return (
    <article className="group">
      <Link href={`${base}/${p.slug}`} className="block">
        <div className="rounded-[1.5rem] bg-mist p-5 transition-colors duration-500 group-hover:bg-[#ecece9] sm:p-8">
          <div className="transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-1">
            <DevicePair desktop={p.desktop[0] || p.cover} mobile={p.mobile[0]} url={p.url} priority={priority} />
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-[1.4rem] font-medium tracking-[-0.03em]">{p.client}</h3>
              {p.demo && <DemoBadge className="text-stone" />}
            </div>
            <p className="mt-1 text-[0.92rem] text-ash">{p.segment} · {p.siteType}</p>
          </div>
          <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-line transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
            <ArrowUpRight className="size-4" strokeWidth={1.6} aria-hidden />
          </span>
        </div>
      </Link>
    </article>
  );
}

/** Card de projeto com fotografia (conteúdo, campanhas, branding). Sites usam SiteCard com mockups. */
export function PhotoCard({ p, href }: { p: Project; href: string }) {
  return (
    <article className="group">
      <Link href={href} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-mist">
          <Image src={p.cover.src} alt={p.cover.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-soft)] group-hover:scale-[1.035]" />
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2"><h3 className="font-display text-[1.4rem] font-medium tracking-[-0.03em]">{p.client}</h3>{p.demo && <DemoBadge className="text-stone" />}</div>
            <p className="mt-1 text-[0.92rem] text-ash">{[p.segment, p.location].filter(Boolean).join(" · ")}</p>
          </div>
          <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-line transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper"><ArrowUpRight className="size-4" strokeWidth={1.6} aria-hidden /></span>
        </div>
      </Link>
    </article>
  );
}
