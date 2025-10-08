import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Simple GET so you can open it in the browser
export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "/api/ai" });
}

// Minimal POST for UI tests
export async function POST() {
  return NextResponse.json({ answer: " AI endpoint OK (ai)" });
}
