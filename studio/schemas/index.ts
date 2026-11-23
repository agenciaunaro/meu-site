import { defineField, defineType, defineArrayMember } from "sanity";

const seo = defineField({ name: "seo", title: "SEO", type: "object", options: { collapsible: true }, fields: [
  defineField({ name: "title", title: "Título SEO", type: "string", validation: (r) => r.max(65).warning("Ideal até 60 caracteres") }),
  defineField({ name: "description", title: "Descrição SEO", type: "text", rows: 3, validation: (r) => r.max(165).warning("Ideal até 155 caracteres") }),
] });

const imageWithAlt = (name: string, title: string, required = false) => defineField({
  name, title, type: "image", options: { hotspot: true },
  fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string", validation: (r) => r.required().error("Descreva a imagem para acessibilidade e SEO") })],
  validation: required ? (r) => r.required() : undefined,
});

const body = defineField({ name: "body", title: "Conteúdo", type: "array", of: [
  defineArrayMember({ type: "block", styles: [
    { title: "Parágrafo", value: "normal" }, { title: "Subtítulo (H2)", value: "h2" }, { title: "Subtítulo (H3)", value: "h3" }, { title: "Citação", value: "blockquote" },
  ], lists: [{ title: "Lista", value: "bullet" }],
    marks: { annotations: [{ name: "link", type: "object", title: "Link", fields: [defineField({ name: "href", type: "string", title: "URL (interna /blog/... ou externa https://)" })] }] } }),
  defineArrayMember({ name: "callout", title: "Destaque", type: "object", fields: [
    defineField({ name: "title", title: "Rótulo", type: "string" }), defineField({ name: "text", title: "Texto", type: "text", rows: 3 }),
  ] }),
  defineArrayMember({ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string" })] }),
] });

export const schemaTypes = [
  defineType({ name: "post", title: "Artigo", type: "document", fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "URL", type: "slug", options: { source: "title", maxLength: 80 }, validation: (r) => r.required() }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
    defineField({ name: "excerpt", title: "Resumo (cards e busca)", type: "text", rows: 3, validation: (r) => r.required().max(240) }),
    defineField({ name: "category", title: "Categoria", type: "reference", to: [{ type: "category" }], validation: (r) => r.required() }),
    defineField({ name: "author", title: "Autor", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "publishedAt", title: "Data de publicação", type: "date", validation: (r) => r.required() }),
    imageWithAlt("cover", "Imagem de capa", true),
    body,
    defineField({ name: "faq", title: "Perguntas frequentes", type: "array", of: [{ type: "object", fields: [
      defineField({ name: "q", title: "Pergunta", type: "string" }), defineField({ name: "a", title: "Resposta", type: "text", rows: 4 }),
    ] }] }),
    defineField({ name: "sources", title: "Referências", type: "array", of: [{ type: "object", fields: [
      defineField({ name: "title", title: "Título", type: "string" }), defineField({ name: "url", title: "URL", type: "url" }),
    ] }] }),
    defineField({ name: "keyword", title: "Palavra-chave principal", type: "string" }),
    defineField({ name: "relatedTerms", title: "Termos relacionados", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "related", title: "Artigos relacionados", type: "array", of: [{ type: "reference", to: [{ type: "post" }] }], validation: (r) => r.max(3) }),
    defineField({ name: "serviceCta", title: "Serviço do CTA contextual", type: "reference", to: [{ type: "service" }] }),
    seo,
  ], orderings: [{ title: "Mais recentes", name: "recent", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "cover" } } }),

  defineType({ name: "category", title: "Categoria", type: "document", fields: [
    defineField({ name: "title", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "URL", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "description", title: "Descrição", type: "text", rows: 2 }),
  ] }),

  defineType({ name: "author", title: "Autor", type: "document", fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Cargo", type: "string" }),
    imageWithAlt("photo", "Foto"),
    defineField({ name: "bio", title: "Bio curta", type: "text", rows: 3 }),
  ] }),

  defineType({ name: "project", title: "Projeto", type: "document", fields: [
    defineField({ name: "client", title: "Nome da empresa", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "URL", type: "slug", options: { source: "client" }, validation: (r) => r.required() }),
    defineField({ name: "segment", title: "Segmento", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Localização", type: "string", description: "Somente quando confirmada. Ex.: Curitiba, PR" }),
    defineField({ name: "headline", title: "Título do case", type: "string", description: "Frase que representa o projeto desenvolvido", validation: (r) => r.max(110) }),
    defineField({ name: "order", title: "Ordem de exibição", type: "number", description: "Menor número aparece primeiro" }),
    defineField({ name: "types", title: "Tipos de serviço (filtros)", type: "array", of: [{ type: "string" }], options: { list: [
      { title: "Websites", value: "websites" }, { title: "Landing pages", value: "landing-pages" }, { title: "Tráfego pago", value: "trafego-pago" },
      { title: "Conteúdo", value: "conteudo" }, { title: "Branding e comunicação", value: "branding" }, { title: "Estratégia digital", value: "estrategia" },
    ] }, validation: (r) => r.required().min(1) }),
    defineField({ name: "siteType", title: "Tipo de site/trabalho", type: "string", description: "Ex.: Site institucional, Landing page de campanha" }),
    defineField({ name: "services", title: "Serviços realizados", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "summary", title: "Descrição breve", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "challenge", title: "Desafio (resumo para a home)", type: "text", rows: 3, description: "Necessidade real apresentada pelo cliente" }),
    defineField({ name: "context", title: "Contexto do projeto", type: "text", rows: 4 }),
    defineField({ name: "objective", title: "Objetivo", type: "text", rows: 3 }),
    defineField({ name: "solution", title: "Solução e abordagem", type: "text", rows: 5 }),
    defineField({ name: "identity", title: "Identidade visual", type: "object", fields: [
      defineField({ name: "colors", title: "Cores (hex)", type: "array", of: [{ type: "string" }] }),
      defineField({ name: "typography", title: "Tipografia", type: "string" }),
      defineField({ name: "direction", title: "Direção de arte", type: "text", rows: 2 }),
    ] }),
    defineField({ name: "features", title: "Principais funcionalidades", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "results", title: "Resultados comprovados", type: "array", of: [{ type: "string" }], description: "Somente resultados com comprovação e autorização do cliente." }),
    defineField({ name: "url", title: "Link do site publicado", type: "url", description: "Somente quando autorizado pelo cliente." }),
    imageWithAlt("cover", "Imagem de capa", true),
    defineField({ name: "desktop", title: "Telas desktop (1440×900)", type: "array", of: [{ type: "image", fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string" })] }] }),
    defineField({ name: "mobile", title: "Telas mobile (390×844)", type: "array", of: [{ type: "image", fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string" })] }] }),
    defineField({ name: "gallery", title: "Galeria editorial (fotos reais)", type: "array", of: [{ type: "image", options: { hotspot: true }, fields: [
      defineField({ name: "alt", title: "Texto alternativo", type: "string" }), defineField({ name: "caption", title: "Legenda", type: "string" }),
    ] }] }),
    defineField({ name: "materials", title: "Materiais produzidos", type: "array", of: [{ type: "object", fields: [
      defineField({ name: "kind", title: "Tipo", type: "string", options: { list: [{ title: "Vídeo", value: "video" }, { title: "Peça / imagem", value: "image" }, { title: "Captura de site", value: "site" }] } }),
      defineField({ name: "image", title: "Imagem", type: "image" }),
      defineField({ name: "file", title: "Arquivo de vídeo (mp4)", type: "file", options: { accept: "video/mp4" } }),
      defineField({ name: "url", title: "Link (YouTube, Instagram ou site)", type: "url" }),
      defineField({ name: "alt", title: "Descrição", type: "string" }),
      defineField({ name: "caption", title: "Legenda", type: "string" }),
    ], preview: { select: { title: "alt", subtitle: "kind", media: "image" } } }] }),
    defineField({ name: "featured", title: "Destacar na home (até 3)", type: "boolean", initialValue: false }),
    defineField({ name: "publishedAt", title: "Data", type: "date", validation: (r) => r.required() }),
  ], preview: { select: { title: "client", subtitle: "segment", media: "cover" } } }),

  defineType({ name: "service", title: "Serviço", type: "document", fields: [
    defineField({ name: "title", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "URL", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "homeSummary", title: "Resumo na home", type: "text", rows: 3 }),
    defineField({ name: "intro", title: "Introdução", type: "array", of: [{ type: "text" }] }),
    defineField({ name: "faq", title: "Perguntas frequentes", type: "array", of: [{ type: "object", fields: [
      defineField({ name: "q", title: "Pergunta", type: "string" }), defineField({ name: "a", title: "Resposta", type: "text", rows: 4 }),
    ] }] }),
    defineField({ name: "whatsappMessage", title: "Mensagem do WhatsApp", type: "string" }),
    seo,
  ] }),

  defineType({ name: "testimonial", title: "Depoimento", type: "document", fields: [
    defineField({ name: "author", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "company", title: "Empresa e cargo", type: "string" }),
    defineField({ name: "quote", title: "Depoimento", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "authorized", title: "Autorizado pelo cliente", type: "boolean", validation: (r) => r.required().custom((v) => v === true || "Publique só depoimentos reais e autorizados") }),
    defineField({ name: "project", title: "Projeto relacionado", type: "reference", to: [{ type: "project" }] }),
  ] }),

  defineType({ name: "siteSettings", title: "Configurações do site", type: "document", fields: [
    defineField({ name: "whatsapp", title: "WhatsApp oficial (só dígitos, com 55 e DDD)", type: "string" }),
    defineField({ name: "email", title: "E-mail comercial", type: "string" }),
    defineField({ name: "phone", title: "Telefone", type: "string" }),
    defineField({ name: "address", title: "Endereço", type: "text", rows: 2 }),
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
    defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
    defineField({ name: "founderBio", title: "Texto do fundador", type: "array", of: [{ type: "text" }] }),
    imageWithAlt("founderPhoto", "Foto do fundador"),
  ] }),
];
