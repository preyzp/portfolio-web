import { createHash } from "node:crypto";
import { isIP } from "node:net";

// Best-effort, per-process protection. Use a shared gateway/WAF limit when scaling.
const buckets = new Map<string, { count: number; reset: number }>();
function consume(key: string, limit: number, windowMs: number, now: number) {
  let bucket = buckets.get(key);
  if (!bucket || bucket.reset <= now) {
    bucket = { count: 0, reset: now + windowMs };
    buckets.set(key, bucket);
  }
  bucket.count++;
  return bucket.count > limit ? Math.ceil((bucket.reset - now) / 1000) : 0;
}

export function contactRateLimit(headers: Headers, now = Date.now()): number {
  for (const [key, bucket] of buckets) if (bucket.reset <= now) buckets.delete(key);
  const globalRetry = consume("global", 30, 60_000, now);
  if (globalRetry) return globalRetry;
  // Never trust arbitrary forwarded headers by default. Configure only a header
  // your reverse proxy strips and overwrites; otherwise all visitors share a bucket.
  const header = process.env.CONTACT_TRUSTED_IP_HEADER;
  const ip = header ? headers.get(header)?.split(",")[0].trim() : undefined;
  const key = ip && isIP(ip) ? createHash("sha256").update(ip).digest("hex") : "shared";
  if (buckets.size >= 10_000 && !buckets.has(key)) return 60;
  return consume(key, 5, 600_000, now);
}
