/**
 * Dados institucionais da Unaro.
 * Tudo que é contato oficial fica aqui (ou no documento "Configurações do site" do CMS).
 * Campos vazios são ocultados automaticamente no site: nada de número inventado.
 */
export const site = {
  name: "Unaro",
  legalName: "Unaro Marketing Personalizado", // confirmar razão social
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaunaro.com.br").replace(/\/$/, ""),
  description:
    "Agência de marketing personalizado em Curitiba. Estratégia, conteúdo, mídia paga, desenvolvimento de sites e soluções digitais pensados a partir do negócio de cada cliente.",
  locale: "pt_BR",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "5541988344224", // WhatsApp oficial: +55 41 98834-4224
  email: "", // confirmar e-mail comercial
  phoneDisplay: "+55 41 98834-4224",
  address: {
    street: "R. Conselheiro Laurindo, 600, Sala 1301",
    district: "Centro",
    city: "Curitiba",
    region: "PR",
    postalCode: "", // confirmar CEP
    country: "BR",
  },
  social: {
    instagram: "https://www.instagram.com/agenciaunaro/",
    facebook: "https://www.facebook.com/profile.php?id=100057250277266",
    tiktok: "https://www.tiktok.com/@unaromkt",
    youtube: "https://www.youtube.com/@agenciaunaro",
    linkedin: "https://www.linkedin.com/company/unaro",
    google: "https://share.google/d3hvlVCldzH8S8EMF", // Perfil da Empresa no Google
  },
  founder: {
    name: "Rodrigo",
    role: "Fundador da Unaro",
  },
};

export type WaContext = { text: string };

/** Link de WhatsApp com mensagem contextual. Sem número configurado, cai no formulário de contato. */
export function waLink(message: string) {
  if (!site.whatsapp) return "/contato#formulario";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const hasWhatsapp = () => Boolean(site.whatsapp);

/** Contêiner oficial do Google Tag Manager (o GA4 G-VDK4W0ZJ5G está configurado dentro dele). */
export const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-MQX8778M";

export const showDemo = process.env.NEXT_PUBLIC_SHOW_DEMO !== "0";

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Redes oficiais na ordem de exibição. */
export const socialLinks = [
  { label: "Instagram", href: site.social.instagram },
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "Facebook", href: site.social.facebook },
  { label: "TikTok", href: site.social.tiktok },
  { label: "YouTube", href: site.social.youtube },
  { label: "Google", href: site.social.google },
].filter((s) => s.href);
