"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number; // Added index to determine "Above the Fold" status
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800";

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [imgSrc, setImgSrc] = useState<string>(product.image);
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);

  // Determine if this specific card is likely above the fold (first 4 items)
  const isAboveTheFold = index < 4;

  useEffect(() => {
    setImgSrc(product.image);
    if (imageRef.current?.complete) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [product.image]);

  return (
    <article className="group relative">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 rounded-sm">
          
          {isLoading && (
            <div className="absolute inset-0 z-10 bg-neutral-200 animate-pulse" />
          )}

          <Image
            ref={imageRef}
            src={imgSrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setImgSrc(FALLBACK_IMAGE);
              setIsLoading(false);
            }}
            // FIX: Priority is the Next.js way to handle the LCP warning.
            // It replaces the need for loading="eager".
            priority={isAboveTheFold || product.isFeatured}
            className={cn(
              "object-cover transform-gpu transition-all duration-1000 ease-out",
              "group-hover:scale-105 group-hover:duration-700",
              isLoading ? "opacity-0" : "opacity-100"
            )}
          />
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <div className="flex justify-between items-baseline gap-2">
            <h3 className="text-sm font-semibold text-neutral-900 truncate transition-colors group-hover:text-neutral-500">
              {product.name}
            </h3>
            <span className="text-sm font-black whitespace-nowrap text-neutral-900">
              {formatPrice(product.price)}
            </span>
          </div>
          <p className="text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-bold">
            {product.category}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;