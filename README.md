# Shaadi Collection

A client-side wedding decoration e-commerce catalog built with Next.js 16 (App Router). Browse and inquire about stage decor, table settings, lighting, gifts, and utility items — no backend required.

## Features

- Browse products by category with URL-driven filters
- Product detail pages with WhatsApp inquiry links
- Admin panel to add/delete products and export inventory to `.xlsx`
- All product data persisted to `localStorage` via React Context

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |

## Pages

| Route | Description |
|---|---|
| `/` | Hero, category grid, trending products |
| `/catalog` | Filterable product grid (`?category=<slug>`) |
| `/product/[id]` | Product detail with WhatsApp inquiry |
| `/admin` | Add/delete products, export to Excel |
| `/about` | About page |
| `/contact` | Contact page |

## Product Categories

`stage-decor` · `table-settings` · `lighting` · `gifts` · `utility`

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** CSS Modules + CSS custom properties
- **Icons:** lucide-react
- **Excel export:** xlsx
- **Images:** next/image (Unsplash remote domain allowed)
- **Data:** React Context + localStorage (no backend)

## Project Structure

```
src/
├── app/            # Next.js App Router pages
│   ├── page.tsx    # Home
│   ├── catalog/    # Product catalog
│   ├── product/    # Product detail
│   ├── admin/      # Admin panel
│   ├── about/
│   └── contact/
├── components/     # Navbar, Footer
├── context/        # StoreContext — single source of truth for products
└── lib/
    └── data.ts     # Product type definition and seed data
```
