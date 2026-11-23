import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Eyebrow, Button } from "@/components/Button";
import { ContactForm } from "@/components/ContactForm";
import { buildMetadata } from "@/lib/seo";
import { site, waLink, hasWhatsapp, socialLinks } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contato | Fale com a Unaro",
  description: "Conte sobre o seu negócio e o que você precisa. Atendimento da Unaro, agência de marketing personalizado no Centro de Curitiba.",
  path: "/contato",
});

export default function ContatoPage() {
  const a = site.address;
  const mapQ = encodeURIComponent(`${a.street}, ${a.district}, ${a.city} - ${a.region}`);
  return (
    <>
      <section className="container-x pb-24 pt-36 sm:pt-44">
        <Breadcrumbs items={[{ href: "/contato", label: "Contato" }]} />
        <div className="mt-10 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow className="text-ash">Contato</Eyebrow>
            <h1 className="t-h1 mt-6 max-w-[11ch]">Vamos conversar sobre sua <span className="serif-accent">empresa</span>?</h1>
            <p className="t-lead mt-8 max-w-md text-ash">Se você está procurando uma agência para desenvolver seu marketing, criar um site ou estruturar novas ações digitais, entre em contato com a Unaro.</p>

            <dl className="mt-12 space-y-8 border-t border-line pt-8">
              <div><dt className="t-eyebrow text-ash">Endereço</dt><dd className="mt-2 text-[1.05rem] leading-relaxed">{a.street}<br />{a.district}, {a.city} · {a.region}</dd>
                <a className="link-u mt-2 inline-block text-[0.92rem] text-ash" href={site.social.google || `https://www.google.com/maps/search/?api=1&query=${mapQ}`} target="_blank" rel="noopener noreferrer">Abrir no Google Maps</a></div>
              {hasWhatsapp() && <div><dt className="t-eyebrow text-ash">WhatsApp</dt><dd className="mt-3"><Button href={waLink("Olá, Unaro! Vim pela página de contato.")} dataEvent="whatsapp_contato_pagina">Falar com a Unaro</Button></dd></div>}
              {site.email && <div><dt className="t-eyebrow text-ash">E-mail</dt><dd className="mt-2"><a className="link-u" href={`mailto:${site.email}`}>{site.email}</a></dd></div>}
              <div><dt className="t-eyebrow text-ash">Redes</dt><dd className="mt-2 flex flex-wrap gap-x-5 gap-y-2">{socialLinks.map((s) => <a key={s.label} className="link-u" href={s.href} target="_blank" rel="noopener noreferrer">{s.label === "Google" ? "Perfil no Google" : s.label}</a>)}</dd></div>
            </dl>
          </div>
          <div id="formulario" className="scroll-mt-28 lg:col-span-6 lg:col-start-7">
            <div className="rounded-[1.75rem] border border-line p-7 sm:p-10">
              <h2 className="t-h3">Briefing inicial</h2>
              <p className="mt-3 text-ash">Poucos campos, só o necessário para começarmos a conversa.</p>
              <div className="mt-10"><ContactForm /></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
