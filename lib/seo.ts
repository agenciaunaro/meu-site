import type { Metadata } from "next";
import { site, absoluteUrl } from "./site";

export function buildMetadata({ title, description, path, image, type = "website", publishedTime, modifiedTime, noindex }:
  { title: string; description: string; path: string; image?: string; type?: "website" | "article"; publishedTime?: string; modifiedTime?: string; noindex?: boolean }): Metadata {
  const url = absoluteUrl(path);
  const og = image ? (image.startsWith("http") ? image : absoluteUrl(image)) : absoluteUrl("/og-default.png");
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url, siteName: site.name, locale: site.locale, type, images: [{ url: og, width: 1200, height: 630 }], ...(type === "article" ? { publishedTime, modifiedTime } : {}) },
    twitter: { card: "summary_large_image", title, description, images: [og] },
  };
}

export function organizationLd() {
  const a = site.address;
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": absoluteUrl("/#organizacao"),
    name: site.name,
    url: site.url,
    description: site.description,
    logo: absoluteUrl("/icon.png"),
    image: absoluteUrl("/og-default.png"),
    address: { "@type": "PostalAddress", streetAddress: a.street, addressLocality: a.city, addressRegion: a.region, addressCountry: a.country, ...(a.postalCode ? { postalCode: a.postalCode } : {}) },
    areaServed: { "@type": "City", name: "Curitiba" },
    ...(site.phoneDisplay ? { telephone: site.phoneDisplay } : {}),
    ...(site.email ? { email: site.email } : {}),
    sameAs: [site.social.instagram, site.social.linkedin, site.social.facebook, site.social.tiktok, site.social.youtube].filter(Boolean),
  };
}
