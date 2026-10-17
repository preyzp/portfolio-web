import { createHash } from "node:crypto";
import { isContactEmail, validateContact } from "@/lib/contact-input";
import { contactRateLimit } from "@/lib/contact-rate-limit";

export const runtime = "nodejs";
const unavailable = "The contact form is temporarily unavailable. Please email priyazakharias@gmail.com directly.";
const json = (body: object, status: number, headers: Record<string, string> = {}) => Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);

async function readBody(request: Request): Promise<string> {
  const reader = request.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16_384) {
        await reader.cancel();
        throw new Error("BODY_TOO_LARGE");
      }
      chunks.push(value);
    }
    return Buffer.concat(chunks).toString("utf8");
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigins = [new URL(request.url).origin];
  if (process.env.NEXT_PUBLIC_SITE_URL) allowedOrigins.push(new URL(process.env.NEXT_PUBLIC_SITE_URL).origin);
  if (origin && !allowedOrigins.includes(origin)) return json({ error: "Please submit the form from this website." }, 403);
  const retryAfter = contactRateLimit(request.headers);
  if (retryAfter) return json({ error: "Too many attempts. Please try again later or email me directly." }, 429, { "Retry-After": String(retryAfter) });
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return json({ error: "Send the form as JSON." }, 415);
  let input: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(await readBody(request));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return json({ error: "Invalid form data." }, 400);
    input = parsed as Record<string, unknown>;
  } catch (error) {
    return json({ error: error instanceof Error && error.message === "BODY_TOO_LARGE" ? "The submission is too large." : "Invalid form data." }, error instanceof Error && error.message === "BODY_TOO_LARGE" ? 413 : 400);
  }
  if (input.website !== undefined && (typeof input.website !== "string" || input.website !== "")) return json({ error: "Unable to submit this form. Please email me directly." }, 400);
  const { values, errors } = validateContact(input);
  if (Object.keys(errors).length) return json({ error: "Please check the highlighted fields.", errors }, 422);
  if (typeof input.requestId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input.requestId)) return json({ error: "Please refresh the page and try again." }, 400);
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() || "priyazakharias@gmail.com";
  if (!apiKey || !from || !isContactEmail(from) || !isContactEmail(to)) return json({ error: unavailable }, 503);
  const text = `Name: ${values.name}\nEmail: ${values.email}\nInquiry: ${values.inquiry}\n\n${values.message || "No message provided"}`;
  const email = { from: `Portfolio <${from}>`, to: [to], reply_to: values.email, subject: `Portfolio inquiry: ${values.inquiry}`, text, html: `<pre style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(text)}</pre>` };
  const idempotencyKey = createHash("sha256").update(input.requestId + JSON.stringify(email)).digest("hex");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `contact/${idempotencyKey}` },
      body: JSON.stringify(email),
      signal: AbortSignal.timeout(12_000),
      cache: "no-store",
    });
    if (!response.ok) return json({ error: "Your message could not be sent. Please retry or email me directly." }, 502);
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("id" in result) || typeof result.id !== "string" || !result.id) return json({ error: "Sending could not be confirmed. Please retry or email me directly." }, 502);
    // Provider confirmation means accepted for delivery, not guaranteed inbox placement.
    return json({ ok: true }, 200);
  } catch {
    return json({ error: "Sending could not be confirmed. Please retry or email me directly." }, 502);
  }
}
