"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site, waLink } from "@/lib/site";
import { services } from "@/content/services";

/** Mensagem pré-preenchida conforme a página em que o visitante está. */
function messageFor(path: string) {
  const p = path.replace(/\/$/, "") || "/";
  const svc = services.find((s) => p === `/servicos/${s.slug}`);
  if (svc) return svc.cta.whatsappMessage;
  if (p.startsWith("/blog/")) return "Olá, Unaro! Estava lendo um artigo no blog e gostaria de conversar sobre o marketing da minha empresa.";
  if (p === "/sites" || p.startsWith("/sites/")) return "Olá, Unaro! Vi os sites no portfólio e gostaria de um orçamento para o site da minha empresa.";
  if (p.startsWith("/projetos")) return "Olá, Unaro! Vi os cases no site e gostaria de conversar sobre a minha empresa.";
  if (p.startsWith("/servicos")) return "Olá, Unaro! Vi os serviços no site e gostaria de saber qual faz mais sentido para a minha empresa.";
  return "Olá, Unaro! Vim pelo site e gostaria de conversar sobre a minha empresa.";
}

/** Botão flutuante de WhatsApp (verde), com mensagem conforme a página. */
export function WhatsAppFloat() {
  const path = usePathname() || "/";
  const external = Boolean(site.whatsapp);
  const [nearFooter, setNearFooter] = useState(false);
  // Some quando o rodapé (que já tem o link do WhatsApp) entra na tela.
  useEffect(() => {
    const f = document.querySelector("[data-site-footer]");
    if (!f || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setNearFooter(e.isIntersecting), { rootMargin: "0px 0px -60px 0px" });
    io.observe(f);
    return () => io.disconnect();
  }, [path]);
  return (
    <a href={waLink(messageFor(path))} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} data-event="whatsapp_float" aria-label="Conversar com a Unaro no WhatsApp"
      data-wa-float aria-hidden={nearFooter || undefined} tabIndex={nearFooter ? -1 : undefined}
      className={`fixed bottom-4 right-4 z-40 grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_-10px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-105 focus-visible:outline-offset-4 sm:bottom-6 sm:right-6 ${nearFooter ? "pointer-events-none translate-y-3 opacity-0" : "opacity-100"}`}>
      <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.24.68-1.42 1.3-1.95 1.35-.5.05-.97.23-3.27-.68-2.77-1.09-4.52-3.92-4.66-4.1-.13-.18-1.12-1.49-1.12-2.84s.71-2.01.96-2.29c.25-.27.55-.34.73-.34l.52.01c.17.01.39-.06.61.47.24.55.79 1.9.86 2.04.07.14.11.3.02.48-.09.18-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.56.16.27.71 1.17 1.52 1.89 1.05.93 1.93 1.22 2.2 1.36.27.14.43.11.59-.07.16-.18.68-.8.86-1.07.18-.27.36-.23.61-.14.25.09 1.59.75 1.86.89.27.14.45.2.52.32.07.11.07.66-.17 1.34Z"/></svg>
    </a>
  );
}
