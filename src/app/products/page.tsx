import ProductCard from "@/components/product/ProductCard";
import { fetchProducts } from "@/lib/data";
import FilterSidebar from "@/components/product/FilterSidebar";

interface ProductsPageProps {
  // searchParams is now a Promise in Next.js 15
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // UNWRAP the promise here
  const { category, search } = await searchParams;
  
  const allProducts = await fetchProducts();
  
  // Now use the unwrapped values (category, search) instead of searchParams.category
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = !category || product.category === category;
    const matchesSearch = !search || 
      product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-10">
        {category ? `${category} Collection` : "All Collections"}
      </h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <FilterSidebar />
        </aside>

        <div className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-gray-200">
              <p className="text-gray-500 uppercase tracking-widest font-bold">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}