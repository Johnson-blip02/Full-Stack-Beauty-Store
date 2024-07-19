export interface Product {
  id: number;
  name: string;
  price: number;
  pictureUrl: string;
  brand: string;
  stockQuantity?: number;
  category?: string;
}

export interface ProductParams {
  orderBy: string;
  searchTerm?: string;
  brands?: string[];
  category?: string[];
  pageNum: number;
  pageSize: number;
}
