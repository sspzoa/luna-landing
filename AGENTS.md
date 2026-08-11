# Agent Guide for luna-landing

This document is written for AI coding agents working on this project.

---

## Project overview

`luna-landing` is the public landing website for LUNA, an IT social-venture club at Korea Digital Media High School.

Routes:

- `/` — Home page (intro, projects ticker, contests, future, made-by)
- `/awards` — Award records by year
- `/members` — Members by generation
- `/projects` — Projects by year
- `/qna` — Frequently asked questions accordion

All dynamic content is fetched from Notion data sources at request time on the server.

---

## Technology stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI library | React 19 |
| Styling | Tailwind CSS v4 |
| Validation | Zod |
| Icons | `lucide-react` |
| Data source | Notion API v1 (data sources) |
| Analytics | `@vercel/analytics`, `@vercel/speed-insights` |
| Lint / format | Biome |
| Package manager | Bun (`bun.lock`) |

Removed from earlier versions:

- Jotai
- TanStack Query (React Query)
- Client-facing API routes

---

## Project structure

```
.
├── public/
├── src/
│   ├── app/                   # Routes + metadata only
│   │   ├── page.tsx
│   │   ├── awards|members|projects|qna/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── manifest.ts / robots.ts / sitemap.ts
│   ├── components/
│   │   ├── common/            # Container, Section, Hero, FilterChips, FadeIn…
│   │   ├── layout/            # Navbar, Footer, ScalingLayout
│   │   ├── home/ awards/ members/ projects/ qna/
│   ├── constants/             # nav config
│   └── lib/                   # data + utils
│       ├── luna-data.ts       # cached Notion fetchers
│       ├── notion.ts + notion/mappers.ts
│       ├── schemas.ts / types.ts / seo.ts / format.ts
│       └── cn.ts / collection.ts / utils.ts
├── biome.json
├── next.config.ts
└── package.json
```

---

## Data flow

1. **Environment validation** — `src/lib/env.ts` validates required env vars with Zod at startup.
2. **Notion client** — `src/lib/notion.ts` + property mappers in `src/lib/notion/mappers.ts`.
3. **Schema validation** — `src/lib/schemas.ts` defines Zod schemas for every content type.
4. **Server data fetching** — `src/lib/luna-data.ts` uses React `cache` (request dedupe) and `unstable_cache` (5m revalidate). Helpers: `getHomeData`, `getAwardsPageData`, `getLunaData`.
5. **Server components** — Pages fetch via `luna-data` and pass props to section components under `src/components/*`.
6. **Error handling** — Pages wrap fetches in `try/catch` and render `ErrorState`.

### Required environment variables

- `NOTION_TOKEN` — Notion integration token.

Notion database IDs are hard-coded in `src/lib/luna-data.ts`.

---

## Build commands

```bash
# Development server (Turbopack)
bun run dev

# Production build
bun run build

# Start production server
bun run start

# Lint / format with Biome
npx @biomejs/biome check ./src ./next.config.ts
```

---

## Code style

- Biome handles linting and formatting.
- Indentation: 2 spaces.
- Line width: 120 characters.
- Quotes: single quotes; JSX double quotes.
- Semicolons: always.
- Trailing commas: all.
- Keep pages as Server Components by default.
- Use client components only when browser APIs or local UI state are required.
