import type { NextConfig } from "next";

const isPreview = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  // Build normal (Vercel): SSG + ISR + rotas de API.
  // Build de preview (STATIC_EXPORT=1): HTML estático para apresentação.
  ...(isPreview ? { output: "export" as const, trailingSlash: true } : {}),
  images: {
    unoptimized: isPreview,
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
