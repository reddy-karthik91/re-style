import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes and handles conditional logic safely.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats numbers into a currency string (Localized for India).
 */
export function formatPrice(
  price: number | string,
  options: {
    currency?: "INR" | "USD" | "EUR";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  // Default to INR and standard notation
  const { currency = "INR", notation = "standard" } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    notation,
    // Setting to 0 for a cleaner look (e.g., ₹2,499 instead of ₹2,499.00)
    maximumFractionDigits: 0, 
  }).format(numericPrice);
}