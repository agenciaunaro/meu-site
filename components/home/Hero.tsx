"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";

/**
 * Hero: a palavra final do título muda para mostrar que o marketing parte de cada negócio.
 * A ficha ao lado acompanha a troca com um exemplo ilustrativo de planejamento (sem números ou resultados).
 */
const scenarios = [
  { word: "o seu negócio", seg: "Ponto de partida", r: "Entender o negócio, o mercado e a concorrência", o: "Definir prioridades e onde investir", d: "Construir uma marca lembrada pelo público certo" },
  { word: "a sua clínica", seg: "Clínica de saúde", r: "Como os pacientes pesquisam antes de agendar", o: "Priorizar os procedimentos com mais procura", d: "Comunicação que transmite confiança antes da consulta" },
  { word: "a sua loja", seg: "Varejo de moda", r: "Comportamento das clientes e da concorrência local", o: "Calendário de coleções e divisão da verba entre canais", d: "Conteúdo e identidade que tornam a marca desejada" },
  { word: "a sua indústria", seg: "Indústria B2B", r: "Compradores, ciclo de venda e concorrentes", o: "Site com catálogo, SEO e campanhas para cotação", d: "Ser reconhecida como referência técnica no segmento" },
  { word: "o seu escritório", seg: "Serviços profissionais", r: "Áreas de atuação com mais demanda na região", o: "Conteúdo e site organizados por área", d: "Autoridade construída com conteúdo útil e consistente" },
];

export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % scenarios.length), 3600);
    return () => clearInterval(t);
  }, [paused]);
  const s = scenarios[i];

  return (
    <section className="relative overflow-hidden pt-16">
      <script type="application/json" id="hero-data" dangerouslySetInnerHTML={{ __html: JSON.stringify(scenarios) }} />
      {/* grade de fundo discreta */}
      <div aria-hidden className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,var(--color-line)_1px,transparent_1px)] [background-size:calc(100%/6)_100%] opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="container-x relative pb-16 pt-14 sm:pt-20 lg:pb-24 lg:pt-24">
        <p className="t-eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-ash">
          <span>Agência de marketing personalizado</span>
          <span aria-hidden className="h-px w-8 bg-current opacity-40" />
          <span>Curitiba, PR</span>
        </p>

        <h1 className="t-display mt-8 max-w-[14ch] sm:mt-10">
          <span className="sr-only">Marketing pensado para o seu negócio.</span>
          <span aria-hidden>
            Marketing pensado para{" "}
            <span key={s.word} data-hero-word className="serif-accent word-in inline-block whitespace-nowrap sm:text-[1.06em] tracking-[-0.02em]">{s.word}</span>
            <span>.</span>
          </span>
        </h1>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6 xl:col-span-5">
            <p className="t-lead max-w-xl text-ash">
              Na Unaro, cada projeto começa com uma análise do negócio, do público e dos objetivos da empresa. A partir disso, desenvolvemos estratégias de marketing que fazem sentido para cada realidade.
            </p>
            <div className="mt-9 flex flex-col gap-3 xs:flex-row">
              <Button href="/servicos" variant="solid" dataEvent="cta_hero_servicos">Conhecer nossos serviços</Button>
              <Button href="/contato" variant="outline" dataEvent="cta_hero_contato">Conversar com a Unaro</Button>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <figure className="relative rounded-[1.75rem] bg-ink p-6 text-paper shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)] sm:p-8">
              <div className="flex items-center justify-between">
                <span className="t-eyebrow text-smoke">Ficha de planejamento</span>
                <span className="flex gap-1.5" aria-hidden>
                  {scenarios.map((_, k) => <span key={k} data-hero-dot className={`h-1 rounded-full transition-all duration-500 ${k === i ? "w-6 bg-paper" : "w-1.5 bg-paper/25"}`} />)}
                </span>
              </div>
              <div key={i} className="mt-8 space-y-5" aria-live="polite">
                <p data-hero-seg className="word-in font-display text-[1.6rem] font-medium leading-tight tracking-[-0.03em]">{s.seg}</p>
                <dl className="divide-y divide-line-dark border-y border-line-dark">
                  {[["R", "Reconhecimento", s.r], ["O", "Orientação", s.o], ["D", "Desejo", s.d]].map(([n, k, v], idx) => (
                    <div key={k} className="word-in grid grid-cols-[2rem_1fr] gap-3 py-3.5 text-[0.92rem]" style={{ animationDelay: `${80 * (idx + 1)}ms` }}>
                      <dt className="font-display text-[1.15rem] font-semibold leading-none text-paper">{n}<span className="sr-only"> {k}</span></dt>
                      <dd><span aria-hidden className="block text-[0.72rem] uppercase tracking-[0.12em] text-smoke">{k}</span><span data-hero-v className="mt-1 block text-paper/90">{v}</span></dd>
                    </div>
                  ))}
                </dl>
              </div>
              <figcaption className="mt-6 flex items-center justify-between gap-4 text-[0.78rem] text-smoke">
                <span>Exemplo ilustrativo do Método ROD</span>
                <span data-hero-count className="tabular-nums">{String(i + 1).padStart(2, "0")} / {String(scenarios.length).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      <div className="border-y border-line py-5" aria-hidden>
        <div className="flex overflow-hidden">
          <div className="marquee-track flex shrink-0 gap-10 whitespace-nowrap pr-10 font-display text-[clamp(1.4rem,1rem+1.5vw,2.25rem)] font-medium tracking-[-0.03em]">
            {[0, 1].map((r) => ["Estratégia", "Conteúdo", "Mídia", "Tecnologia", "Dados", "Sites", "CRM", "Audiovisual"].map((w) => (
              <span key={`${r}${w}`} className="flex items-center gap-10">{w}<span className="serif-accent text-stone">/</span></span>
            )))}
          </div>
        </div>
      </div>
    </section>
  );
}
