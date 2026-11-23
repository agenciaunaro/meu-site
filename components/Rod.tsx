"use client";
import { useEffect, useRef, useState } from "react";
import { rod } from "@/content/rod";
import { Eyebrow } from "./Button";

/**
 * Método ROD.
 * A palavra ROD. fica fixa à esquerda (desktop) e acende a letra da etapa em leitura,
 * seja pela rolagem ou ao passar o mouse sobre a etapa.
 */
export function Rod({ n, headingId = "rod-titulo" }: { n?: string; headingId?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.rodStep)); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    steps.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const lit = hover ?? active;

  return (
    <div data-rod>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <Eyebrow n={n} className="text-smoke">Método ROD</Eyebrow>
          <h2 id={headingId} className="t-h2 mt-6 max-w-[14ch]">ROD. A estrutura por trás do <span className="serif-accent">resultado</span>.</h2>
        </div>
        <div className="space-y-4 text-[1.05rem] leading-relaxed text-smoke lg:col-span-5 lg:col-start-8">
          <p>Antes de investir em campanhas, precisamos entender o negócio, definir uma direção e construir uma comunicação que faça sentido para quem realmente importa.</p>
          <p className="text-paper/85">O método ROD organiza essa forma de pensar e executar o marketing.</p>
        </div>
      </div>

      <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-12 lg:gap-10">
        {/* Palavra ROD. */}
        <div className="lg:col-span-6">
          <p aria-hidden className="flex select-none font-display font-semibold leading-[0.78] tracking-[-0.075em] text-[clamp(7.5rem,34vw,25rem)] lg:sticky lg:top-32 lg:text-[clamp(9rem,19vw,22rem)]">
            {rod.map((s, k) => (
              <span key={s.letter} data-rod-letter className={`transition-colors duration-700 ease-[var(--ease-out-soft)] ${lit === null || lit === k ? "text-paper" : "text-paper/[0.12]"}`}>{s.letter}</span>
            ))}
            <span className="text-paper">.</span>
          </p>
        </div>

        {/* Etapas */}
        <ol className="border-t border-line-dark lg:col-span-6">
          {rod.map((s, k) => {
            const on = lit === k;
            return (
              <li key={s.letter} ref={(el) => { steps.current[k] = el; }} data-rod-step={k}
                onMouseEnter={() => setHover(k)} onMouseLeave={() => setHover(null)}
                className="group grid grid-cols-[4.5rem_1fr] gap-x-5 border-b border-line-dark py-10 sm:grid-cols-[6.5rem_1fr] sm:py-14 lg:min-h-[19rem]">
                <span aria-hidden data-rod-mark className={`font-display text-[4.5rem] font-semibold leading-[0.8] tracking-[-0.06em] transition-colors duration-700 sm:text-[6rem] ${on ? "text-paper" : "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.45)]"}`}>{s.letter}</span>
                <div>
                  <p className="t-eyebrow text-smoke"><span className="tabular-nums">0{k + 1}</span><span className="mx-2 opacity-50">|</span>{s.letter}</p>
                  <h3 className="mt-3 font-display text-[clamp(1.8rem,1.4rem+1.4vw,2.6rem)] font-medium leading-none tracking-[-0.04em]">{s.title}</h3>
                  <div className="mt-6 max-w-md space-y-3 text-[1.02rem] leading-relaxed text-smoke">
                    {s.text.map((t, j) => <p key={j} className={j === 0 ? "text-paper/85" : ""}>{t}</p>)}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
