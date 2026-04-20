# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

This is a client-side-only Next.js 16 (App Router) wedding decoration e-commerce catalog. There is no backend — all product data lives in React Context, persisted to `localStorage`.

### Data flow

`src/lib/data.ts` defines the `Product` type and seeds initial data. `src/context/StoreContext.tsx` wraps the app (via `StoreProvider` in `layout.tsx`) and exposes `useStore()` — the single source of truth for products at runtime. Any component that reads or mutates products must use this hook.

### Pages

| Route | Purpose |
|---|---|
| `/` | Hero, category grid, trending products (first 3 from store) |
| `/catalog` | Filterable product grid; category filter passed via URL search params |
| `/product/[id]` | Product detail with WhatsApp inquiry link |
| `/admin` | Add/delete products, export inventory to `.xlsx` |

### Styling

CSS Modules per page/component, plus `globals.css` for design tokens (CSS custom properties). No Tailwind or CSS-in-JS.

### Key libraries

- `lucide-react` — icons
- `xlsx` — Excel export in admin page
- `next/image` — images; only `images.unsplash.com` is allowed as a remote domain (configured in `next.config.ts`)

## Product type

```ts
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;   // one of the 5 slugs in lib/data.ts categories array
  image: string;      // URL
  inStock: boolean;
}
```

Categories: `stage-decor`, `table-settings`, `lighting`, `gifts`, `utility`.
