import type { Metadata } from "next";
import { PageHead, Founder, ContactSection } from "@/components/sections";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Eyebrow } from "@/components/Button";
import { Rod } from "@/components/Rod";
import { IllustrativePhoto } from "@/components/IllustrativePhoto";
import { Reveal } from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sobre a Unaro | Agência de marketing personalizado em Curitiba",
  description: "Conheça a Unaro, agência de marketing personalizado de Curitiba que trabalha com estratégia, conteúdo, mídia e tecnologia, acompanhando cada projeto de perto.",
  path: "/sobre",
});

const principles = [
  ["O negócio vem antes da ferramenta", "Não começamos pela pergunta \"qual rede social?\". Começamos por entender como a empresa vende, para quem e com que capacidade de atendimento."],
  ["Planejar e executar com a mesma equipe", "Quem desenha a estratégia acompanha a execução. Isso evita ruído entre o que foi combinado e o que vai ao ar."],
  ["Dados para decidir, não para enfeitar", "Medimos o que ajuda a tomar decisões. Relatório bom explica o que aconteceu e o que muda a partir dali."],
  ["Promessas que podemos cumprir", "Não garantimos posições no Google nem números antes do diagnóstico. Garantimos método, transparência e acompanhamento."],
];

export default function SobrePage() {
  return (
    <>
      <PageHead eyebrow="Sobre a Unaro" title={<>Uma agência <span className="serif-accent">próxima</span> do seu negócio.</>}
        text="A Unaro é uma agência de marketing personalizado que atua com estratégia, conteúdo, mídia paga, desenvolvimento de sites e soluções digitais. Nosso trabalho começa entendendo o que cada empresa precisa, quais oportunidades existem e como o marketing pode contribuir para seus objetivos.">
        <Breadcrumbs items={[{ href: "/sobre", label: "Sobre a Unaro" }]} />
      </PageHead>

      <section className="container-x pb-24">
        <Reveal>
          {/* Foto ilustrativa de banco de imagens: substituir por foto real da Unaro */}
          <IllustrativePhoto src="/images/institucional/estudio.webp" alt="Estúdio criativo contemporâneo com iluminação natural" className="aspect-[4/3] w-full sm:aspect-[21/9]" note="Estúdio ou espaço de trabalho contemporâneo" />
        </Reveal>
      </section>

      <section className="container-x pb-[clamp(5rem,3rem+8vw,10rem)]">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><Eyebrow n="01" className="text-ash">Filosofia</Eyebrow><h2 className="t-h2 mt-6">Marketing que faz sentido para o <span className="serif-accent">negócio</span>.</h2></div>
          <div className="space-y-6 text-[1.1rem] leading-relaxed text-[#2a2a2a] lg:col-span-7 lg:col-start-6">
            <p>Existe uma diferença grande entre fazer marketing e fazer o marketing certo para uma empresa. Seguir tendências, copiar o que o concorrente faz ou adotar a ferramenta do momento raramente resolve o problema de quem precisa vender mais, ser lembrado ou entrar em um novo mercado.</p>
            <p>Por isso, a Unaro trabalha de forma personalizada. Cada cliente recebe um planejamento construído a partir da sua realidade: o tamanho da equipe, a margem dos produtos, o tempo de decisão do cliente, a região atendida e o momento da marca.</p>
            <p>Acompanhamos as estratégias de perto, com reuniões periódicas, leitura de indicadores e ajustes sempre que os dados mostram um caminho melhor.</p>
          </div>
        </div>
        <ul className="mt-20 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line md:grid-cols-2">
          {principles.map(([t, d], i) => (
            <li key={t} className="bg-paper p-8 sm:p-10"><span className="t-eyebrow tabular-nums text-stone">{String(i + 1).padStart(2, "0")}</span><h3 className="t-h3 mt-8">{t}</h3><p className="mt-4 max-w-md leading-relaxed text-ash">{d}</p></li>
          ))}
        </ul>
      </section>

      <Founder />

      <section className="grain section-y bg-ink text-paper" aria-labelledby="rod-titulo">
        <div className="container-x"><Rod n="02" /></div>
      </section>

      <ContactSection />
    </>
  );
}
