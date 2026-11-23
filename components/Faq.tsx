import type { FAQ } from "@/lib/types";

/** FAQ com <details>: acessível, funciona sem JavaScript. */
export function Faq({ items }: { items: FAQ[] }) {
  return (
    <div className="border-t border-line">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-display text-[1.2rem] font-medium leading-snug tracking-[-0.02em] sm:text-[1.35rem]">{f.q}</span>
            <span aria-hidden className="relative mt-2 size-4 shrink-0"><span className="absolute top-1/2 h-px w-4 bg-ink" /><span className="absolute top-1/2 h-px w-4 rotate-90 bg-ink transition-transform duration-300 group-open:rotate-0" /></span>
          </summary>
          <p className="max-w-2xl pb-7 leading-relaxed text-ash">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
