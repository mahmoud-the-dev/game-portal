# AGENTS

## Project Context

-   This is a Next.js (app router) game portal that hosts many independent web games.
-   Each game is a static bundle in `public/games/<slug>/` (typically `index.html` + assets).
-   The portal handles discovery/routing/metadata; the game runtime is decoupled in an iframe.
-   You will be working on the game portal, not the games themselves.

## Core Architecture

-   Root layout shell: `app/layout.tsx` (Inter font, ThemeProvider, SiteHeader, SiteSidebar, SiteFooter)
-   Homepage: `app/page.tsx` (HeroBanner, CategoryFilter, game grid)
-   Play route: `app/play/[slug]/page.tsx`
-   Game metadata registry: `lib/games/registry.ts`
-   Iframe wrapper: `components/game-iframe.tsx`
-   Theme system: `components/theme-provider.tsx` (dark/light toggle via `localStorage`)

Flow:

1. The root layout renders the site shell (header, sidebar, footer) around all pages.
2. The homepage reads all games from the registry and renders the discovery UI.
3. On `/play/[slug]`, the slug is resolved from the registry, SEO metadata is generated, and the game loads inside a sandboxed iframe.

For more details check ./ARCHITECTURE.md

## Security & Runtime Rules

-   Games are isolated in iframe with `sandbox="allow-scripts allow-same-origin"`.
-   _Currently_ we don't have a backend database for game progress (YAGNI). Games use browser `localStorage`.

## Code Documentation

As an AI agent operating in this repository, you must treat documentation as a strict requirement for the "Definition of Done" on any task. You are expected to maintain the highest standard of codebase clarity without over-documenting trivial logic.

**1. Documenting New Features**

-   **Action:** Upon completing any new feature, component, or system plumbing, you must immediately document it before considering the task finished.
-   **Inline Context:** Provide clear, concise inline comments for complex logic or specific workarounds. Focus on _why_ a decision was made, not just _what_ the code does.

**2. Updating Existing Code**

-   **Action:** If your task involves modifying, refactoring, or fixing existing code, you are strictly required to review and update the associated documentation in the same step.

As an AI agent operating in this repository, you must treat documentation as a strict requirement for the "Definition of Done" on any task. You are expected to maintain the highest standard of codebase clarity without over-documenting trivial logic.

**1. Documenting New Features**

-   **Action:** Upon completing any new feature, component, or system plumbing, you must immediately document it before considering the task finished.
-   **Inline Context:** Provide clear, concise inline comments for complex logic or specific workarounds. Focus on _why_ a decision was made, not just _what_ the code does.
