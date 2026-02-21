# Architecture

## Directory Structure

```
app/
├── globals.css          # Tailwind v4 theme (CSS variables, dark/light, primary color)
├── layout.tsx           # Root layout: Inter font, ThemeProvider, site shell
├── page.tsx             # Homepage: hero banner, category filters, game grid
└── play/[slug]/
    └── page.tsx         # Play page: GamePlayer, GameAbout, GameStats, Play Next

components/
├── category-filter.tsx  # Client: horizontal scrollable filter pills with active state
├── game-about.tsx       # Server: "About the Game" description + TagBadge pills
├── game-card.tsx        # Game thumbnail card (next/image, hover overlay, tags, stats)
├── game-iframe.tsx      # Sandboxed iframe loading /games/<slug>/index.html
├── game-player.tsx      # Client: game stage (pre-game overlay/iframe) + utility toolbar
├── game-stats.tsx       # Server: stats card with placeholder data
├── hero-banner.tsx      # Featured "Game of the Day" banner with CTA
├── site-footer.tsx      # Footer: branding, explore/support links, newsletter
├── site-header.tsx      # Client: sticky header with logo, search, theme toggle, actions
├── site-sidebar.tsx     # Client: desktop sidebar nav with active-route highlighting
├── star-rating.tsx      # Atomic: star icon + numeric rating
├── tag-badge.tsx        # Atomic: small pill badge for game tags
└── theme-provider.tsx   # Client: dark/light theme context synced to cookie + localStorage

lib/
├── theme.ts             # Shared theme constants/resolver (cookie + storage keys)
└── games/
    └── registry.ts      # Static game catalogue (GameMeta interface + lookup functions)

public/
└── games/<slug>/        # Static game bundles (index.html + assets per game)
```

## Data Model

`GameMeta` in `lib/games/registry.ts`:

| Field         | Type       | Required | Purpose                                   |
|---------------|------------|----------|-------------------------------------------|
| `slug`        | `string`   | Yes      | URL segment and unique identifier         |
| `title`       | `string`   | Yes      | Display name                              |
| `description` | `string`   | Yes      | SEO description and card text             |
| `addedAt`     | `string`   | Yes      | ISO-8601 date for sorting                 |
| `ogImage`     | `string`   | No       | Path to OG image relative to `/public`    |
| `tags`        | `string[]` | No       | Genre tags shown as badges on cards       |
| `thumbnail`   | `string`   | No       | URL or path for card/hero thumbnail       |
| `playCount`   | `string`   | No       | Human-readable play count (e.g. "1.2M")   |
| `rating`      | `number`   | No       | Star rating out of 5                      |
| `badge`       | `string`   | No       | Highlight label (e.g. "HOT", "NEW")       |

Lookup functions: `getGameBySlug()` (O(1) via Map), `getAllGames()`, `getAllSlugs()`.

## Layout & Routing

The root layout (`app/layout.tsx`) renders a persistent site shell:

```
ThemeProvider
└── SiteHeader    (sticky, top)
└── flex container (max-w-[1600px])
    ├── SiteSidebar  (hidden below lg breakpoint)
    └── <main>       (page content via {children})
└── SiteFooter
```

- **Homepage** (`/`): Renders HeroBanner, CategoryFilter, game card grid, and "Load More" section inside `<main>`.
- **Play page** (`/play/[slug]`): Full game experience inside `<main>`. Sections: `GamePlayer` (stage with pre-game overlay + iframe, toolbar with fullscreen), `GameAbout` (description + tags), `GameStats` (placeholder stats card), and a "Play Next" horizontal carousel of `GameCard` components. SEO metadata via `generateMetadata`, static paths via `generateStaticParams`. If the slug is unknown, the page shows a dedicated "Game unavailable" state. If the slug exists but `/public/games/<slug>/index.html` is missing, the page still renders and the `GamePlayer` displays an unavailable message after the user clicks Start.

## Theming

- CSS variables in `globals.css` define `--background`, `--foreground`, `--primary` for both light and dark modes.
- The `.dark` class on `<html>` activates dark-mode values.
- `app/layout.tsx` resolves initial theme on the server from the `gp-theme` cookie and applies it to `<html>` before paint.
- `ThemeProvider` (`components/theme-provider.tsx`) manages theme state via React context, prioritizes cookie state, and only falls back to `localStorage` when cookie data is missing (legacy migration path).
- `SiteHeader` exposes a sun/moon toggle button via the `useTheme()` hook.

## Component Responsibilities

| Component         | Type   | Key Behavior                                                   |
|-------------------|--------|----------------------------------------------------------------|
| `SiteHeader`      | Client | Logo, search bar (hidden < md), theme toggle, action icons     |
| `SiteSidebar`     | Client | Desktop nav with `usePathname()` active highlighting           |
| `SiteFooter`      | Server | Static footer with links grid and newsletter input             |
| `HeroBanner`      | Server | Featured game with gradient overlay, "Play Now" CTA link       |
| `CategoryFilter`  | Client | Scrollable pill buttons with internal active state             |
| `GameCard`        | Server | Links to `/play/{slug}`, next/image thumbnail, hover effects   |
| `TagBadge`        | Server | Atomic purple pill badge                                       |
| `StarRating`      | Server | Atomic star icon + rating number                               |
| `ThemeProvider`   | Client | Context provider wrapping the app for dark/light toggle        |
| `GamePlayer`      | Client | Pre-game overlay/iframe stage + toolbar (fullscreen toggle)    |
| `GameAbout`       | Server | "About the Game" section with description and TagBadge pills   |
| `GameStats`       | Server | Stats card with placeholder data and achievement progress bar  |
| `GameIframe`      | Client | Sandboxed iframe with `allow-scripts allow-same-origin`        |

## Security

- Game iframes use `sandbox="allow-scripts allow-same-origin"` (no popups, forms, or top-navigation).
- `/play/:slug*` routes set `X-Frame-Options: SAMEORIGIN` and CSP `frame-ancestors 'self'`.
- `/games/:path*` static assets are cached with `Cache-Control: public, max-age=31536000, immutable`.
- External images from `lh3.googleusercontent.com` are allowed via `next.config.ts` `images.remotePatterns`.

## Tech Stack

- Next.js 16.1.6 (App Router, Turbopack)
- React 19.2.3
- Tailwind CSS v4 (PostCSS plugin, CSS-based config via `@theme inline`)
- TypeScript (strict mode)
- lucide-react (tree-shakeable icons)
- Inter font via `next/font/google`
