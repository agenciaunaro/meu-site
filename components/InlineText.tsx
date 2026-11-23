import Link from "next/link";
import type { ReactNode } from "react";

/** Converte [texto](url) em links. Links internos usam next/link. */
export function InlineText({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [, label, href] = m;
    out.push(href.startsWith("/")
      ? <Link key={k++} href={href}>{label}</Link>
      : <a key={k++} href={href} target="_blank" rel="noopener noreferrer">{label}</a>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

export const plain = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
