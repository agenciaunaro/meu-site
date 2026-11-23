import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPosts, getCategories } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { toSearchable } from "@/lib/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Eyebrow } from "@/components/Button";
import { BlogExplorer } from "@/components/BlogExplorer";

export const revalidate = 300;
export async function generateStaticParams() { return (await getCategories()).map((c) => ({ slug: c.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = (await getCategories()).find((x) => x.slug === slug);
  if (!c) return {};
  const count = (await getPosts()).filter((p) => p.category === slug).length;
  return buildMetadata({ title: `${c.title} | Insights Unaro`, description: c.description, path: `/blog/categoria/${slug}`, noindex: count === 0 });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);
  const c = categories.find((x) => x.slug === slug);
  if (!c) notFound();
  const count = posts.filter((p) => p.category === slug).length;
  return (
    <>
      <section className="container-x pb-12 pt-36 sm:pt-44">
        <Breadcrumbs items={[{ href: "/blog", label: "Blog" }, { href: `/blog/categoria/${slug}`, label: c.title }]} />
        <Eyebrow className="mt-10 text-ash">Categoria</Eyebrow>
        <h1 className="t-h1 mt-6">{c.title}</h1>
        <p className="t-lead mt-6 max-w-2xl text-ash">{c.description}</p>
        {count === 0 && <p className="mt-8 rounded-2xl bg-mist p-6 text-ash">Ainda não há artigos publicados nesta categoria. Novos conteúdos estão em produção.</p>}
      </section>
      <section className="container-x pb-24"><BlogExplorer posts={toSearchable(posts)} categories={categories} initialCategory={count ? slug : "todos"} /></section>
    </>
  );
}
