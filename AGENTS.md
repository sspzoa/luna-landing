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
├── public/                    # Static assets (images, icons)
├── src/
│   ├── app/                   # App Router pages
│   │   ├── (routes)/
│   │   │   ├── page.tsx
│   │   │   ├── awards/page.tsx
│   │   │   ├── members/page.tsx
│   │   │   ├── projects/page.tsx
│   │   │   └── qna/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/            # React components
│   │   ├── common/
│   │   ├── home/
│   │   ├── layout/
│   │   └── awards/ / members/ / projects/ / qna/
│   └── lib/                   # Server-side data layer
│       ├── env.ts             # Runtime env validation
│       ├── notion.ts          # Notion API client
│       ├── notion-types.ts    # Notion response type helpers
│       ├── schemas.ts         # Zod schemas & inferred types
│       ├── types.ts           # Re-export of schema types
│       ├── utils.ts           # Shared utilities
│       ├── format.ts          # Display format helpers
│       ├── image-utils.ts     # Image helpers
│       └── luna-data.ts       # Server data fetching from Notion
├── biome.json                 # Biome lint/format configuration
├── next.config.ts             # Next.js config + security headers
├── package.json
└── tsconfig.json
```

---

## Data flow

1. **Environment validation** — `src/lib/env.ts` validates required env vars with Zod at startup.
2. **Notion client** — `src/lib/notion.ts` provides `notionRequest<T>`, a typed wrapper around `fetch`.
3. **Schema validation** — `src/lib/schemas.ts` defines Zod schemas for every content type.
4. **Server data fetching** — `src/lib/luna-data.ts` defines `fetchAwards`, `fetchQnA`, `fetchMembers`, `fetchProjects`, `fetchInformation`, and `getLunaData`.
5. **Server components** — Pages fetch data directly from `src/lib/luna-data` and render sections. Client components receive data via props.
6. **Error handling** — Pages wrap fetches in `try/catch` and render a fallback UI when data cannot be loaded.

### Required environment variables

- `NOTION_TOKEN` — Notion integration token.
- `AWARDS_DATABASE_ID`
- `QNA_DATABASE_ID`
- `MEMBERS_DATABASE_ID`
- `INFORMATION_DATABASE_ID`
- `PROJECTS_DATABASE_ID`

These are read by server-side code only. Database IDs fall back to the existing hard-coded values if env vars are not set, but prefer setting them explicitly.

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
