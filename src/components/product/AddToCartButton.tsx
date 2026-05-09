"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => addToCart(product)}
      className="w-full bg-black text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all active:scale-[0.99]"
    >
      Add to Bag
    </button>
  );
}