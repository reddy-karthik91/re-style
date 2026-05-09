import { Suspense } from "react";
import ProductCard from "@/components/product/ProductCard";
import { fetchProducts } from "@/lib/data";
import FilterSidebar from "@/components/product/FilterSidebar";
import { Product } from "@/types/product";
import { Metadata } from "next";

// Next.js 15: Static Metadata for SEO and Social Sharing
export const metadata: Metadata = {
  title: "Shop All Collections",
  description:
    "Explore the RE-STYLE archive. Premium, sustainably sourced apparel for Men, Women, and Kids. Discover timeless essentials designed for the modern wardrobe.",
  keywords: [
    "shop fashion",
    "minimalist clothing",
    "sustainable apparel",
    "modern essentials",
  ],
  openGraph: {
    title: "Shop Collections | RE-STYLE",
    description: "Curated modern essentials for Men, Women, and Kids.",
    type: "website",
  },
};

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

/**
 * LOADING SKELETON
 * Displays while the data is being filtered/fetched to prevent layout shift.
 */
function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse space-y-4">
          <div className="bg-neutral-100 aspect-[3/4] w-full rounded-sm" />
          <div className="h-3 bg-neutral-100 w-2/3 rounded" />
          <div className="h-3 bg-neutral-100 w-1/4 rounded" />
        </div>
      ))}
    </div>
  );
}

/**
 * FILTERED PRODUCT GRID
 * This is the "Data Worker" component.
 */
async function ProductGrid({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  // 1. Explicitly type the data fetch
  const allProducts: Product[] = await fetchProducts();

  // 2. Perform the filtering logic
  const filteredProducts = allProducts.filter((product: Product) => {
    const matchesCategory =
      !category || product.category.toLowerCase() === category.toLowerCase();
    const matchesSearch =
      !search || product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 3. Handle Empty States
  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-32 border border-neutral-100 bg-neutral-50/50 rounded-sm">
        <p className="text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-bold">
          No items match your selection.
        </p>
      </div>
    );
  }

  // 4. Render the Result Grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10 animate-in fade-in duration-700">
      {filteredProducts.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

/**
 * MAIN PAGE COMPONENT
 */
export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  // Next.js 15: Unwrap searchParams promise
  const { category, search } = await searchParams;

  return (
    <main className="container mx-auto px-6 py-12 lg:py-20 min-h-screen">
      {/* Header Section */}
      <header className="mb-16 space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">
          Collection Archive
        </p>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
          {category ? category : "All Items"}
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* SIDEBAR: Sticky positioning keeps filters accessible during scroll */}
        <aside className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-32 h-fit">
          <FilterSidebar />
        </aside>

        {/* PRODUCT SECTION: Wrapped in Suspense for a fast perceived load speed */}
        <section className="flex-grow">
          <Suspense
            key={`${category}-${search}`}
            fallback={<ProductGridSkeleton />}
          >
            <ProductGrid category={category} search={search} />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
