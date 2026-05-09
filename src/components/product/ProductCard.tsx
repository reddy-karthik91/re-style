"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800";

const ProductCard = ({ product }: ProductCardProps) => {
  const [imgSrc, setImgSrc] = useState<string>(product.image);
  const [isLoading, setIsLoading] = useState(true);

  // Reset image source when the product changes (essential for client-side filtering)
  useEffect(() => {
    setImgSrc(product.image);
    setIsLoading(true);
  }, [product.image,String(product.id)]);

  return (
    <article className="group relative">
      <Link href={`/product/${product.id}`} className="block" aria-label={`View details for ${product.name}`}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-sm">
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            className={`
              object-cover transition-all duration-700 ease-in-out
              group-hover:scale-105
              ${isLoading ? "scale-105 blur-lg grayscale" : "scale-100 blur-0 grayscale-0"}
            `}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            onLoad={() => setIsLoading(false)}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            priority={product.isFeatured}
          />
          
          {/* Overlay Badges */}
          <div className="absolute top-3 left-3 pointer-events-none">
            {product.isFeatured && (
              <span className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 shadow-lg">
                New Arrival
              </span>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-4 flex flex-col gap-1">
          <div className="flex justify-between items-baseline gap-2">
            <h3 className="text-sm font-semibold text-primary truncate group-hover:text-neutral-600 transition-colors">
              {product.name}
            </h3>
            <span className="text-sm font-black whitespace-nowrap">
              {formatPrice(product.price)}
            </span>
          </div>
          
          <p className="text-[11px] text-muted-foreground uppercase tracking-[0.15em] font-medium">
            {product.category}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;