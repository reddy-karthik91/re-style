import { Product, Category } from "../types/product";

// Simulate fetching data from a local JSON file
import products from "../data/products.json";

// Simulate a network delay
const simulateNetworkDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch all products with a simulated network delay.
 * @returns {Promise<Product[]>} A promise that resolves to the list of products.
 */
export const fetchProducts = async (): Promise<Product[]> => {
  await simulateNetworkDelay(500); // Simulate 500ms delay
  return products as Product[];
};

/**
 * Fetch a product by its ID.
 * @param {number} id - The ID of the product to fetch.
 * @returns {Promise<Product | null>} A promise that resolves to the product or null if not found.
 */
export const fetchProductById = async (id: number): Promise<Product | null> => {
  const allProducts = await fetchProducts();
  return allProducts.find((product) => product.id === id) || null;
};

/**
 * Fetch products filtered by category.
 * @param {Category} category - The category to filter by.
 * @returns {Promise<Product[]>} A promise that resolves to the filtered list of products.
 */
export const fetchProductsByCategory = async (
  category: Category
): Promise<Product[]> => {
  const allProducts = await fetchProducts();
  return allProducts.filter((product) => product.category === category);
};

/**
 * Fetch featured products.
 * @returns {Promise<Product[]>} A promise that resolves to the list of featured products.
 */
export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  const allProducts = await fetchProducts();
  return allProducts.filter((product) => product.isFeatured);
};