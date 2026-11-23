import type { Project, ProjectType } from "@/lib/types";

export const projectTypes: { slug: ProjectType; title: string }[] = [
  { slug: "websites", title: "Websites" },
  { slug: "landing-pages", title: "Landing pages" },
  { slug: "trafego-pago", title: "Tráfego pago" },
  { slug: "conteudo", title: "Conteúdo" },
  { slug: "branding", title: "Branding e comunicação" },
  { slug: "estrategia", title: "Estratégia digital" },
];

/** Filtros do portfólio. Só aparecem os grupos que têm projetos cadastrados. */
export const portfolioFilters: { slug: string; title: string; match: ProjectType[] }[] = [
  { slug: "estrategia", title: "Marketing e estratégia", match: ["estrategia"] },
  { slug: "trafego", title: "Tráfego pago", match: ["trafego-pago"] },
  { slug: "conteudo", title: "Conteúdo e audiovisual", match: ["conteudo"] },
  { slug: "sites", title: "Sites e landing pages", match: ["websites", "landing-pages"] },
  { slug: "branding", title: "Branding", match: ["branding"] },
];

export const filterGroupsOf = (types: ProjectType[]) => portfolioFilters.filter((f) => f.match.some((m) => types.includes(m))).map((f) => f.slug);

/**
 * Cases reais da Unaro (base local; no CMS eles são cadastrados em "Projetos e sites").
 * Sem números de resultado: só entram quando houver comprovação.
 * PENDENTE: nome real das marcas (por enquanto, a descrição usada no site anterior).
 */
export const projects: Project[] = [
  {
    slug: "imoveis-alto-padrao-zona-sul-sp",
    client: "Imóveis residenciais de alto padrão",
    segment: "Setor imobiliário",
    location: "Zona Sul de São Paulo",
    types: ["trafego-pago", "conteudo", "branding"],
    services: ["Meta Ads", "Google Ads", "Gestão de tráfego", "Gestão de redes sociais", "Branding"],
    headline: "Presença digital para imóveis residenciais em regiões nobres de São Paulo",
    summary: "Estratégia de tráfego pago, gestão de redes sociais e branding digital para posicionar a empresa no mercado imobiliário de alto padrão da Zona Sul de São Paulo.",
    challenge: "Construir uma presença consistente em um mercado premium e competitivo, em que a marca precisa transmitir confiança antes do primeiro contato.",
    solution: "Campanhas no Meta Ads e no Google Ads trabalhando junto com a gestão das redes sociais e o branding digital, para que anúncio, perfil e marca contem a mesma história.",
    cover: { src: "/images/cases/imobiliario-alto-padrao-sp.webp", alt: "Área externa de residência de alto padrão com piscina e jardim" },
    desktop: [],
    mobile: [],
    featured: true,
    publishedAt: "2026-11-03",
  },
  {
    slug: "marca-de-moda-feminina",
    client: "Marca de moda feminina",
    segment: "Moda feminina",
    location: "Brasil",
    types: ["conteudo", "trafego-pago"],
    services: ["Gestão de conteúdo", "Meta Ads", "Google Ads", "TikTok Ads"],
    headline: "Conteúdo e campanhas pagas trabalhando juntos, do alcance à venda",
    summary: "Gestão estratégica de conteúdo e campanhas pagas para ampliar a visibilidade da marca, o engajamento nas redes e as vendas diretas.",
    challenge: "Fazer a marca ser vista por mais pessoas com o estilo certo e transformar o interesse gerado nas redes em vendas.",
    solution: "Planejamento de conteúdo integrado às campanhas no Meta Ads, Google Ads e TikTok Ads, com cada canal atuando em uma etapa da jornada de compra.",
    cover: { src: "/images/cases/moda-feminina.webp", alt: "Modelo com vestido longo de renda clara diante de parede de concreto" },
    desktop: [],
    mobile: [],
    featured: true,
    publishedAt: "2026-10-20",
  },
  {
    slug: "revenda-de-automoveis",
    client: "Lojas de revenda de automóveis",
    segment: "Revenda de automóveis",
    location: "Brasil",
    types: ["trafego-pago"],
    services: ["Meta Ads", "TikTok Ads"],
    headline: "Tráfego pago para gerar contatos qualificados na revenda de veículos",
    summary: "Estratégia completa de tráfego pago com foco em Meta Ads e TikTok Ads, voltada à geração de contatos qualificados para a equipe comercial.",
    challenge: "Atrair pessoas realmente interessadas nos veículos da loja e tornar a marca mais conhecida no público da região.",
    solution: "Campanhas no Meta Ads e no TikTok Ads estruturadas para gerar leads qualificados e reforçar o reconhecimento da marca ao mesmo tempo.",
    cover: { src: "/images/cases/revenda-de-automoveis.webp", alt: "Veículo hatch preto em destaque no pátio de uma loja de seminovos" },
    desktop: [],
    mobile: [],
    featured: true,
    publishedAt: "2026-10-05",
  },
];
