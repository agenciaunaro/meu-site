"use client";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/** Animação de entrada discreta. Respeita prefers-reduced-motion via CSS. */
export function Reveal({ children, as: Tag = "div", className = "", delay = 0 }: { children: ReactNode; as?: ElementType; className?: string; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { el.classList.add("is-in"); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { el.classList.add("is-in"); io.disconnect(); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>{children}</Tag>;
}
