import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { absoluteUrl } from "@/lib/site";

export function Breadcrumbs({ items, dark = false }: { items: { href: string; label: string }[]; dark?: boolean }) {
  const all = [{ href: "/", label: "Início" }, ...items];
  return (
    <>
      <nav aria-label="Você está em" className={`text-[0.82rem] ${dark ? "text-smoke" : "text-ash"}`}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((it, i) => (
            <li key={it.href} className="flex items-center gap-2">
              {i < all.length - 1 ? <Link href={it.href} className="link-u hover:text-current">{it.label}</Link> : <span aria-current="page" className={dark ? "text-paper" : "text-ink"}>{it.label}</span>}
              {i < all.length - 1 && <span aria-hidden className="opacity-50">/</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: all.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.label, item: absoluteUrl(it.href) })) }} />
    </>
  );
}
