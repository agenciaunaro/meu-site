import { NextResponse } from "next/server";

/**
 * Recebe o formulário e repassa para CONTACT_WEBHOOK_URL (CRM, n8n, Make, Zapier, RD Station etc.).
 * Proteção: honeypot, validação de campos e limite simples por IP.
 * Sem webhook configurado, responde 503: o front-end então usa o WhatsApp (se configurado).
 */
const hits = new Map<string, { n: number; t: number }>();

export async function POST(req: Request) {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  const now = Date.now();
  const h = hits.get(ip);
  if (h && now - h.t < 60_000 && h.n >= 5) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  hits.set(ip, h && now - h.t < 60_000 ? { n: h.n + 1, t: h.t } : { n: 1, t: now });

  let body: Record<string, string>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  if (body.website) return NextResponse.json({ ok: true }); // honeypot: finge sucesso
  const nome = (body.nome || "").trim().slice(0, 120);
  const whatsapp = (body.whatsapp || "").replace(/\D/g, "");
  if (!nome || whatsapp.length < 10 || !body.consentimento) return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });

  const payload = {
    nome, whatsapp,
    empresa: (body.empresa || "").slice(0, 160),
    servico: (body.servico || "").slice(0, 120),
    mensagem: (body.mensagem || "").slice(0, 3000),
    pagina: (body.page || "").slice(0, 200),
    consentimento: true,
    recebido_em: new Date().toISOString(),
    origem: "site",
  };
  try {
    const r = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!r.ok) throw new Error(String(r.status));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "webhook_failed" }, { status: 502 });
  }
}
