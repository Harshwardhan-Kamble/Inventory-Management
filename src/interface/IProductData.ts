export default interface IProductData {
  name: string;
  description?: string;
  stock_quantity: number;
  low_stock_threshold?: number;
}