import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost" | "light" | "outline-light";
const styles: Record<Variant, string> = {
  solid: "bg-ink text-paper hover:bg-[#2b2b2b]",
  outline: "border border-ink text-ink hover:bg-ink hover:text-paper",
  ghost: "text-ink hover:bg-mist",
  light: "bg-paper text-ink hover:bg-mist",
  "outline-light": "border border-paper/40 text-paper hover:bg-paper hover:text-ink hover:border-paper",
};

export function Button({ href, children, variant = "solid", external, className = "", icon = true, dataEvent }:
  { href: string; children: ReactNode; variant?: Variant; external?: boolean; className?: string; icon?: boolean; dataEvent?: string }) {
  const isExternal = external ?? /^https?:/.test(href);
  const cls = `group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-[0.95rem] font-medium tracking-[-0.01em] transition-colors duration-300 ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {icon && <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.6} />}
    </>
  );
  if (isExternal) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} data-event={dataEvent}>{inner}</a>;
  return <Link href={href} className={cls} data-event={dataEvent}>{inner}</Link>;
}

export function Eyebrow({ children, className = "", n }: { children: ReactNode; className?: string; n?: string }) {
  return (
    <p className={`t-eyebrow flex items-center gap-3 ${className}`}>
      {n && <span className="tabular-nums opacity-60">{n}</span>}
      <span aria-hidden className="h-px w-8 bg-current opacity-40" />
      <span>{children}</span>
    </p>
  );
}
