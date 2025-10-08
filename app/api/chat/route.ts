import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  const timeout = setTimeout(() => ctrl.abort(), 25000); // 25s de garde-fou

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
      {
        role: "system",
        content:
          "Tu es l’assistant de Cœur de Lion Technologies. Sois clair, professionnel et orienté solutions (Programmation, BI, ERP, cybersécurité, IA appliquée).",
      },
      ...(Array.isArray(history) ? history : []),
      { role: "user", content: prompt },
    ];

    // Appel REST direct à OpenAI (évite les soucis de SDK en production)
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages,
      }),
      signal: ctrl.signal,
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return NextResponse.json({
        answer: ` Erreur OpenAI (${res.status}): ${errText || res.statusText}`,
      });
    }

    const data = await res.json().catch(() => ({}));
    const choice = data?.choices?.[0];
    const answer = partsToText(choice?.message?.content) || "Salut! Dis-m’en un peu plus ";

    return NextResponse.json({ answer });
  } catch (e: any) {
    const msg = e?.name === "AbortError" ? "timeout" : (e?.message || String(e));
    return NextResponse.json({ answer: ` Erreur serveur: ${msg}` });
  } finally {
    clearTimeout(timeout);
  }
}
