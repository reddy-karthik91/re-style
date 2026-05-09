import { fetchProductById } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/product/AddToCartButton";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* LEFT: Image Section */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[3/4] w-full bg-neutral-100 overflow-hidden rounded-sm">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="space-y-8">
            {/* Breadcrumbs / Category */}
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold">
              Home / {product.category} / {product.name}
            </p>

            {/* Title & Price */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9]">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-neutral-900">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Description Section */}
            <div className="border-t border-neutral-100 pt-8">
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Description</h3>
              <p className="text-neutral-600 leading-relaxed max-w-md text-sm">
                {product.description}
              </p>
            </div>

            {/* Availability Note */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">
                In Stock & Ready to Ship
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* <button className="w-full bg-black text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all transform active:scale-[0.99]">
                Add to Bag
              </button> */}
              <AddToCartButton product={product} />
            </div>

            {/* Shipping/Returns Minimalist Info */}
            <div className="pt-8 border-t border-neutral-100 flex justify-between text-[9px] uppercase tracking-widest text-neutral-400">
              <span>Standard Delivery (3-5 Days)</span>
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}