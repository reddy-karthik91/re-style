"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CheckoutView = "choice" | "login" | "form";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user, isGuest, login } = useAuth();
  const router = useRouter();

  const [view, setView] = useState<CheckoutView>("choice");
  const [isOrdered, setIsOrdered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // EFFECT: If user logs out (becomes guest), reset form fields and view
  useEffect(() => {
    if (isGuest) {
      setEmail("");
      setPassword("");
      setError("");
    }
  }, [isGuest]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await login(email, password);
      // view logic is handled by context change; form will render below
    } catch (err: any) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    clearCart();
    setTimeout(() => router.push("/"), 5000);
  };

  const handleBackToChoice = () => {
    setView("choice");
    setEmail("");
    setPassword("");
    setError("");
  };

  // 1. SUCCESS VIEW
  if (isOrdered) {
    return (
      <div className="container mx-auto px-6 py-32 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="h-20 w-20 bg-black text-white rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Order Confirmed</h1>
          <p className="text-neutral-500 uppercase tracking-widest text-[11px] font-bold">Thank you for your purchase.</p>
        </div>
        <Link href="/" className="bg-black text-white px-12 py-4 text-[11px] font-bold uppercase tracking-[0.2em]">Return Home</Link>
        <p className="text-[9px] text-neutral-400 uppercase tracking-widest animate-pulse mt-4">Redirecting in 5s...</p>
      </div>
    );
  }

  // 2. EMPTY STATE
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-6 py-32 text-center space-y-6">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Your bag is empty</h1>
        <Link href="/products" className="inline-block bg-black text-white px-10 py-4 text-[11px] font-bold uppercase tracking-widest">Browse Collection</Link>
      </div>
    );
  }

  // 3. AUTH GATE: INITIAL CHOICE
  if (isGuest && view === "choice") {
    return (
      <div className="container mx-auto px-6 py-32 max-w-md text-center space-y-12 animate-in fade-in duration-500">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Checkout</h1>
        <div className="grid gap-4">
          <button onClick={() => setView("form")} className="w-full bg-black text-white py-6 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all">
            Checkout as Guest
          </button>
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-neutral-100"></span></div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-neutral-300 bg-white px-4">Or</div>
          </div>
          <button onClick={() => setView("login")} className="w-full border border-neutral-200 py-6 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-neutral-50 transition-all">
            Login to Account
          </button>
        </div>
      </div>
    );
  }

  // 4. AUTH GATE: LOGIN FORM
  if (isGuest && view === "login") {
    return (
      <div className="container mx-auto px-6 py-32 max-w-sm space-y-8 animate-in slide-in-from-bottom-4 duration-500">
        <button onClick={handleBackToChoice} className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black transition-colors">← Back</button>
        <h2 className="text-3xl font-black uppercase tracking-tighter">Login</h2>
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <div className="space-y-4">
            <input 
              type="email" placeholder="Email" required autoComplete="off"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b py-3 text-sm outline-none focus:border-black transition-colors" 
            />
            <input 
              type="password" placeholder="Password" required autoComplete="off"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b py-3 text-sm outline-none focus:border-black transition-colors" 
            />
          </div>
          {error && <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest">{error}</p>}
          <button disabled={isLoading} className="w-full bg-black text-white py-5 text-[11px] font-bold uppercase tracking-[0.2em] disabled:bg-neutral-400 transition-all">
            {isLoading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    );
  }

  // 5. MAIN CHECKOUT FORM
  return (
    <div className="container mx-auto px-6 py-12 lg:py-20 animate-in fade-in duration-700">
      <div className="mb-12 space-y-2">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Shipping</h1>
        {user && <p className="text-[10px] uppercase tracking-widest text-green-600 font-bold">Logged in as {user.name}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-12">
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] border-b pb-2 text-neutral-400">Delivery Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="First Name" required defaultValue={user?.name?.split(' ')[0] || ""} className="col-span-1 border-b py-3 text-sm focus:border-black outline-none transition-colors bg-transparent" />
              <input type="text" placeholder="Last Name" required className="col-span-1 border-b py-3 text-sm focus:border-black outline-none transition-colors bg-transparent" />
              <input type="email" placeholder="Email" required defaultValue={user?.email || ""} className="col-span-2 border-b py-3 text-sm focus:border-black outline-none transition-colors bg-transparent" />
              <input type="text" placeholder="Street Address" required className="col-span-2 border-b py-3 text-sm focus:border-black outline-none transition-colors bg-transparent" />
            </div>
          </section>

          <button type="submit" className="w-full bg-black text-white py-6 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-neutral-800 transition-all active:scale-[0.99]">
            Place Order • {formatPrice(cartTotal)}
          </button>
        </form>

        <aside className="lg:col-span-5">
          <div className="bg-neutral-50 p-8 sticky top-32 rounded-sm border border-neutral-100">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-neutral-400">Order Summary</h2>
            <div className="space-y-6 mb-8 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-20 w-16 bg-white border border-neutral-100 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-[11px] font-bold uppercase tracking-tight line-clamp-1">{item.name}</p>
                    <p className="text-[10px] text-neutral-400 mt-1 uppercase tracking-widest">Qty: {item.quantity}</p>
                    <p className="text-[11px] font-black mt-1">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-200 pt-6 space-y-4 text-[10px] uppercase tracking-[0.1em]">
              <div className="flex justify-between text-neutral-500"><span>Subtotal</span><span className="font-bold text-gray-900">{formatPrice(cartTotal)}</span></div>
              <div className="flex justify-between text-neutral-500"><span>Shipping</span><span className="font-bold text-green-600 tracking-tighter">FREE</span></div>
              <div className="flex justify-between border-t border-neutral-200 pt-4 items-baseline text-gray-900">
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Total</span>
                <span className="text-2xl font-black tracking-tighter">{formatPrice(cartTotal)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}