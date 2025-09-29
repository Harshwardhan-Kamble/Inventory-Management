import { Product } from "@prisma/client";
import IProductData from "../interface/IProductData";

export interface IProductService {
  createProducts(data: IProductData[]): Promise<Product[]>;
  createProduct(data: IProductData): Promise<Product>;
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | null>;
  updateProduct(id: number, data: Partial<Product>): Promise<Product | null>;
  deleteProduct(id: number): Promise<Product | null>;
  increaseStock(id: number, quantity: number): Promise<Product>;
  decreaseStock(id: number, quantity: number): Promise<Product>;
  getLowStockProducts(): Promise<Product[]>;
}
