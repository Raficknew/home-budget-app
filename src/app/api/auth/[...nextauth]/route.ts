import { checkRateLimit } from "@/global/ratelimit";
import { handlers } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const rateLimited = await checkRateLimit(request);

  if (rateLimited) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  return new Response(null, { status: 204 });
}

export const { GET } = handlers;
