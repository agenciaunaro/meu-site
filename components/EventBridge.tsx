"use client";
import { useEffect } from "react";

declare global { interface Window { dataLayer?: Object[]; fbq?: (...a: unknown[]) => void } }

/** Envia cliques em elementos com data-event para o dataLayer (GTM) e, se houver, ao Pixel. */
export function EventBridge() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-event]");
      if (!el) return;
      const name = el.dataset.event!;
      const href = el.getAttribute("href") || "";
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: name, link_url: href, page_path: location.pathname });
      if (href.includes("wa.me")) window.fbq?.("track", "Contact");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
