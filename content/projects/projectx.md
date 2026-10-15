---
title: "ProjectX — Construction Project Cost & Contract"
slug: "projectx"
category: "Product Design"
platform: "Mobile"
industry: "Construction ERP / B2B SaaS"
role: "UI/UX Designer"
summary: "The mobile cost-and-contract side of a construction ERP — budgets, contracts, progress claims, invoices and unit costs — with desktop-grade financial tables made reviewable on a phone."
featured: true
published: true
cover: "/images/portfolio/projectx/01-cover.webp"
thumbnail: "/images/portfolio/projectx/06-thumbnail.webp"
---

## Overview

ProjectX is the cost and contract side of IFCA's construction ERP: it plans budgets, sets up contracts and contractors, records progress claims and invoices, and tracks unit costs and purchases against a live project. This case study covers my mobile UI/UX work turning that dense, desktop-grade project accounting into something a team can review and act on from a phone.

The users are the project and commercial finance teams who manage a project's money across its lifecycle — setting budgets, committing them to contracts, and claiming and invoicing as work progresses.

![ProjectX modules — project administration, budgeting, contracts and claims](/images/portfolio/projectx/02-overview.webp)

## My Role & Responsibilities

I was the Product Designer for the mobile UI/UX. Working from the product requirements and IFCA's existing design system, I organized the information architecture, designed the data tables, forms and detail views, defined the interaction patterns, and built the mobile layouts in Figma — then prepared a consistent, buildable set for developer handoff.

The team owned the product scope and business rules, the backend, data and integrations, the business and billing logic, roles and permissions, and the underlying platform and release.

## The Challenge

A project's finances are managed as long, interlinked documents — budgets broken into line items, contracts with cost allocations, progress claims that turn into invoices, and unit costs distributed across a work breakdown. None of that was built for a phone.

> How do you make budgets, contracts, progress claims and unit-cost tables reviewable and actionable on a small screen — while keeping the numbers accurate and the audit trail intact?

## Design Process

I organized ProjectX around the lifecycle of a project's money, so each module is a place you drill into from the project — budgeting and allocation, contracts and contractors, progress claim to invoice, unit costs, and project purchases — rather than a flat pile of forms.

A few decisions shaped the dense screens:

1. **Budgets as a collapsible tree** — a wide desktop budget sheet became a work-breakdown tree: scan the top-level total, then open only the branch you care about, with no horizontal scrolling on a phone.
2. **Revisions you can audit line by line** — each budget revision shows the original figure, the adjustment and the result side by side, with the running total pinned to the bottom of the screen.
3. **Distributions that always reconcile** — allocating a cost across units is an editable list that ties back to the figure at the top, so the distribution can never silently drift from the cost-code total.
4. **Contracts and balances that stay traceable** — a contract list you drill into, a guided add-contract form, cost allocation, and a per-contractor account with its transactions.

![Budgeting flow — budget summary, budgeting detail, budget allocation](/images/portfolio/projectx/03-process.webp)

## Final Solution

The result carries a project's money from planning, through commitment, to claiming: budgets are set and allocated across the work breakdown, committed through contracts and tracked per contractor, then claimed through progress claims that become invoices — with unit costs and purchases tracked against the live project. Dense desktop tables are turned into trees and reconciling lists so the structure stays visible on a small screen.

![Key modules — budgeting, contracts, progress claim to invoice, unit-cost distribution](/images/portfolio/projectx/04-solution.webp)

## Platform & Interface Showcase

ProjectX is at its most table-heavy in cost allocation, unit-cost distribution and contractor accounts. These are the screens that most needed rethinking for mobile: wide financial tables rebuilt as readable, reconciling lists — a cost distributed across units that always ties back to its total, and a contractor's account laid out as a scannable list of transactions.

![Desktop-grade tables on a phone — contract cost allocation, unit-cost mapping, account transactions](/images/portfolio/projectx/05-responsive.webp)

## Outcomes & Learnings

This was a qualitative project, so the outcomes are about clarity, accuracy and consistency rather than measured results: dense project accounting made reviewable and actionable on mobile; wide budget sheets turned into collapsible work-breakdown trees; revisions made auditable line by line; cost distributions that always reconcile to their total; one consistent pattern reused across the money modules; and components reused from IFCA's system to speed up implementation.

The lesson was that the hard part of financial mobile design isn't styling a table — it's keeping the numbers honest and the structure legible as a document gets deep, so the same discipline that keeps a figure reconciling is what keeps the whole product trustworthy.

## Scope & Disclaimer

ProjectX is part of a real construction ERP by IFCA. The screens shown use sample data (example projects, budgets and transactions). This case study covers my mobile UI/UX contribution and does not represent ownership of the product's backend, business and billing logic, roles and permissions, or release.
