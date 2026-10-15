---
title: "ContractX — Construction Contract & Procurement"
slug: "contractx"
category: "Product Design"
platform: "Mobile"
industry: "Construction ERP / B2B SaaS"
role: "UI/UX Designer"
summary: "The mobile experience for IFCA's construction ERP — sub-contracts, supply chain and tenders, with a spreadsheet-grade bill of quantities made usable on a phone."
featured: true
published: true
cover: "/images/portfolio/contractx/01-cover.webp"
thumbnail: "/images/portfolio/contractx/06-thumbnail.webp"
---

## Overview

ContractX is IFCA's construction management ERP — contracts, procurement, projects and finance in one platform, used on both web and mobile. This case study covers the mobile experience I designed for three of its commercial modules: Sub-Contract Management, Supply Chain Management, and Sub-Contract Tender — the workflows contractors use to award work, buy materials and manage payments. The web version follows the same design decisions.

The users are contractors and their commercial and project teams, managing subcontracts, suppliers and tenders across a project lifecycle — on site and on the move.

![ContractX modules — main menu, sub-contract, purchasing and tenders](/images/portfolio/contractx/02-overview.webp)

## My Role & Responsibilities

I was the Product Designer for the mobile UI/UX. Working from the existing enterprise workflows and IFCA's design system, I translated dense desktop processes into a mobile experience: I defined the information hierarchy, designed the interactions, prototyped the data-dense screens, and reused the existing component system — then supported developers through handoff, implementation and QA.

I did not own the product or the design system; I designed the mobile layer on top of them, and the web version follows the same patterns and decisions. I worked alongside a product manager, developers and business stakeholders.

## The Challenge

Commercial work in construction is high-value and time-sensitive, but the information lives in dense, desktop-grade forms, so decisions get trapped at a desk. ContractX already handles that depth on large screens; on mobile it can't simply be shrunk down — it has to be re-decided.

The depth is real: tenders hold rounds; rounds hold specs, checklists and a line-by-line bill of quantities (BoQ). Progress claims, advances, retention, LAD and tax schemes sit inside everyday screens, and the procurement chain — Purchase Order → Delivery Order → GRN → Invoice — means each step references the last.

> How might we create a clear, scalable mobile experience that helps users understand what's happening, what needs their attention, and what to do next — without losing the depth the business requires?

## Design Process

I started with information architecture, mapping how ContractX's objects relate — contracts, suppliers, documents and financial records — so the mobile modules would mirror the structure the web is built on rather than becoming a set of loose forms. From there I designed the three commercial workflows on top of those shared entities, worked through interaction design and prototyping for data-dense screens such as a paginated BoQ, and reused the existing component set so the handoff mapped cleanly to real components.

No user research or usability testing was part of this engagement, and I had no user-analytics access; this was a design, information-architecture and interaction effort, and I'm describing it as exactly that.

![Supply-chain procurement flow — project purchases, generate PO from PR, delivery order](/images/portfolio/contractx/03-process.webp)

## Final Solution

The result is a coherent mobile experience that carries a contractor from tender to sub-contract to payment, and from requisition to delivery, built on a shared component system so three dense workflows still feel like one product. Sub-contract records keep scope, money, documents and progress in one place; the supply-chain module runs the full procurement chain; and the tender module makes a spreadsheet-grade BoQ genuinely usable on a phone.

![Key modules — sub-contract management, supply chain, phone-usable BoQ, tender submission](/images/portfolio/contractx/04-solution.webp)

## Platform & Interface Showcase

The sub-contract tender is where ContractX is most data-heavy, so it needed the most care on mobile. A tender moves from its specs and checklist, into an editable, paginated bill of quantities, and on to invitees and submission — a spreadsheet-grade table turned into something a contractor can actually read and edit on a phone.

![Sub-contract tender on mobile — tender specs, BoQ line items, and submission](/images/portfolio/contractx/05-responsive.webp)

## Outcomes & Learnings

This was a qualitative project with no analytics access, so the outcomes are about clarity, consistency and scalability rather than measured results: three dense enterprise workflows delivered for mobile; a consistent status, action and component language across modules; complex objects — tenders, sub-contracts, purchase orders — made navigable; a spreadsheet-grade bill of quantities made usable on a phone; and faster developer implementation through reused components.

The hard part of enterprise mobile isn't any single screen — it's holding a nested, data-dense, interconnected workflow together as it grows. Deciding what matters in the moment and trusting the detail view for the rest, while letting a shared system carry consistency, is what keeps a complex B2B product usable and scalable.

## Scope & Disclaimer

ContractX is a real product by IFCA, available on web and mobile. The screens shown use anonymized / sample data. This case study covers my mobile UI/UX contribution and does not represent ownership of the product, its business logic, or its underlying design system.
