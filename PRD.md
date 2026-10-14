# PRD — Zakharias Priya Personal Portfolio
Version: 1.0 (design handoff; no code yet)

## Product vision
A polished bilingual portfolio presenting Zakharias Priya as a Product Designer & Web Developer, while identifying TednCo as his independent web studio. Serve recruiters/hiring managers and prospective freelance clients without confusing employment work with personally owned work.

## Audiences and goals
- Recruiters: assess design thinking, experience, contribution, outcomes, and CV; initiate career contact.
- Clients: see website quality, live examples, scope of services, and initiate project inquiries.
- Success outcomes: meaningful inquiries, case study visits, CV downloads, clicks to live projects. Do not invent numeric achievements.

## Positioning
- Primary identity: Zakharias Priya.
- Secondary practice: TednCo (independent studio), not the owner of past employer projects or R3G.
- Copy tone: concise, confident, grounded, human, not boastful.
- English default, Bahasa Indonesia switch.

## Pages / IA
1. `/` — Hero, selected work (4 cards), expertise, about teaser, TednCo teaser, contact CTA.
2. `/work` — all projects with All / Product Design / Web Development / Design Systems filters.
3. `/work/[slug]` — reusable case-study template.
4. `/about` — biography, professional experience, toolkit, downloadable CV.
5. `/contact` — two contact pathways (Hiring and Website Project); email CTA and social links.

## MVP features
- Responsive navigation: desktop links, accessible mobile menu.
- Light/Dark/System mode, local preference persistence (later implementation).
- EN/ID localized interface and content; maintain current route when switching.
- Project listing from local structured dummy data, no CMS/database at MVP.
- Reusable project details with appropriate templates for product UX vs web builds.
- Links: LinkedIn, Behance, GitHub, email, CV (use placeholders until verified).
- SEO, metadata, Open Graph, sitemap, good performance and accessibility.
- Clearly mark demo images, dummy claims, and unfinished personal projects while in development. No misleading live links.

## Not in MVP
- CMS, login, database, client portal, AI, contact-form backend, testimonials without consent, fictitious analytics/metrics, advanced animations, blog, booking/payment.

## Project taxonomy
- Product Design; Design Systems; Web Development; Independent Products.
- Each project includes role, ownership context, status, year (if verified), summary, contribution, process, outcomes (only validated), media, optional live URL.
- `workContext`: `employment`, `collaboration`, `independent`, `client`.
- `status`: `live`, `case-study`, `in-progress`, `concept`.

## Draft featured projects
1. ContractX — Sub-Contract Tender (employment/product design)
2. R3G Software POS (collaboration/digital product)
3. IFCA Core Design System (employment/design system)
4. ProjectX (employment/product design)
Additional later: Kelvin filmmaker portfolio, TednCo Finance, TednCo Parkir, Kemang Village mobile projects.
All artwork in development is a placeholder. Verify public-use permission for employer and client material.

## Acceptance criteria
- Recruiter can find Work → case study → About/CV → Contact.
- Client can find web work → live website (if actually live) → TednCo → Contact.
- Mobile at 390px is readable with no horizontal scrolling.
- EN/ID, theme settings, navigation, and project filters work predictably when implemented.
- A project cannot display fake metrics, fabricated testimonials, or a fictitious live URL.
- Keyboard focus states, contrast, alt text, reduced motion, descriptive links supported.

## Execution phases
A. Finalize design and content source files (current).
B. Build app shell and homepage.
C. Work listing and detail pages.
D. About, Contact, responsive polish, theme and localization.
E. Replace dummy with verified real assets; review confidentiality; test and deploy.
