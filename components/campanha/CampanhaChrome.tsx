"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

/** Cabeçalho próprio da campanha: logo, identificação e um único CTA. */
export function CampanhaHeader({ wa }: { wa: string }) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color] duration-500 ${solid ? "border-b border-line-dark bg-ink/95 backdrop-blur" : "border-b border-transparent"}`}>
      <a href="#oferta" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-ink">Pular para o conteúdo</a>
      <div className="container-x flex h-16 items-center gap-4">
        <Link href="/" aria-label="Unaro, site institucional" className="inline-flex shrink-0 items-center">
          <Image src="/brand/logo-unaro-branco.png" alt="Unaro" width={344} height={123} priority className="h-7 w-auto sm:h-8" />
        </Link>
        <span aria-hidden className="hidden h-5 w-px bg-line-dark sm:block" />
        <span className="t-eyebrow hidden text-smoke sm:block">Black Unaro 2026</span>
        <Link href="/" data-event="bf_site_institucional" data-cta="header"
          className="link-u ml-auto hidden text-[0.88rem] text-smoke transition-colors hover:text-paper md:inline">
          Conhecer a Unaro
        </Link>
        <a href={wa} target="_blank" rel="noopener noreferrer" data-event="bf_cta_header" data-cta="header"
          className="group ml-auto md:ml-6 inline-flex min-h-10 items-center gap-2 rounded-full bg-paper px-4 text-[0.84rem] font-medium text-ink transition-colors hover:bg-mist sm:px-5 sm:text-[0.88rem]">
          Garantir minha condição
          <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.6} />
        </a>
      </div>
    </header>
  );
}

/** Barra fixa no celular: aparece depois da hero e some na oferta final e no rodapé. */
export function CtaMobile({ wa, label }: { wa: string; label: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.querySelector("[data-bf-hero]");
    const stops = document.querySelectorAll("[data-bf-stop]");
    if (!hero || !("IntersectionObserver" in window)) return;
    let heroIn = true; const stopIn = new Set<Element>();
    const update = () => setShow(!heroIn && stopIn.size === 0);
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.target === hero) heroIn = e.isIntersecting;
        else if (e.isIntersecting) stopIn.add(e.target); else stopIn.delete(e.target);
      });
      update();
    });
    io.observe(hero); stops.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return (
    <>
    {/* Botão flutuante de WhatsApp no canto inferior direito. No celular, sobe quando a barra fixa aparece. */}
    <a href={wa} target="_blank" rel="noopener noreferrer" data-event="bf_whatsapp_float" data-cta="whatsapp_flutuante" data-bf-float
      aria-label="Conversar com a Unaro no WhatsApp"
      className={`fixed right-4 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_-10px_rgba(0,0,0,0.45)] transition-[bottom,transform] duration-500 hover:scale-105 focus-visible:outline-offset-4 md:bottom-6 md:right-6 ${show ? "bottom-[5.75rem]" : "bottom-4"}`}>
      <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.24.68-1.42 1.3-1.95 1.35-.5.05-.97.23-3.27-.68-2.77-1.09-4.52-3.92-4.66-4.1-.13-.18-1.12-1.49-1.12-2.84s.71-2.01.96-2.29c.25-.27.55-.34.73-.34l.52.01c.17.01.39-.06.61.47.24.55.79 1.9.86 2.04.07.14.11.3.02.48-.09.18-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.56.16.27.71 1.17 1.52 1.89 1.05.93 1.93 1.22 2.2 1.36.27.14.43.11.59-.07.16-.18.68-.8.86-1.07.18-.27.36-.23.61-.14.25.09 1.59.75 1.86.89.27.14.45.2.52.32.07.11.07.66-.17 1.34Z"/></svg>
    </a>
    <div aria-hidden={!show || undefined} className={`fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-ink/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-500 md:hidden ${show ? "translate-y-0" : "pointer-events-none translate-y-full"}`}>
      <a href={wa} target="_blank" rel="noopener noreferrer" tabIndex={show ? undefined : -1} data-event="bf_cta_mobile_fixo" data-cta="barra_mobile"
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-paper text-[0.92rem] font-semibold tracking-[-0.01em] text-ink">
        {label}<ArrowUpRight aria-hidden className="size-4" strokeWidth={1.8} />
      </a>
    </div>
    </>
  );
}

declare global { interface Window { dataLayer?: object[] } }
const push = (o: object) => { window.dataLayer = window.dataLayer || []; window.dataLayer.push(o); };

/**
 * Eventos da campanha (dataLayer → GTM). Os cliques com data-event já são enviados pelo EventBridge do site.
 * Aqui entram só os eventos que ele não cobre: visualização da LP, clique no WhatsApp (conversão) e FAQ.
 */
export function CampanhaEventos() {
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];
    let utm: Record<string, string> = {};
    try { utm = JSON.parse(sessionStorage.getItem("bf_utm") || "{}"); } catch {}
    keys.forEach((k) => { const v = q.get(k); if (v) utm[k] = v; });
    try { sessionStorage.setItem("bf_utm", JSON.stringify(utm)); } catch {}
    push({ event: "bf_lp_view", campaign_name: "black_unaro_2026", page_path: location.pathname, ...utm });

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='wa.me']");
      if (a) push({ event: "bf_whatsapp_click", campaign_name: "black_unaro_2026", cta_location: a.dataset.cta || "", ...utm });
    };
    const onToggle = (e: Event) => {
      const d = e.target as HTMLDetailsElement;
      if (d.matches?.("[data-bf-faq]") && d.open) push({ event: "bf_faq_open", campaign_name: "black_unaro_2026", faq_question: d.dataset.q || "" });
    };
    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);
    return () => { document.removeEventListener("click", onClick); document.removeEventListener("toggle", onToggle, true); };
  }, []);
  return null;
}
