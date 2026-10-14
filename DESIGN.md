# DESIGN.md — Zakharias Priya Portfolio
Version: 1.0 — approved design direction, not code

## Style
Refined, calm, elegant minimalism. Editorial but readable, restrained motion, project visuals as principal color. Do not mimic a flashy agency site or overuse massive headlines.

## Identity
Header wordmark `ZP.`; professional name `Zakharias Priya`; studio teaser `TednCo` is subordinate. English first, Bahasa Indonesia second.

## Color tokens
| Token | Light | Dark |
|---|---|---|
| background | #FAFAF9 | #111111 |
| surface | #FFFFFF | #1C1C1C |
| primary text | #171717 | #F5F5F4 |
| secondary text | #57534E | #A8A29E |
| border | #E7E5E4 | #363636 |
| primary CTA bg | #171717 | #F5F5F4 |
| primary CTA text | #FFFFFF | #171717 |

No bright global accent. Project images can retain their original color. Green status indicator is optional only if availability is true and maintained.

## Type
- Headlines: Space Grotesk; paragraph and UI: Inter.
- Desktop display 72/1.1, H1 48/1.15, H2 36/1.2, H3 24/1.3, body 16–18/1.6–1.65, caption 13/1.5.
- Mobile display 40/1.15, H1 34/1.2, H2 28/1.25, H3 22/1.3, body 16/1.6, caption 13/1.5.
- Avoid excessive letter spacing and ALL CAPS except short eyebrow labels.

## Grids and spacing
- Desktop artboard 1440px, content max 1200px, default side padding 64px where possible, 12-column grid.
- Mobile artboard 390px, 20px gutter, 4-column grid, one-column projects.
- Tablet 768–1023px, responsive two-column projects if there is room.
- 4px spacing system. Desktop section spacing ~112px, mobile ~72px.
- Navbar desktop height 80px; mobile 64px. Hero desktop vertical spacing 112px, mobile 72px.
- Card radius 16px desktop / 12px mobile; button 8px radius, 48px min height.

## Homepage section specification
1. Sticky subtle navbar: `ZP.`; Work / About / Contact; theme; language; Let's Talk. Mobile: logo, theme, menu; language in mobile menu.
2. Hero: eyebrow `PRODUCT DESIGNER & WEB DEVELOPER · INDONESIA`; title `Designing thoughtful digital experiences.`; short bio; `Explore My Work` and `Get in Touch`.
3. Selected Work: 2x2 image cards desktop, vertical on mobile, featuring ContractX, R3G Software POS, IFCA Core, ProjectX. Show categories and arrow affordance.
4. What I Do: Product Design, Design Systems, Web Development.
5. About preview: 1–2 short paragraphs, link to About.
6. TednCo studio teaser: visually distinct neutral surface, concise offer, link to studio/contact (only active when valid).
7. Contact CTA: suitable for career or freelance inquiry.
8. Footer: name/copyright/socials/EN-ID where appropriate.

## Project pages
- `/work` has title/intro, filter chips, project cards, and clear project-status labels.
- Design case-study sections: Overview / Challenge / Role / Process / Solution / Outcome & Learnings.
- Web project sections: Brief / Goals / Visual Direction / Showcase / Responsive / Stack / Live Link.
- Display role and collaboration/ownership truthfully. Outcomes must be substantiated.

## Components / variants
- Navbar desktop/mobile; menu overlay; theme switch Light/Dark/System; language EN/ID.
- Primary, secondary, text buttons (normal, hover, focus, pressed, disabled).
- ProjectCard (image, title, category, project status, hover arrow); FilterChip; Tag; SectionTitle; Footer; social links.
- Contact CTA variants for recruiter vs client.

## States, accessibility, and motion
- Strong visible keyboard focus; semantic interactions; 44px accessible hit targets minimum for icon buttons.
- Color contrast WCAG AA, meaningful alt text, skip link, proper headings, reduced-motion support.
- Hover: thumbnail max scale 1.02, arrow shift ~2px; motion 150–300ms.
- Reveal: opacity + at most 12px vertical shift, once; no scroll hijacking.
- Preference persisted for user choice; use system preference by default.
- Desktop scroll behavior must not obscure anchored headings beneath fixed nav.

## Art direction for dummy imagery
- Use neutral framed composition mimicking product UI, but identify it in content as placeholder.
- No random stock people or misleading screenshots for real portfolio entries.
- Actual project screenshots should replace every placeholder before launch.

## Figma deliverables later
- Desktop light/dark at 1440px and mobile light/dark at 390px.
- Navigation and menu states, project card variants, button states, responsive tablet check, content-ready components.
