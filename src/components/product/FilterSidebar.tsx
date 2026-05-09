"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const categories = ["all", "men", "women", "kids"];

const FilterSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  // Update search with a small debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchTerm) params.set("search", searchTerm);
      else params.delete("search");
      router.push(`/products?${params.toString()}`);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") params.delete("category");
    else params.set("category", category);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="space-y-10 sticky top-24">
      {/* Search Input */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Search</h3>
        <input
          type="text"
          placeholder="Keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border-b border-gray-300 py-2 focus:border-black outline-none transition-colors text-sm"
        />
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => handleCategoryChange(cat)}
                className={`text-sm uppercase tracking-tighter transition-colors ${
                  (searchParams.get("category") || "all") === cat
                    ? "font-black border-b-2 border-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;