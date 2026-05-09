"use client"; // Required for useState

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Men", href: "/category/men" },
    { name: "Women", href: "/category/women" },
    { name: "Kids", href: "/category/kids" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-md shadow-sm border-b border-white/20">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-2xl font-black tracking-tighter text-gray-900 hover:opacity-70 transition"
        >
          RE-STYLE
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-sm font-bold uppercase tracking-widest">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-gray-600 hover:text-black transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="text-gray-700 hover:text-black focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={cn(
        "md:hidden bg-white/90 backdrop-blur-lg transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-60 border-b" : "max-h-0"
      )}>
        <ul className="flex flex-col items-center space-y-4 py-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-gray-700 hover:text-black"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;