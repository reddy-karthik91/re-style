# RE-STYLE | High-Performance Fashion Storefront

RE-STYLE is a modern, public-facing e-commerce showcase built with **Next.js 16/19**, **TypeScript**, and **Tailwind CSS**. The project focuses on high performance, technical SEO, and modern AI-assisted development practices.

## Live Demo
[[Link to your Vercel Deployment](https://re-style-nu.vercel.app/)]

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS (Mobile-first design)
- **State Management:** React Context API (Cart & Auth)
- **Data:** Simulated Server-Side fetching from local JSON
- **Optimization:** React Compiler (Auto-memoization enabled)

## AI-Assisted Development
This project utilizes a "Senior-First" AI workflow. AI was not used to write basic logic, but rather to act as a productivity multiplier for:
- **Architectural Scaffolding:** Configured `AGENTS.md` to ensure AI agents followed strict Next.js Server Component patterns.
- **Data Engineering:** Automated the generation of type-safe mock data for 12+ fashion products.
- **SEO Optimization:** Leveraged AI for keyword-rich meta-description generation and OpenGraph strategy.
- **Code Review:** Used AI tools to audit accessibility (ARIA labels) and refactor components for better performance.

## Key Features & SEO Strategy
- **Category Routing:** Specialized navigation for **Men**, **Women**, and **Kids** utilizing URL Search Parameters for shareability and SEO indexing.
- **Performance Thinking:** 
  - Optimized images via `next/image` to ensure high Core Web Vitals (LCP).
  - Minimalist Tailwind implementation to reduce CSS bundle size.
- **Technical SEO:** 
  - Implementation of Next.js Metadata API with dynamic titles.
  - Semantic HTML5 structure (`<article>`, `<section>`, `<nav>`).

  ## Project Structure
- `src/app`: App Router logic and Server Components.
- `src/components`: Atomic design structure (UI, Layout, Product-specific).
- `src/lib`: Data fetching utilities and helper functions.
- `src/types`: Centralized TypeScript interfaces.


src/
├── app/            # App Router (Pages, Layouts, Metadata)
├── components/     # Atomic Design Components
│   ├── product/    # ProductCard, Grids, Filters
│   ├── cart/       # Shopping Bag
│   └── about/         # Contact Section
    └── layout/        # Navigation System (Footer, Navbar, Hero)
├── context/        # Global State Management
├── data/           # Mock Data or Static JSON
├── lib/            # Utilities (Price formatting, cn helper)
├── types/          # TypeScript Interfaces



## ⚙️ Development Setup
**Clone the repository:**
   ```bash
   git clone [https://github.com/reddy-karthik91/re-style.git]
   cd re-style

## Install Dependencies
npm install

## Run the development server
npm run dev

## Build for production
npm run build