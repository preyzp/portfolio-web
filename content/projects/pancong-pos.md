---
title: "Pancong POS"
slug: "pancong-pos"
category: "Product Design"
platform: "Responsive Web Application"
industry: "Food & Beverage"
role: "UI/UX Design & Web Development"
summary: "A point-of-sale application for managing orders, menus, payments, and daily sales."
status: "in-development"
featured: true
featuredOrder: 5
published: true
cover: "/images/portfolio/pancong-pos/01-cover.webp"
thumbnail: "/images/portfolio/pancong-pos/06-thumbnail.webp"
techStack:
  - "Next.js"
  - "React"
  - "TypeScript"
  - "Tailwind CSS"
  - "Zustand"
  - "MongoDB"
  - "Vitest"
---

## Overview

Pancong POS is a point-of-sale application being developed for a small Pancong and Ketan Susu business. It covers the everyday counter workflow — managing the menu and add-ons, creating an order, working through a cart and checkout, taking payment, and reviewing transaction history and daily sales. It is designed as a responsive web application so it can run on a counter laptop or a phone.

The project is still under active development. The interface and core POS flows have been designed, and the application is being built against them; it is not launched, not commercially available, and has no production deployment or active customers.

The audience is a small-stall owner or cashier who needs to record a sale quickly and keep a clear view of the day's takings, without complicated software.

![Pancong POS — dashboard, new order, transaction history and sales screens](/images/portfolio/pancong-pos/02-overview.webp)

## My Role & Responsibilities

This is a personal project, and I work on it as both the UI/UX designer and the web developer. I designed the product — a small design system, the screen structure, the order and payment flows, and the responsive layouts — and I am implementing it in code as the front-end of a responsive web application.

Because it is still in development, I'm distinguishing designed-and-implemented work from work that is planned or in progress rather than presenting everything as complete.

## The Challenge

A point-of-sale tool lives or dies on speed and clarity. At a busy stall, the person at the counter can't afford to hunt through menus or do mental math. The design goal was a POS that records an order in a few taps, keeps the running total and change obvious, handles optional toppings cleanly, and never buries the important action — while staying simple enough for a single operator to run alone.

## Design Process

I started with a small set of foundations — a type scale, a spacing system and a Lucide-style icon set — and the reusable components a POS leans on: menu cards, a quantity stepper, a price summary and the order sheet. From there I designed the full order flow and its screen states (empty cart, no orders yet, no search results), then moved into implementation, building the screens as a responsive web front-end and wiring client-side state.

![Order flow — new order, payment, receipt](/images/portfolio/pancong-pos/03-process.webp)

## Final Solution

The app centers on a dashboard that shows the day's sales and recent orders, with a one-tap path into a new order. Ordering is a menu-and-cart flow with optional toppings; payment supports cash and QRIS with a clear total and change; and each sale ends in a printable receipt. Supporting areas cover transaction history, a sales summary with a per-menu breakdown, and settings for menu and pricing, store profile, payment methods and receipt printing. These represent the designed scope of the product; implementation is ongoing.

![Key features — order and cart, cash and QRIS payments, sales reports, menu and settings](/images/portfolio/pancong-pos/04-solution.webp)

## Responsive Experience

Pancong POS is designed for two contexts from one responsive build: a full desktop layout for a counter laptop, with menu, cart and payment visible together, and a phone layout for taking orders on the move. Both share the same components and visual language.

![Pancong POS on desktop and mobile](/images/portfolio/pancong-pos/05-responsive.webp)

## Technology Stack

The application is being built with Next.js, React and TypeScript, styled with Tailwind CSS, with client-side state handled by Zustand. Data persistence with MongoDB is being integrated, and Vitest is used for testing. These are the technologies the project is built on; I'm not attributing a specific finished feature to each package beyond that.

## Project Status

Pancong POS is **in active development**. The UI and core POS flows are designed, and the responsive front-end is being implemented, with the MongoDB data layer still being integrated. It has not been released, is not commercially available, and has no live URL or production users yet.

## Outcomes & Learnings

As an in-development personal project, the outcomes are qualitative. A small, disciplined component set — once the stepper, menu card and price summary were right — made it quick to lay out the remaining screens and keep the desktop and mobile layouts consistent. Designing and building it myself also meant each interaction decision had to hold up in code, not just in a mockup, which kept the scope honest and the flows practical.

## Scope & Disclaimer

Pancong POS is a self-initiated project that is still under development, not a shipped commercial product. The store name, menu, prices and transactions shown are sample data. Features shown reflect the designed product scope; implementation is ongoing, and no production deployment, customers, or performance results are claimed.
