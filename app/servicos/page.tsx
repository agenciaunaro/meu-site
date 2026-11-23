import type { Metadata } from "next";
import { ServicesIndex, ContactSection, PageHead } from "@/components/sections";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Rod } from "@/components/Rod";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Serviços de marketing | Tráfego pago, sites, conteúdo, SEO e CRM",
  description: "Conheça os serviços da Unaro: tráfego pago, criação de sites e landing pages, conteúdo e audiovisual, SEO, CRM e consultoria de marketing em Curitiba.",
  path: "/servicos",
});

export default function ServicosPage() {
  return (
    <>
      <PageHead eyebrow="Serviços" title={<>Como podemos ajudar <span className="serif-accent">sua empresa</span>.</>}
        text="Cada serviço pode ser contratado de forma isolada, mas eles funcionam melhor juntos. O ponto de partida é sempre o mesmo: entender o negócio antes de escolher as ferramentas.">
        <Breadcrumbs items={[{ href: "/servicos", label: "Serviços" }]} />
      </PageHead>
      <section className="container-x pb-24"><ServicesIndex /></section>
      <section className="grain section-y bg-ink text-paper" aria-labelledby="rod-titulo">
        <div className="container-x"><Rod /></div>
      </section>
      <ContactSection />
    </>
  );
}
