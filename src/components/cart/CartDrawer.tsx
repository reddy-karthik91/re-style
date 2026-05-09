"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  // Pull state directly from Context instead of props
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();

  // If it's not open, return null
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={() => setIsCartOpen(false)} 
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-black uppercase tracking-tighter">Your Bag</h2>
          <button 
            onClick={() => setIsCartOpen(false)} 
            className="text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-50 transition"
          >
            Close
          </button>
        </div>

        {/* ... (rest of your cart item mapping code) ... */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
               <p className="text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Your bag is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-neutral-50 pb-6">
                {/* Product details here */}
                <div className="relative h-24 w-20 bg-neutral-100 flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[11px] font-bold uppercase truncate">{item.name}</h3>
                    <p className="text-sm font-black mt-1">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex border border-neutral-200 text-xs">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1">-</button>
                        <span className="px-3 py-1 font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1">+</button>
                     </div>
                     <button onClick={() => removeFromCart(item.id)} className="text-[9px] font-bold uppercase text-red-500">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
  <div className="p-6 border-t border-neutral-100 bg-white space-y-4">
    {/* Price Breakdown */}
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
          Subtotal
        </span>
        <span className="text-xl font-black text-neutral-900">
          {formatPrice(cartTotal)}
        </span>
      </div>
      <p className="text-[9px] text-neutral-400 uppercase tracking-widest leading-relaxed">
        Shipping and taxes calculated at checkout.
      </p>
    </div>

    {/* CTA Button */}
    <Link 
      href="/checkout"
      onClick={() => setIsCartOpen(false)}
      className="block w-full bg-black text-white py-5 text-[11px] font-bold uppercase tracking-[0.3em] text-center hover:bg-neutral-800 transition-all active:scale-[0.98]"
    >
      Proceed to Checkout
    </Link>

    {/* Secondary Link */}
    <button 
      onClick={() => setIsCartOpen(false)}
      className="w-full text-[9px] font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
    >
      Continue Shopping
    </button>
  </div>
)}
      </div>
    </div>
  );
}