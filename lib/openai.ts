﻿import OpenAI from "openai";

let cached: OpenAI | null = null;

export function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  if (!cached) cached = new OpenAI({ apiKey });
  return cached;
}
