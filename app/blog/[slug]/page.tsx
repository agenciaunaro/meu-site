import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts, getPostBySlug, getCategories } from "@/lib/cms";
import { readingTime } from "@/content/posts";
import { getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, site, waLink } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleBody } from "@/components/ArticleBody";
import { PostCard } from "@/components/PostCard";
import { Share } from "@/components/Share";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
import { plain } from "@/components/InlineText";

export const revalidate = 300;
export async function generateStaticParams() { return (await getPosts()).map((p) => ({ slug: p.slug })); }

const fmt = (d: string) => new Date(d + (d.length === 10 ? "T12:00:00" : "")).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await getPostBySlug((await params).slug);
  if (!p) return {};
  return buildMetadata({ title: p.seoTitle || p.title, description: p.seoDescription || p.excerpt, path: `/blog/${p.slug}`, image: p.cover.src, type: "article", publishedTime: p.publishedAt, modifiedTime: p.updatedAt || p.publishedAt });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, all, categories] = await Promise.all([getPostBySlug(slug), getPosts(), getCategories()]);
  if (!post) notFound();
  const cat = categories.find((c) => c.slug === post.category);
  const toc = [...post.body.filter((b): b is Extract<typeof b, { type: "h2" }> => b.type === "h2"), ...(post.faq?.length ? [{ type: "h2" as const, id: "perguntas-frequentes", text: "Perguntas frequentes" }] : [])];
  const related = [...(post.related || []).map((s) => all.find((p) => p.slug === s)).filter(Boolean), ...all.filter((p) => p.slug !== slug && p.category === post.category)]
    .filter((p, i, arr) => p && p.slug !== slug && arr.findIndex((x) => x?.slug === p.slug) === i).slice(0, 3) as typeof all;
  const fill = related.length < 3 ? all.filter((p) => p.slug !== slug && !related.includes(p)).slice(0, 3 - related.length) : [];
  const service = getService(post.serviceCta);
  const url = absoluteUrl(`/blog/${post.slug}`);

  const ServiceCta = service ? (
    <aside className="rounded-[1.5rem] bg-ink p-7 text-paper sm:p-9" aria-label="Serviço relacionado">
      <p className="t-eyebrow text-smoke">Serviço relacionado</p>
      <p className="mt-4 font-display text-[1.5rem] font-medium leading-tight tracking-[-0.03em]">{service.cta.title}</p>
      <p className="mt-3 text-[0.98rem] leading-relaxed text-smoke">{service.homeSummary}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={`/servicos/${service.slug}`} variant="light">Conhecer {service.title.toLowerCase()}</Button>
        <Button href={waLink(service.cta.whatsappMessage)} variant="outline-light" dataEvent={`whatsapp_blog_${post.slug}`}>Conversar</Button>
      </div>
    </aside>
  ) : null;

  return (
    <article>
      <header className="container-x pb-12 pt-36 sm:pt-44">
        <Breadcrumbs items={[{ href: "/blog", label: "Blog" }, ...(cat ? [{ href: `/blog/categoria/${cat.slug}`, label: cat.title }] : []), { href: `/blog/${post.slug}`, label: post.title }]} />
        <div className="mx-auto mt-14 max-w-4xl text-center">
          {cat && <Link href={`/blog/categoria/${cat.slug}`} className="t-eyebrow link-u text-ash">{cat.title}</Link>}
          <h1 className="mt-6 font-display text-[clamp(2.3rem,1.5rem+3.4vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.04em] text-balance">{post.title}</h1>
          <p className="t-lead mx-auto mt-7 max-w-2xl text-ash">{post.subtitle}</p>
          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.88rem] text-ash">
            {post.author && <span>{post.author}</span>}<span aria-hidden>·</span>
            <time dateTime={post.publishedAt}>{fmt(post.publishedAt)}</time><span aria-hidden>·</span>
            <span>{readingTime(post)} min de leitura</span>
            {post.updatedAt && post.updatedAt.slice(0, 10) !== post.publishedAt && <><span aria-hidden>·</span><span>Atualizado em <time dateTime={post.updatedAt}>{fmt(post.updatedAt.slice(0, 10))}</time></span></>}
          </p>
        </div>
      </header>

      <div className="container-x">
        <figure className="relative mx-auto aspect-[16/8] max-w-6xl overflow-hidden rounded-[1.75rem] bg-mist">
          <Image src={post.cover.src} alt={post.cover.alt} fill priority sizes="(min-width:1200px) 1150px, 100vw" className="object-cover" />
        </figure>
      </div>

      <div className="container-x mt-16 grid gap-12 pb-24 lg:mt-24 lg:grid-cols-12">
        {toc.length > 2 && (
          <aside className="lg:col-span-3">
            <details className="group rounded-2xl border border-line p-5 lg:sticky lg:top-28 lg:border-0 lg:p-0" open>
              <summary className="t-eyebrow flex cursor-pointer list-none items-center justify-between text-ash lg:pointer-events-none [&::-webkit-details-marker]:hidden">Neste artigo<span className="lg:hidden" aria-hidden>+</span></summary>
              <ol className="mt-5 space-y-3 border-l border-line text-[0.92rem]">
                {toc.map((h) => <li key={h.id}><a href={`#${h.id}`} className="-ml-px block border-l border-transparent pl-4 leading-snug text-ash transition-colors hover:border-ink hover:text-ink">{h.text}</a></li>)}
              </ol>
            </details>
          </aside>
        )}
        <div className={`${toc.length > 2 ? "lg:col-span-7 lg:col-start-5" : "mx-auto max-w-3xl lg:col-span-12"}`}>
          <ArticleBody blocks={post.body} midSlot={ServiceCta} />
          {post.faq && post.faq.length > 0 && (
            <section aria-labelledby="perguntas-frequentes" className="mt-20">
              <h2 id="perguntas-frequentes" className="scroll-mt-24 font-display text-[clamp(1.6rem,1.3rem+1.1vw,2.25rem)] font-medium leading-[1.12] tracking-[-0.03em]">Perguntas frequentes</h2>
              <div className="mt-8"><Faq items={post.faq} /></div>
            </section>
          )}
          {service && (
            <div className="mt-16 flex flex-col gap-5 rounded-[1.5rem] border border-line p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
              <p className="max-w-md font-display text-[1.35rem] font-medium leading-snug tracking-[-0.02em]">{service.cta.title}</p>
              <Button href={waLink(service.cta.whatsappMessage)} dataEvent={`whatsapp_blog_final_${post.slug}`}>Conversar com a Unaro</Button>
            </div>
          )}
          {post.sources && post.sources.length > 0 && (
            <aside aria-labelledby="referencias" className="mt-16 border-t border-line pt-8">
              <h2 id="referencias" className="t-eyebrow text-ash">Referências</h2>
              <ul className="mt-5 space-y-2.5 text-[0.95rem]">
                {post.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ash">{s.title}</a></li>)}
              </ul>
            </aside>
          )}
          <div className="mt-16 border-t border-line pt-8"><Share url={url} title={post.title} /></div>
        </div>
      </div>

      <section className="bg-mist section-y" aria-labelledby="relacionados">
        <div className="container-x">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 id="relacionados" className="t-h2">Continue <span className="serif-accent">lendo</span>.</h2>
            <Link href="/blog" className="link-u">Todos os artigos</Link>
          </div>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{[...related, ...fill].map((p) => <PostCard key={p.slug} post={p} categories={categories} />)}</div>
        </div>
      </section>

      <JsonLd data={{
        "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.seoDescription || post.excerpt,
        image: absoluteUrl(post.cover.src), datePublished: post.publishedAt, dateModified: post.updatedAt || post.publishedAt,
        author: { "@type": "Organization", name: post.author || site.name }, publisher: { "@id": absoluteUrl("/#organizacao"), name: site.name },
        mainEntityOfPage: url, articleSection: cat?.title, inLanguage: "pt-BR",
        ...(post.keyword ? { keywords: [post.keyword, ...(post.relatedTerms || [])].join(", ") } : {}),
      }} />
      {post.faq && post.faq.length > 0 && (
        <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: post.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plain(f.a) } })) }} />
      )}
    </article>
  );
}
