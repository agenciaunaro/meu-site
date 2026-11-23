import Image from "next/image";
import Link from "next/link";
import type { Category, Post } from "@/lib/types";
import { readingTime } from "@/content/posts";

export function PostCard({ post, categories, large = false, dark = false }: { post: Post & { readingMinutes?: number }; categories: Category[]; large?: boolean; dark?: boolean }) {
  const cat = categories.find((c) => c.slug === post.category);
  return (
    <article className="group" data-cat={post.category} data-search={`${post.title} ${post.excerpt}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}>
      <Link href={`/blog/${post.slug}`} className="block">
        <div className={`relative overflow-hidden rounded-[1.25rem] ${dark ? "bg-line-dark" : "bg-mist"} aspect-[16/10]`}>
          <Image src={post.cover.src} alt={post.cover.alt} fill sizes={large ? "(min-width:1024px) 55vw, 100vw" : "(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw"} className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.03]" />
        </div>
        <div className={`mt-5 flex items-center gap-3 text-[0.8rem] ${dark ? "text-smoke" : "text-ash"}`}>
          <span className="t-eyebrow">{cat?.title}</span>
          <span aria-hidden className="h-px w-4 bg-current opacity-40" />
          <span>{post.readingMinutes ?? readingTime(post)} min de leitura</span>
        </div>
        <h3 className={`mt-3 font-display font-medium tracking-[-0.03em] ${large ? "text-[clamp(1.7rem,1.2rem+1.6vw,2.6rem)] leading-[1.05]" : "text-[1.35rem] leading-[1.15]"}`}>
          <span className="link-u">{post.title}</span>
        </h3>
        {large && <p className={`mt-4 max-w-xl text-[1.02rem] leading-relaxed ${dark ? "text-smoke" : "text-ash"}`}>{post.excerpt}</p>}
      </Link>
    </article>
  );
}
