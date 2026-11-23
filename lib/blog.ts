import type { Post } from "./types";
import { readingTime } from "@/content/posts";
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
/** Versão leve dos posts para o cliente: sem o corpo, com texto normalizado para busca. */
export function toSearchable(posts: Post[]) {
  return posts.map((p) => ({
    ...p,
    body: [],
    readingMinutes: readingTime(p),
    searchText: norm([p.title, p.subtitle, p.excerpt, ...(p.faq || []).map((f) => f.q), ...p.body.map((b) => ("text" in b ? b.text : "items" in b ? b.items.join(" ") : ""))].join(" ").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")),
    faq: undefined,
    sources: undefined,
  }));
}
