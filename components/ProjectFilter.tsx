"use client";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";
import { portfolioFilters, filterGroupsOf } from "@/content/projects";
import { SiteCard, PhotoCard } from "./ProjectCard";

const isSite = (p: Project) => p.types.includes("websites") || p.types.includes("landing-pages");

/** Filtros do portfólio: só exibe categorias que têm projetos. */
export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [group, setGroup] = useState("todos");
  const available = portfolioFilters.filter((f) => projects.some((p) => filterGroupsOf(p.types).includes(f.slug)));
  const list = useMemo(() => (group === "todos" ? projects : projects.filter((p) => filterGroupsOf(p.types).includes(group))), [group, projects]);
  return (
    <>
      <div role="group" aria-label="Filtrar por tipo de serviço" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
        {[{ slug: "todos", title: "Todos" }, ...available].map((t) => (
          <button key={t.slug} data-filter={t.slug} type="button" aria-pressed={group === t.slug} onClick={() => setGroup(t.slug)}
            className={`min-h-11 shrink-0 rounded-full border px-5 text-[0.9rem] transition-colors ${group === t.slug ? "border-ink bg-ink text-paper" : "border-line text-ash hover:border-ink hover:text-ink"}`}>{t.title}</button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{list.length} projetos</p>
      <div data-filter-list className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
        {list.map((p) => (
          <div key={p.slug} data-types={filterGroupsOf(p.types).join(" ")}>
            {isSite(p) ? <SiteCard p={p} base="/sites" /> : <PhotoCard p={p} href={`/projetos/${p.slug}`} />}
          </div>
        ))}
      </div>
    </>
  );
}
