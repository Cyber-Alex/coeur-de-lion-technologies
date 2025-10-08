import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// petit util pour normaliser le retour OpenAI
function partsToText(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((p: any) => (typeof p === "string" ? p : p?.text ?? p?.content ?? "")).join("");
  }
  if (content && typeof content === "object" && "text" in (content as any)) {
    return String((content as any).text ?? "");
  }
  return "";
}

export async function POST(req: Request) {
  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), 25000); // garde-fou 25s

  try {
    const { history, prompt } = await req.json().catch(() => ({} as any));
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ answer: " Prompt manquant." });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ answer: " Serveur non configuré (OPENAI_API_KEY manquante)." });
    }

    const messages = [
      { role: "system", content: "Tu es l’assistant de Cœur de Lion Technologies. Ton style: clair, professionnel, pragmatique. Domaines: IA appliquée, BI & Data, ERP & intégration (Odoo, SAP, Oracle), cybersécurité (hygiène TI, audits). Donne des réponses utiles et actionnables." },
      ...(Array.isArray(history) ? history : []),
      { role: "user", content: prompt },
    ];

    // Appel REST direct (évite les soucis de SDK en prod)
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",   // bon rapport qualité/prix ; changeable
        temperature: 0.2,
        messages,
      }),
      signal: ctrl.signal,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return NextResponse.json({ answer: ` Erreur OpenAI (${res.status}): ${body || res.statusText}` });
    }

    const data = await res.json().catch(() => ({}));
    const choice = (data as any)?.choices?.[0];
    const answer = partsToText(choice?.message?.content) || "Salut! Donne-moi un peu plus de contexte ";

    return NextResponse.json({ answer });
  } catch (e: any) {
    const msg = e?.name === "AbortError" ? "timeout" : (e?.message || String(e));
    return NextResponse.json({ answer: ` Erreur serveur: ${msg}` });
  } finally {
    clearTimeout(timeout);
  }
}

// Garde le GET simple pour test rapide dans le navigateur
export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "/api/ai" });
}
