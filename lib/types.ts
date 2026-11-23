export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "callout"; title: string; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

export type Category = { slug: string; title: string; description: string };

export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string; // slug
  publishedAt: string; // ISO
  updatedAt?: string;
  author?: string;
  cover: { src: string; alt: string };
  seoTitle?: string;
  seoDescription?: string;
  related?: string[]; // slugs
  serviceCta: string; // slug de serviço
  keyword?: string; // palavra-chave principal (hipótese editorial)
  relatedTerms?: string[];
  faq?: FAQ[];
  sources?: { title: string; url: string }[];
  body: Block[];
};

export type FAQ = { q: string; a: string };

export type Service = {
  slug: string;
  title: string;
  short: string;
  homeSummary: string;
  intro: string[];
  problems: { title: string; text: string }[];
  included: { title: string; text: string }[];
  process: { title: string; text: string }[];
  differentials: string[];
  faq: FAQ[];
  relatedPosts: string[];
  cta: { title: string; text: string; whatsappMessage: string };
  seoTitle: string;
  seoDescription: string;
  portfolioType?: string;
};

export type ProjectType = "websites" | "landing-pages" | "trafego-pago" | "conteudo" | "branding" | "estrategia";

export type Project = {
  slug: string;
  client: string;
  segment: string;
  types: ProjectType[];
  siteType?: string; // "Site institucional", "Landing page"...
  services: string[];
  location?: string; // somente quando confirmada
  headline?: string; // título que representa o projeto
  summary: string;
  challenge?: string; // desafio (real)
  context?: string;
  objective?: string;
  solution?: string;
  identity?: { colors: string[]; typography: string; direction: string };
  features?: string[];
  results?: string[]; // apenas comprovados
  url?: string;
  gallery?: { src: string; alt: string; caption?: string }[];
  materials?: { kind: "video" | "image" | "site"; src?: string; url?: string; alt: string; caption?: string }[];
  cover: { src: string; alt: string };
  desktop: { src: string; alt: string }[];
  mobile: { src: string; alt: string }[];
  demo?: boolean;
  featured?: boolean;
  publishedAt: string;
};
