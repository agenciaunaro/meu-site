"use client";
import { useState } from "react";
import { Link2, Check } from "lucide-react";

export function Share({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const btn = "inline-flex min-h-10 items-center gap-2 rounded-full border border-line px-4 text-[0.85rem] transition-colors hover:border-ink";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="t-eyebrow mr-2 text-ash">Compartilhar</span>
      <a className={btn} href={`https://wa.me/?text=${enc(`${title} ${url}`)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <a className={btn} href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <button type="button" className={btn} onClick={async () => { try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {} }}>
        {copied ? <Check className="size-3.5" aria-hidden /> : <Link2 className="size-3.5" aria-hidden />}{copied ? "Link copiado" : "Copiar link"}
      </button>
    </div>
  );
}
