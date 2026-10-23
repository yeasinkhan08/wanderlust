<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlust

Single Next.js 16 app (App Router, `src/app/`), created with `create-next-app` + shadcn. No tests, no CI, no monorepo — the only verification steps are `npm run lint` (bare `eslint`) and `npx tsc --noEmit` (no `typecheck` script exists). Package manager is **npm** (`package-lock.json`); do not use pnpm/yarn.

## Stack quirks (verify against `node_modules/next/dist/docs/` — this Next version is newer than your training data)

- **Next 16.4.2** with `cacheComponents: true`, `partialPrefetching: true`, and **React Compiler** enabled (`babel-plugin-react-compiler`). Compiler rules apply: no `React.memo`, no manual `useMemo`/`useCallback` for performance, and code must pass rules-of-hooks/refs checks or the build fails.
- **Tailwind CSS v4, CSS-first**: no `tailwind.config.*`. Theme lives in `src/app/globals.css`; CSS is loaded via the `@tailwindcss/turbopack` rule in `next.config.ts`. Don't add a JS config file or the legacy `@tailwindcss/postcss` setup.
- **shadcn uses `@base-ui/react` (not Radix)** — style is `base-nova`. When hand-writing UI primitives or shadcn components copied from tutorials, import from `@base-ui/react`. `npx shadcn add <component>` works (config in `components.json`).
- Path alias: `@/*` → `src/*`. Structure: `src/app`, `src/components/ui`, `src/hooks`, `src/lib` (`utils.ts` exports `cn`).
