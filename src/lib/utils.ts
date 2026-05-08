import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes and handles conditional logic safely.
 * Usage: cn('text-red-500', isSelected && 'bg-blue-100')
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  
  /**
   * Formats numbers into a currency string (USD for fashion).
   */
  export function formatPrice(
    price: number | string,
    options: {
      currency?: 'USD' | 'EUR' | 'INR';
      notation?: Intl.NumberFormatOptions['notation'];
    } = {}
  ) {
    const { currency = 'USD', notation = 'standard' } = options;
  
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      notation,
      maximumFractionDigits: 2,
    }).format(numericPrice);
  }