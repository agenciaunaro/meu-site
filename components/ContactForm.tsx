"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/content/services";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "whatsapp" | "error" | "unconfigured";

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
};

/**
 * Formulário de contato.
 * 1) Envia para /api/contato (que repassa ao webhook CONTACT_WEBHOOK_URL, se configurado).
 * 2) Se o WhatsApp oficial estiver configurado, abre a conversa com a mensagem montada.
 * Sem nenhum dos dois configurados, informa claramente que o envio não está ativo.
 */
export function ContactForm({ dark = false, defaultService = "" }: { dark?: boolean; defaultService?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [phone, setPhone] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data.website) return; // honeypot
    setStatus("sending");

    let apiOk = false;
    try {
      const res = await fetch("/api/contato", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, page: location.pathname }) });
      apiOk = res.ok;
    } catch { apiOk = false; }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "form_submit", form_name: "contato", service: data.servico });

    if (site.whatsapp) {
      const msg = [
        "Olá, Unaro! Vim pelo site.",
        `Nome: ${data.nome}`,
        data.empresa && `Empresa: ${data.empresa}`,
        `WhatsApp: ${data.whatsapp}`,
        data.servico && `Serviço de interesse: ${data.servico}`,
        data.mensagem && `Mensagem: ${data.mensagem}`,
      ].filter(Boolean).join("\n");
      window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
      setStatus("whatsapp");
      form.reset(); setPhone("");
      return;
    }
    if (apiOk) { setStatus("sent"); form.reset(); setPhone(""); return; }
    setStatus("unconfigured");
  }

  const field = `w-full border-0 border-b bg-transparent px-0 py-3.5 text-[1.05rem] outline-none transition-colors placeholder:opacity-60 focus:ring-0 ${dark ? "border-line-dark placeholder:text-smoke focus:border-paper" : "border-line placeholder:text-ash focus:border-ink"}`;
  const label = `t-eyebrow block ${dark ? "text-smoke" : "text-ash"}`;

  if (status === "sent" || status === "whatsapp") {
    return (
      <div className={`rounded-[1.5rem] p-8 ${dark ? "bg-line-dark/60" : "bg-mist"}`} role="status">
        <span className={`grid size-11 place-items-center rounded-full ${dark ? "bg-paper text-ink" : "bg-ink text-paper"}`}><Check className="size-5" aria-hidden /></span>
        <p className="mt-6 font-display text-[1.6rem] font-medium tracking-[-0.03em]">{status === "whatsapp" ? "Abrimos o WhatsApp com a sua mensagem." : "Recebemos sua mensagem."}</p>
        <p className={`mt-3 ${dark ? "text-smoke" : "text-ash"}`}>{status === "whatsapp" ? "É só enviar por lá. Se a janela não abriu, verifique se o navegador bloqueou pop-ups." : "Vamos responder pelo WhatsApp informado em breve."}</p>
        <button type="button" onClick={() => setStatus("idle")} className="link-u mt-6 text-[0.95rem]">Enviar outra mensagem</button>
      </div>
    );
  }

  return (
    <form data-contact onSubmit={onSubmit} className="grid gap-7" noValidate={false}>
      <div className="grid gap-7 sm:grid-cols-2">
        <div><label htmlFor="f-nome" className={label}>Nome</label><input id="f-nome" name="nome" required autoComplete="name" className={field} placeholder="Como podemos te chamar?" /></div>
        <div><label htmlFor="f-empresa" className={label}>Empresa</label><input id="f-empresa" name="empresa" autoComplete="organization" className={field} placeholder="Nome da empresa" /></div>
        <div><label htmlFor="f-whats" className={label}>WhatsApp</label><input id="f-whats" name="whatsapp" required type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(maskPhone(e.target.value))} pattern="\(\d{2}\) \d{4,5}-\d{4}" title="Informe DDD e número" className={field} placeholder="(41) 00000-0000" /></div>
        <div>
          <label htmlFor="f-servico" className={label}>Serviço de interesse</label>
          <select id="f-servico" name="servico" defaultValue={defaultService} className={`${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23888%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[right_0.2rem_center] bg-no-repeat pr-8`}>
            <option value="">Selecione</option>
            {services.map((s) => <option key={s.slug} value={s.title} className="text-ink">{s.title}</option>)}
            <option value="Ainda não sei" className="text-ink">Ainda não sei</option>
          </select>
        </div>
      </div>
      <div><label htmlFor="f-msg" className={label}>Mensagem</label><textarea id="f-msg" name="mensagem" rows={3} className={`${field} resize-none`} placeholder="Conte um pouco sobre o seu negócio e o que você precisa" /></div>

      {/* honeypot anti-spam */}
      <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden"><label>Site<input name="website" tabIndex={-1} autoComplete="off" /></label></div>

      <label className={`flex items-start gap-3 text-[0.85rem] leading-relaxed ${dark ? "text-smoke" : "text-ash"}`}>
        <input type="checkbox" name="consentimento" required className="mt-1 size-4 shrink-0 accent-current" />
        <span>Concordo com o uso destes dados para que a Unaro entre em contato, conforme a <Link href="/politica-de-privacidade" className="underline underline-offset-2">Política de Privacidade</Link>.</span>
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "sending"} className={`group inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-8 text-[1rem] font-medium transition-colors disabled:opacity-60 ${dark ? "bg-paper text-ink hover:bg-mist" : "bg-ink text-paper hover:bg-[#2b2b2b]"}`}>
          {status === "sending" ? "Enviando..." : "Falar com a Unaro"}
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden strokeWidth={1.6} />
        </button>
        <p data-form-msg hidden={status !== "unconfigured"} role="alert" className="text-[0.88rem] text-[#c0392b]">O envio do formulário ainda não está conectado. Configure o WhatsApp oficial ou o webhook de recebimento (ver README).</p>
      </div>
    </form>
  );
}
