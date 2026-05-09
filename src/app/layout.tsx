import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// RE-STYLE Branding & SEO Metadata
export const metadata: Metadata = {
  title: {
    default: "RE-STYLE | Modern Fashion Storefront",
    template: "%s | RE-STYLE",
  },
  description: "Discover premium fashion for Men, Women, and Kids. High-performance, trend-setting apparel at RE-STYLE.",
  keywords: ["fashion", "ecommerce", "clothing", "RE-STYLE"],
  openGraph: {
    title: "RE-STYLE Fashion",
    description: "Modern Fashion for All",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <AuthProvider>
        <CartProvider>
        {/* Navigation remains fixed/sticky as defined in component */}
        <Navbar />

        {/* CartDrawer is now globally accessible and will 
        render conditionally based on context state */}
        <CartDrawer />

        {/* 
            Main content wrapper 
            pt-16 accounts for the Navbar height so content isn't hidden 
        */}
        <main className="flex-grow pt-16">
          {children}
        </main>

        <Footer />
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
