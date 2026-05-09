import Hero from '@/components/layout/Hero';
import ProductCard from '@/components/product/ProductCard';
import { fetchFeaturedProducts } from '@/lib/data';
import Link from 'next/link';

export default async function Home() {
  const featuredProducts = await fetchFeaturedProducts();

  return (
    <div className="space-y-20 pb-20">
      <Hero />

      {/* Featured Products Section */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase">
              Featured Collection
            </h2>
            <p className="text-gray-500 mt-2">
              Handpicked pieces for your seasonal wardrobe.
            </p>
          </div>
          <Link 
            href="/products" 
            className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:opacity-60 transition"
          >
            View All Products
          </Link>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}