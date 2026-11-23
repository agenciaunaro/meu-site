import Image from "next/image";

/** Mockups em CSS: navegador desktop e smartphone. As imagens vêm do CMS. */
export function BrowserFrame({ src, alt, url = "", priority = false, className = "" }: { src: string; alt: string; url?: string; priority?: boolean; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[0.9rem] border border-black/10 bg-paper shadow-[0_30px_70px_-30px_rgba(0,0,0,0.35)] ${className}`}>
      <div className="flex h-8 items-center gap-1.5 border-b border-black/5 bg-mist px-3.5">
        <span className="size-2 rounded-full bg-black/15" /><span className="size-2 rounded-full bg-black/15" /><span className="size-2 rounded-full bg-black/15" />
        {url && <span className="ml-3 truncate rounded-full bg-paper px-3 py-0.5 text-[0.65rem] text-ash">{url.replace(/^https?:\/\//, "")}</span>}
      </div>
      <div className="relative aspect-[16/10] bg-mist">
        <Image src={src} alt={alt} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover object-top" priority={priority} />
      </div>
    </div>
  );
}

export function PhoneFrame({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`rounded-[clamp(0.85rem,2.6vw,2rem)] bg-ink p-[clamp(0.18rem,0.55vw,0.45rem)] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.5)] ${className}`}>
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[clamp(0.7rem,2.2vw,1.6rem)] bg-mist">
        <Image src={src} alt={alt} fill sizes="(min-width:1024px) 18vw, 40vw" className="object-cover object-top" />
        <span aria-hidden className="absolute left-1/2 top-[2.5%] h-[3.2%] w-[32%] -translate-x-1/2 rounded-full bg-ink" />
      </div>
    </div>
  );
}

export function DevicePair({ desktop, mobile, url, priority }: { desktop: { src: string; alt: string }; mobile?: { src: string; alt: string }; url?: string; priority?: boolean }) {
  return (
    <div className="relative pb-[8%] pr-[10%]">
      <BrowserFrame src={desktop.src} alt={desktop.alt} url={url} priority={priority} />
      {mobile && <PhoneFrame src={mobile.src} alt={mobile.alt} className="absolute bottom-0 right-0 w-[24%]" />}
    </div>
  );
}
