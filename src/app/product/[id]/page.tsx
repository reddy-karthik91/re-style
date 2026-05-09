import { fetchProductById } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // 1. Unwrap the dynamic route params
  const { id } = await params;
  const product = await fetchProductById(id);

  // 2. Handle non-existent products
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* LEFT: Image Section (7 columns wide on desktop) */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[3/4] w-full bg-neutral-100 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority // LCP Optimization: Load this immediately
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
        </div>

        {/* RIGHT: Product Info (5 columns wide on desktop) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="space-y-6">
            {/* Breadcrumbs / Category */}
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold">
              Home / {product.category} / {product.name}
            </p>

            {/* Title & Price */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9]">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-neutral-900">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Description */}
            <div className="border-t border-neutral-100 pt-6">
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3">Details</h3>
              <p className="text-neutral-600 leading-relaxed max-w-md text-sm">
                {product.description}
              </p>
            </div>

            {/* Size Selection (Visual Mockup) */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                <span>Select Size</span>
                <button className="text-neutral-400 underline decoration-neutral-200 underline-offset-4 hover:text-black transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button 
                    key={size}
                    className="border border-neutral-200 py-3 text-xs font-bold uppercase hover:border-black hover:bg-neutral-50 transition-all"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-6">
              <button className="w-full bg-black text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all transform active:scale-[0.99]">
                Add to Bag
              </button>
              <button className="w-full border border-neutral-200 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-50 transition-all">
                Add to Wishlist
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 grid grid-cols-2 gap-4 border-t border-neutral-100 mt-8">
              <div className="text-[9px] uppercase tracking-widest text-neutral-400 text-center border-r border-neutral-100">
                Free Express <br/> Shipping
              </div>
              <div className="text-[9px] uppercase tracking-widest text-neutral-400 text-center">
                30-Day Free <br/> Returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}