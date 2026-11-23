import type { Metadata } from "next";
import { getPosts, getCategories } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { toSearchable } from "@/lib/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Eyebrow } from "@/components/Button";
import { PostCard } from "@/components/PostCard";
import { BlogExplorer } from "@/components/BlogExplorer";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "Insights Unaro | Blog de marketing, tecnologia e negócios",
  description: "Conteúdos sobre marketing, comportamento de consumo, tecnologia e estratégias para empresas que querem entender melhor o ambiente digital.",
  path: "/blog",
});
export const revalidate = 300;

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);
  const [featured, ...rest] = posts;
  return (
    <>
      <section className="container-x pb-12 pt-36 sm:pt-44">
        <Breadcrumbs items={[{ href: "/blog", label: "Blog" }]} />
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8"><Eyebrow className="text-ash">Blog</Eyebrow><h1 className="t-display mt-6">Insights <span className="serif-accent">Unaro</span>.</h1></div>
          <p className="t-lead text-ash lg:col-span-4">Conteúdos sobre marketing, comportamento de consumo, tecnologia e estratégias para empresas que querem entender melhor o ambiente digital.</p>
        </div>
      </section>

      {featured && (
        <section className="container-x pb-20" aria-label="Artigo em destaque">
          <PostCard post={featured} categories={categories} large />
        </section>
      )}

      <section className="container-x pb-24" aria-labelledby="todos-artigos">
        <h2 id="todos-artigos" className="sr-only">Todos os artigos</h2>
        <BlogExplorer posts={toSearchable(posts)} categories={categories} featuredSlug={rest.length ? featured?.slug : undefined} />
      </section>

      <section className="container-x pb-24" aria-labelledby="categorias">
        <h2 id="categorias" className="t-eyebrow text-ash">Categorias</h2>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c.slug}><Link href={`/blog/categoria/${c.slug}`} className="block h-full bg-paper p-6 transition-colors hover:bg-mist"><span className="font-display text-[1.2rem] font-medium tracking-[-0.02em]">{c.title}</span><span className="mt-2 block text-[0.9rem] text-ash">{c.description}</span></Link></li>
          ))}
        </ul>
      </section>
    </>
  );
}
