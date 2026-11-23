import Image from "next/image";
import { BrowserFrame } from "@/components/Device";
import { temCaptura } from "@/lib/campanha";

/** Espaço reservado com o mesmo enquadramento do mockup. Some sozinho quando o arquivo é colocado em /public. */
function Pendente({ src, tipo, dark }: { src: string; tipo: "desktop" | "mobile"; dark?: boolean }) {
  return (
    <div className={`absolute inset-0 grid place-items-center p-4 text-center ${dark ? "bg-[#1a1a1a] text-smoke" : "bg-mist text-stone"}`}>
      <span className="text-[0.68rem] leading-snug tracking-[0.06em]">
        <span className="t-eyebrow block">Captura {tipo} pendente</span>
        <span className="mt-1.5 hidden break-all opacity-80 sm:block">{src}</span>
      </span>
    </div>
  );
}

export function Browser({ src, alt, url, priority, className = "" }: { src: string; alt: string; url: string; priority?: boolean; className?: string }) {
  if (temCaptura(src)) return <BrowserFrame src={src} alt={alt} url={url} priority={priority} className={className} />;
  return (
    <div data-captura-pendente={src} className={`overflow-hidden rounded-[0.9rem] border border-black/10 bg-paper shadow-[0_30px_70px_-30px_rgba(0,0,0,0.35)] ${className}`}>
      <div className="flex h-8 items-center gap-1.5 border-b border-black/5 bg-mist px-3.5">
        <span className="size-2 rounded-full bg-black/15" /><span className="size-2 rounded-full bg-black/15" /><span className="size-2 rounded-full bg-black/15" />
        <span className="ml-3 truncate rounded-full bg-paper px-3 py-0.5 text-[0.65rem] text-ash">{url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
      </div>
      <div className="relative aspect-[16/10]"><Pendente src={src} tipo="desktop" /></div>
    </div>
  );
}

export function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ok = temCaptura(src);
  /* Capturas mobile em 9:16 (720×1280), exibidas inteiras: sem corte lateral e sem notch sobre a interface. */
  return (
    <div {...(ok ? {} : { "data-captura-pendente": src })} className={`rounded-[clamp(0.85rem,2.6vw,2rem)] bg-ink p-[clamp(0.18rem,0.55vw,0.45rem)] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.5)] ${className}`}>
      <div className="relative aspect-[9/16] overflow-hidden rounded-[clamp(0.7rem,2.2vw,1.6rem)] bg-mist">
        {ok
          ? <Image src={src} alt={alt} fill sizes="(min-width:1024px) 18vw, 40vw" className="object-cover object-top" />
          : <Pendente src={src} tipo="mobile" dark />}
      </div>
    </div>
  );
}

/** Desktop com o celular sobreposto no canto, como no DevicePair do site institucional. */
export function Pair({ desktop, mobile, url, nome, nomeMobile, priority, phoneWidth = "w-[24%]" }:
  { desktop: string; mobile: string; url: string; nome: string; nomeMobile?: string; priority?: boolean; phoneWidth?: string }) {
  return (
    <div className="relative pb-[8%] pr-[10%]">
      <Browser src={desktop} alt={`Site ${nome}, versão desktop`} url={url} priority={priority} />
      <Phone src={mobile} alt={`Site ${nomeMobile || nome}, versão mobile`} className={`absolute bottom-0 right-0 ${phoneWidth}`} />
    </div>
  );
}
