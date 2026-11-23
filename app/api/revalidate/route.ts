import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/** Webhook do Sanity: publica no CMS e o site atualiza (home, blog, portfólio). */
export async function POST(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) return NextResponse.json({ ok: false }, { status: 401 });
  revalidateTag("sanity", "max");
  return NextResponse.json({ ok: true, revalidated: true });
}
