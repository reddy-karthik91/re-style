export type Category = "men" | "women" | "kids";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  isFeatured: boolean;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}