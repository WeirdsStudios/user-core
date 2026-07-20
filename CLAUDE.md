@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Architecture

**Stack**: Next.js 16.2.10, React 19, TypeScript, Tailwind CSS v4, shadcn/ui (base-nova style), Supabase

### Tailwind CSS v4

Config is entirely CSS-based — there is **no** `tailwind.config.ts`. All theme tokens live in `app/globals.css` under `@theme inline { ... }` and `:root { ... }`. Colors use OKLCH color space. Dark mode uses the `.dark` class strategy.

### shadcn/ui — base-nova Style

Components use `@base-ui/react` as the primitive layer, **not** Radix UI. Add new components with `npx shadcn add <component>`.

Path aliases:
- `@/components` — shared components  
- `@/components/ui` — shadcn primitives  
- `@/lib` — utilities (`cn()` helper at `lib/utils.ts`)  
- `@/hooks` — React hooks

### Supabase

Use `@supabase/ssr` helpers for server-side auth in the App Router (server components, middleware, route handlers).
