"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Destructure cart actions
  const { cartCount, setIsCartOpen, clearCart } = useCart();
  
  // Destructure auth state
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();      // Clears User Session
    clearCart();   // Clears the Bag immediately
    setIsOpen(false); // Closes mobile menu if open
  };

  const navLinks = [
    { name: "Men", href: "/products?category=men" },
    { name: "Women", href: "/products?category=women" },
    { name: "Kids", href: "/products?category=kids" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-md shadow-sm border-b border-white/20">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        
        {/* LEFT: Logo */}
        <Link 
          href="/" 
          className="text-2xl font-black tracking-tighter text-gray-900 hover:opacity-70 transition shrink-0"
        >
          RE-STYLE
        </Link>

        {/* CENTER: Desktop Links */}
        <ul className="hidden md:flex items-center space-x-8 text-[10px] font-bold uppercase tracking-[0.25em]">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="text-gray-500 hover:text-black transition-colors">
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/products" className="text-gray-300 hover:text-black transition-colors">
              All
            </Link>
          </li>
        </ul>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-5">
          
          {/* Auth State (Desktop Only) */}
          <div className="hidden md:flex items-center gap-4 border-r border-neutral-100 pr-5">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  Hi, {user.name.split(' ')[0]}
                </span>
                <button 
                  onClick={handleLogout}
                  className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/checkout" 
                className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Bag Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative group flex items-center gap-2"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] group-hover:opacity-60 transition">
              Bag
            </span>
            <div className="bg-black text-white text-[9px] h-5 w-5 rounded-full flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              {cartCount}
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-black focus:outline-none"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={cn(
        "md:hidden bg-white/95 backdrop-blur-xl transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-[500px] border-b" : "max-h-0"
      )}>
        <ul className="flex flex-col items-center space-y-5 py-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-gray-800 hover:text-black uppercase tracking-[0.2em]"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="w-full px-10"><div className="border-t border-neutral-100 w-full" /></li>
          
          {user ? (
            <li className="text-center space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 italic">Account: {user.email}</p>
              <button onClick={handleLogout} className="text-xs font-bold text-red-500 uppercase tracking-widest">Logout</button>
            </li>
          ) : (
            <li>
              <Link href="/checkout" onClick={() => setIsOpen(false)} className="text-xs font-bold uppercase tracking-widest">Sign In</Link>
            </li>
          )}
          
          <li className="pt-2">
            <button 
              onClick={() => { setIsOpen(false); setIsCartOpen(true); }}
              className="text-xs font-bold text-gray-800 uppercase tracking-[0.2em] bg-neutral-100 px-8 py-3 rounded-full hover:bg-black hover:text-white transition-all"
            >
              View Bag ({cartCount})
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;