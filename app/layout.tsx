import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { EventBridge } from "@/components/EventBridge";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLd } from "@/components/JsonLd";
import { site, gtmId } from "@/lib/site";
import { consentDefaultScript } from "@/lib/consent";
import { organizationLd } from "@/lib/seo";

const grotesk = localFont({ src: "./fonts/space-grotesk-latin-wght-normal.woff2", variable: "--font-grotesk", weight: "300 700", display: "swap" });
const inter = localFont({ src: "./fonts/inter-latin-wght-normal.woff2", variable: "--font-inter", weight: "100 900", display: "swap" });
const serif = localFont({
  src: [
    { path: "./fonts/instrument-serif-latin-400-normal.woff2", style: "normal", weight: "400" },
    { path: "./fonts/instrument-serif-latin-400-italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-serif", display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Unaro | Agência de marketing personalizado em Curitiba", template: "%s | Unaro" },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#101010", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${grotesk.variable} ${inter.variable} ${serif.variable}`}>
      <head>
        {/* Consent Mode v2 antes do GTM (LGPD) */}
        <script id="consent-default" dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />
      </head>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body>
        {gtmId && (
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
          </noscript>
        )}
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <JsonLd data={organizationLd()} />
        <CookieConsent />
        <EventBridge />
      </body>
    </html>
  );
}
