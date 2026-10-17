# Zakharias Priya — Portfolio Planning Package

This package contains **design and content specifications only**. No application code is included.

- `PRD.md`: vision, pages, audience, scope, acceptance criteria.
- `DESIGN.md`: visual system, responsive layouts, interactions, component specs.
- `CONTENT.md`: English/Indonesian copy, dummy project inventory, real-asset collection checklist.
- `AGENTS.md`: scoped instructions for a future coding agent.

Next step: review the specifications, then request authorization to build the app shell and homepage with dummy data.

## SEO configuration

The Contact page is included in the sitemap and uses the shared SEO metadata helper.

Set `NEXT_PUBLIC_SITE_URL` to the actual production origin (scheme and hostname, without a path, query, or fragment) before building. Rebuild after changing it: metadata, sitemap, and robots are generated at build time. When unset, local testing uses `http://localhost:3000`; configure it before production deployment.

`/work` is canonical; `/portfolio` permanently redirects there. The sitemap includes Home, About, Work, Contact, and only projects with `published: true`. Development draft previews have `noindex, nofollow` metadata. The static 1200 × 630 social preview uses Next.js ImageResponse and bundled Space Grotesk (license in `src/assets/fonts/OFL.txt`), without runtime font downloads. The existing layout fonts still require Google Fonts access at build time.

## Contact form setup

`/contact` submits to `POST /api/contact` using the Resend HTTP API, with no new dependencies. Email, phone, WhatsApp, and LinkedIn links work independently of email service configuration. The local Lucide SVG paths retain their license in `src/app/contact/LUCIDE-LICENSE.txt`.

Configure these **server-only** environment variables in `.env.local` locally and in your deployment's secret settings:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key with sending permission for the verified domain. |
| `CONTACT_FROM_EMAIL` | A plain email address on your verified sending domain; no display name. Never set this to a visitor's address. |
| `CONTACT_TO_EMAIL` | Recipient mailbox; defaults to `priyazakharias@gmail.com`. |
| `CONTACT_TRUSTED_IP_HEADER` | Optional IP header your hosting proxy **strips and overwrites**. Leave unset unless that guarantee is established. |

1. Create a Resend account and add a domain you control. Complete the DNS records shown in Resend and wait for domain verification: https://resend.com/docs/dashboard/domains/introduction.
2. Create a sending API key. Set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` on the server. Never prefix secrets with `NEXT_PUBLIC_`. Set `CONTACT_TO_EMAIL` if a different mailbox should receive inquiries.
3. Set the existing `NEXT_PUBLIC_SITE_URL` to the real production origin, restart/redeploy, and send a safe test inquiry. Check the recipient inbox and Resend delivery events, then verify Reply-To replies to the test visitor address.

Missing or invalid configuration returns HTTP 503; the UI preserves the message and offers retry and direct email. HTTP 200 is returned only after Resend accepts the email and returns an email ID. Confirmation explicitly says **accepted for delivery**, not delivered to an inbox. Inbox delivery/bounces require checking Resend events; no delivery webhook or delivery-tracking claim is implemented.

Spam protection includes a honeypot, same-origin browser requests, 16 KiB body limit, strict server validation, escaped email HTML, and in-memory rate limits (5 attempts per 10 minutes per trusted IP or shared fallback bucket; 30 attempts per minute globally). IP values are hashed in memory. Do not configure an untrusted client-controlled forwarding header. Limits reset on restart and apply per process; for multiple instances/serverless production, configure a shared host/WAF rate limit for `POST /api/contact`. Resend idempotency keys and an immediate client submission lock prevent duplicate sends on retries of unchanged messages. Messages and credentials are not logged by application code.

Run backend regression tests with `node --test tests/contact.test.mjs`. These use a mocked provider and never send real email. Live delivery remains **NOT TESTED** until credentials and a verified sender are supplied.
