export interface Cart {
  id: number;
  buyerId: string;
  items: CartItem[];
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  brand: string;
  quantity: number;
  category: string;
}
