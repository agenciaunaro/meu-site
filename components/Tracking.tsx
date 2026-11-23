"use client";
import { useEffect } from "react";
import Script from "next/script";
import { gtmId } from "@/lib/site";

declare global { interface Window { gtag?: (...a: unknown[]) => void } }

/**
 * Atualiza o consentimento no GTM quando o visitante escolhe no banner.
 * O GTM (layout) e o GA4 (dentro do contêiner) não são carregados aqui, para não duplicar.
 * O Meta Pixel direto só entra se não houver GTM configurado.
 */
export function Tracking({ analytics, marketing }: { analytics: boolean; marketing: boolean }) {
  useEffect(() => {
    const a = analytics ? "granted" : "denied";
    const m = marketing ? "granted" : "denied";
    window.gtag?.("consent", "update", { analytics_storage: a, ad_storage: m, ad_user_data: m, ad_personalization: m });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "consent_update", consent_analytics: a, consent_marketing: m });
  }, [analytics, marketing]);

  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!pixel || gtmId || !marketing) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`}</Script>
  );
}
