"use client";
import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Category, Post } from "@/lib/types";
import { PostCard } from "./PostCard";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Filtros por categoria e busca interna (no texto completo dos artigos). */
export function BlogExplorer({ posts, categories, initialCategory = "todos", featuredSlug }: { posts: (Post & { searchText: string; readingMinutes: number })[]; categories: Category[]; initialCategory?: string; featuredSlug?: string }) {
  const [cat, setCat] = useState(initialCategory);
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(9);
  useEffect(() => { const p = new URLSearchParams(location.search).get("q"); if (p) setQ(p); }, []);

  const used = categories.filter((c) => posts.some((p) => p.category === c.slug));
  const list = useMemo(() => {
    const nq = norm(q.trim());
    const idle = cat === initialCategory && !nq;
    return posts.filter((p) => (cat === "todos" || p.category === cat) && (!nq || p.searchText.includes(nq)) && !(idle && p.slug === featuredSlug));
  }, [cat, q, posts, featuredSlug, initialCategory]);

  return (
    <div>
      <div className="flex flex-col gap-6 border-y border-line py-6 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filtrar por categoria" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap">
          {[{ slug: "todos", title: "Todos" }, ...used].map((c) => (
            <button key={c.slug} data-filter={c.slug} type="button" aria-pressed={cat === c.slug} onClick={() => setCat(c.slug)}
              className={`min-h-10 shrink-0 rounded-full border px-4 text-[0.88rem] transition-colors ${cat === c.slug ? "border-ink bg-ink text-paper" : "border-line text-ash hover:border-ink hover:text-ink"}`}>{c.title}</button>
          ))}
        </div>
        <form role="search" onSubmit={(e) => e.preventDefault()} className="relative w-full lg:max-w-xs">
          <label htmlFor="busca" className="sr-only">Buscar artigos</label>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-stone" aria-hidden />
          <input id="busca" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar no blog"
            className="min-h-12 w-full rounded-full border border-line bg-paper pl-11 pr-10 text-[0.95rem] outline-none transition-colors focus:border-ink [&::-webkit-search-cancel-button]:hidden" />
          {q && <button type="button" onClick={() => setQ("")} aria-label="Limpar busca" className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full hover:bg-mist"><X className="size-4" aria-hidden /></button>}
        </form>
      </div>
      <p data-filter-count className="mt-6 text-[0.88rem] text-ash" aria-live="polite">{list.length} {list.length === 1 ? "artigo" : "artigos"}{q && ` para "${q}"`}</p>
      {list.length ? (
        <>
          <div data-filter-list data-limit="9" className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => <div key={p.slug} data-cat={p.category} data-search={p.searchText} className={i >= limit && cat === initialCategory && !q.trim() ? "hidden" : ""}><PostCard post={p} categories={categories} /></div>)}
          </div>
          {cat === initialCategory && !q.trim() && list.length > limit && (
            <div className="mt-14 flex justify-center">
              <button type="button" data-load-more onClick={() => setLimit(list.length)} className="min-h-12 rounded-full border border-ink px-7 text-[0.95rem] font-medium transition-colors hover:bg-ink hover:text-paper">Carregar mais artigos</button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-10 rounded-2xl bg-mist p-10"><p className="font-display text-[1.4rem] font-medium tracking-[-0.02em]">Nenhum artigo encontrado.</p><p className="mt-2 text-ash">Tente outro termo ou escolha uma categoria diferente.</p></div>
      )}
    </div>
  );
}
