import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const ratelimitForTransactions = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(30, "1m"),
});

export async function assertTransactionsRateLimit(userId: string) {
  if (!userId) return;

  const { remaining } = await ratelimitForTransactions.limit(userId);

  console.log("Transactions Rate Limit Remaining: ", remaining);

  if (remaining <= 0) {
    throw "RateLimitExceededException";
  }

  return;
}
