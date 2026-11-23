"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Tracking } from "./Tracking";

type Consent = { analytics: boolean; marketing: boolean; ts: string };
const KEY = "unaro-consentimento";

function read(): Consent | null {
  try { const v = localStorage.getItem(KEY); return v ? JSON.parse(v) : null; } catch { return null; }
}

/** Banner de cookies (LGPD): necessários sempre ativos; análise e marketing só com consentimento. */
export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [a, setA] = useState(false);
  const [m, setM] = useState(false);

  useEffect(() => {
    const c = read();
    if (c) { setConsent(c); setA(c.analytics); setM(c.marketing); } else setOpen(true);
    const reopen = () => { setOpen(true); setCustom(true); };
    window.addEventListener("unaro:cookies", reopen);
    return () => window.removeEventListener("unaro:cookies", reopen);
  }, []);

  const save = (analytics: boolean, marketing: boolean) => {
    const c = { analytics, marketing, ts: new Date().toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch {}
    setConsent(c); setA(analytics); setM(marketing); setOpen(false); setCustom(false);
  };

  return (
    <>
      {consent && <Tracking analytics={consent.analytics} marketing={consent.marketing} />}
      <div data-cookie-banner hidden={!open} role="dialog" aria-modal="false" aria-labelledby="cookies-titulo"
        className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-[1.25rem] border border-line bg-paper p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] sm:inset-x-6 sm:bottom-6 sm:p-7">
        <p id="cookies-titulo" className="font-display text-[1.15rem] font-medium tracking-[-0.02em]">Sobre cookies</p>
        <p className="mt-2 text-[0.92rem] leading-relaxed text-ash">
          Usamos cookies necessários para o site funcionar e, com a sua permissão, cookies de análise e de marketing para entender a navegação e medir campanhas. Veja a <Link href="/politica-de-cookies" className="underline underline-offset-2">Política de Cookies</Link> e a <Link href="/politica-de-privacidade" className="underline underline-offset-2">Política de Privacidade</Link>.
        </p>
        <div data-cookie-custom hidden={!custom} className="mt-5 space-y-3 border-t border-line pt-5 text-[0.92rem]">
          <label className="flex items-start gap-3"><input type="checkbox" checked disabled className="mt-1 size-4 accent-[#101010]" /><span><strong className="font-medium">Necessários</strong><span className="block text-ash">Essenciais para o funcionamento do site. Sempre ativos.</span></span></label>
          <label className="flex items-start gap-3"><input data-cookie-a type="checkbox" checked={a} onChange={(e) => setA(e.target.checked)} className="mt-1 size-4 accent-[#101010]" /><span><strong className="font-medium">Análise</strong><span className="block text-ash">Ajudam a entender como o site é usado (Google Analytics).</span></span></label>
          <label className="flex items-start gap-3"><input data-cookie-m type="checkbox" checked={m} onChange={(e) => setM(e.target.checked)} className="mt-1 size-4 accent-[#101010]" /><span><strong className="font-medium">Marketing</strong><span className="block text-ash">Medem e personalizam anúncios (Google Ads e Meta).</span></span></label>
        </div>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <button type="button" data-cookie-accept onClick={() => save(true, true)} className="min-h-11 rounded-full bg-ink px-5 text-[0.9rem] font-medium text-paper hover:bg-[#2b2b2b]">Aceitar todos</button>
          <button type="button" data-cookie-reject onClick={() => save(false, false)} className="min-h-11 rounded-full border border-ink px-5 text-[0.9rem] font-medium hover:bg-mist">Recusar não essenciais</button>
          {custom
            ? <button type="button" data-cookie-save onClick={() => save(a, m)} className="min-h-11 rounded-full px-5 text-[0.9rem] font-medium underline underline-offset-4">Salvar preferências</button>
            : <button type="button" data-cookie-customize onClick={() => setCustom(true)} className="min-h-11 rounded-full px-5 text-[0.9rem] font-medium underline underline-offset-4">Personalizar</button>}
        </div>
      </div>
    </>
  );
}

/** Botão para reabrir as preferências (usado no rodapé). */
export function CookiePrefsButton({ className = "" }: { className?: string }) {
  return <button type="button" data-cookie-open onClick={() => window.dispatchEvent(new Event("unaro:cookies"))} className={className}>Preferências de cookies</button>;
}
