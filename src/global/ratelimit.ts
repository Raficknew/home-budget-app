import { Ratelimit } from "@upstash/ratelimit";
import { headers } from "next/headers";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "40s"),
});

export async function checkRateLimit() {
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";

  const { limit, reset, remaining } = await ratelimit.limit(ip);

  if (remaining === 0) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "X-RateLimit-Limit": String(limit),
        "X-RateLimit-Remaining": String(remaining),
        "X-RateLimit-Reset": String(reset),
      },
    });
  }

  return;
}
