import { NextResponse } from "next/server";

export const runtime = "nodejs";       // force Node runtime
export const dynamic = "force-dynamic";

export async function POST() {
  return NextResponse.json({ answer: " Test OK  /api/chat répond." });
}
