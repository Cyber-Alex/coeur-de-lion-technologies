import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    openaiKeySeen: Boolean(process.env.OPENAI_API_KEY),
    env: process.env.VERCEL_ENV || "local",
    time: new Date().toISOString(),
  });
}
