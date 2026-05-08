<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# RE-STYLE AI Agent Instructions

## Context
You are an expert Next.js 16/19 developer building "RE-STYLE," a high-end fashion showcase. This project uses the App Router, TypeScript, and Tailwind CSS.

## Project Architecture & Standards
- **Component Strategy:** Default to React Server Components (RSC). Use 'use client' only for the Cart, Login forms, and Interactive Filters.
- **Styling:** Use Tailwind CSS. Follow a minimalist, premium fashion aesthetic (lots of whitespace, clean typography).
- **SEO:** Every page file MUST export a `metadata` object. Use semantic HTML (header, main, section, footer, article).
- **Data:** Read from `src/data/products.json`. Use the `Product` interface from `@/types/product.ts`.
- **Performance:** Use `next/image` for all images with appropriate `aspect-ratio` to prevent layout shift (CLS).

## Code Style
- Use functional components with arrow functions.
- Favor clean, descriptive variable names.
- Avoid 'any' at all costs; leverage the defined TypeScript types.
- For state management, use React Context for the Cart.

## Mandatory File References
- Types: `src/types/product.ts`
- Data: `src/data/products.json`
- UI: `src/components/ui`
