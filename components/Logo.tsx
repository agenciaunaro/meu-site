import Image from "next/image";
import Link from "next/link";

/** Logotipo oficial da Unaro (PNG transparente em /public/brand). */
export function Logo({ className = "", onDark = false, size = "md" }: { className?: string; onDark?: boolean; size?: "md" | "lg" }) {
  return (
    <Link href="/" aria-label="Unaro, página inicial" className={`inline-flex shrink-0 items-center ${className}`}>
      <Image
        src={onDark ? "/brand/logo-unaro-branco.png" : "/brand/logo-unaro-preto.png"}
        alt="Unaro"
        width={344}
        height={123}
        priority={!onDark}
        className={size === "lg" ? "h-10 w-auto" : "h-7 w-auto sm:h-8"}
      />
    </Link>
  );
}
