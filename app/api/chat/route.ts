import { NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";

// Forcer l'exécution en Node.js (évite les soucis Edge)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function partsToText(content: unknown): string {
  // L’API peut renvoyer soit une string, soit un tableau de “content parts”
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((p: any) =>
        typeof p === "string"
          ? p
          : p?.text ?? p?.content ?? "" // compat diverses versions
      )
      .join("");
  }
  if (content && typeof content === "object" && "text" in (content as any)) {
    return String((content as any).text ?? "");
  }
  return "";
}

export async function POST(req: Request) {
  try {
    const { history, prompt } = await req.json().catch(() => ({} as any));
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const client = getOpenAI();
    if (!client) {
      return NextResponse.json(
        { error: "Server not configured: OPENAI_API_KEY is missing" },
        { status: 500 }
      );
    }

    const resp = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "Tu es l’assistant de Cœur de Lion Technologies. Sois clair, aidant et orienté solutions (Programmation, BI, ERP, cybersécurité, IA appliquée).",
        },
        ...(Array.isArray(history) ? history : []),
        { role: "user", content: prompt },
      ],
    });

    const choice = resp.choices?.[0];
    const answer = partsToText(choice?.message?.content) || "";

    if (!answer.trim()) {
      // Renvoie quelque chose d’utile si le modèle renvoie vide
      return NextResponse.json({
        answer:
          "Salut! Je suis prêt à t’aider. Dis-m’en un peu plus sur ta question (IA, BI, ERP, cybersécurité)…",
      });
    }

    return NextResponse.json({ answer });
  } catch (e: any) {
    // Message d’erreur lisible côté client
    return NextResponse.json(
      { error: e?.message ?? "AI error" },
      { status: 502 }
    );
  }
}









