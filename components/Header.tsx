"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { Logo } from "./Logo";
import { services } from "@/content/services";

type NavItem = { href: string; label: string; children?: { href: string; label: string; note?: string }[] };

const nav: NavItem[] = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre a Unaro" },
  { href: "/servicos", label: "Serviços", children: [...services.map((s) => ({ href: `/servicos/${s.slug}`, label: s.title, note: s.short })), { href: "/servicos", label: "Todos os serviços" }] },
  { href: "/projetos", label: "Projetos", children: [
    { href: "/sites", label: "Sites desenvolvidos", note: "Portfólio de sites e landing pages" },
    { href: "/projetos", label: "Todos os projetos", note: "Marketing, conteúdo, campanhas e sites" },
  ] },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

/** No desktop, só o essencial. Sobre e Contato ficam no menu mobile, no rodapé e nos CTAs. */
const desktopNav = nav.filter((n) => ["/servicos", "/projetos", "/blog"].includes(n.href));

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);
  const [acc, setAcc] = useState<string | null>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => { setOpen(false); setDrop(null); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setDrop(null); menuBtn.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-500 ${scrolled || open ? "border-b border-line bg-paper" : "border-b border-transparent"}`}>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">Pular para o conteúdo</a>
      <div className="container-x flex h-16 items-center gap-6">
        <Logo />

        <nav aria-label="Principal" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-2">
            {desktopNav.map((item) => (
              <li key={item.href} className="relative" data-drop={item.children ? "" : undefined} onMouseEnter={() => item.children && setDrop(item.label)} onMouseLeave={() => setDrop(null)}>
                {item.children ? (
                  <>
                    <div className="flex items-center">
                      <Link href={item.href} className={`rounded-full py-2 pl-3.5 pr-1 text-[0.9rem] transition-colors ${isActive(item.href) ? "text-ink" : "text-ash hover:text-ink"}`}>{item.label}</Link>
                      <button type="button" aria-expanded={drop === item.label} aria-label={`Abrir submenu ${item.label}`} onClick={() => setDrop(drop === item.label ? null : item.label)} className="rounded-full p-1.5 pr-3 text-ash hover:text-ink">
                        <ChevronDown className={`size-3.5 transition-transform duration-300 ${drop === item.label ? "rotate-180" : ""}`} strokeWidth={1.8} />
                      </button>
                    </div>
                    <div data-drop-panel className={`absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-3 transition-all duration-300 ${drop === item.label ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}>
                      <ul className="rounded-2xl border border-line bg-paper p-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]">
                        {item.children.map((c) => (
                          <li key={c.href + c.label}>
                            <Link href={c.href} className="block rounded-xl px-4 py-3 transition-colors hover:bg-mist focus-visible:bg-mist">
                              <span className="block text-[0.95rem] font-medium tracking-[-0.01em]">{c.label}</span>
                              {c.note && <span className="mt-0.5 block text-[0.82rem] text-ash">{c.note}</span>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={`block rounded-full px-3.5 py-2 text-[0.9rem] transition-colors ${isActive(item.href) ? "text-ink" : "text-ash hover:text-ink"}`}>{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
                    <Link href="/contato" data-event="cta_header" className="hidden min-h-10 items-center rounded-full bg-ink px-5 text-[0.88rem] font-medium text-paper transition-colors hover:bg-[#2b2b2b] sm:inline-flex">Vamos conversar</Link>
          <button ref={menuBtn} data-menu-btn type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="menu-mobile" className="relative grid size-10 place-items-center rounded-full border border-line lg:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"}>
            <span className={`absolute h-px w-4 bg-ink transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
            <span className={`absolute h-px w-4 bg-ink transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div id="menu-mobile" hidden={!open} className="h-[calc(100dvh-4rem)] overflow-y-auto bg-paper lg:hidden">
        <nav aria-label="Menu mobile" className="container-x flex min-h-full flex-col pb-8 pt-4">
          <ul className="divide-y divide-line border-y border-line">
            {nav.map((item, i) => (
              <li key={item.href}>
                {item.children ? (
                  <>
                    <button type="button" data-acc onClick={() => setAcc(acc === item.label ? null : item.label)} aria-expanded={acc === item.label} className="flex w-full items-center justify-between py-4 text-left">
                      <span className="flex items-baseline gap-4"><span className="t-eyebrow w-6 text-stone">{String(i + 1).padStart(2, "0")}</span><span className="font-display text-[1.9rem] font-medium tracking-[-0.04em]">{item.label}</span></span>
                      <Plus className={`size-5 transition-transform duration-300 ${acc === item.label ? "rotate-45" : ""}`} strokeWidth={1.5} />
                    </button>
                    {(
                      <ul hidden={acc !== item.label} className="pb-4 pl-10">
                        {item.children.map((c) => (
                          <li key={c.href + c.label}><Link href={c.href} className="block py-2.5 text-[1.05rem] text-ash active:text-ink">{c.label}</Link></li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href={item.href} className="flex items-baseline gap-4 py-4">
                    <span className="t-eyebrow w-6 text-stone">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-[1.9rem] font-medium tracking-[-0.04em]">{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
                        <Link href="/contato" className="flex min-h-14 w-full items-center justify-center rounded-full bg-ink text-[1rem] font-medium text-paper">Vamos conversar</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
