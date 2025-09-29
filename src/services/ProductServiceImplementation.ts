import IProductData from "../interface/IProductData";
import { prisma } from "../utils/prisma";
import { IProductService } from "./IProductService";
import { Prisma, Product } from "@prisma/client";

export class ProductServiceImpl implements IProductService {
  async createProducts(data: IProductData[]): Promise<Product[]> {
    return prisma.product.createManyAndReturn({ data });
  }

  async createProduct(data: {
    name: string;
    description?: string;
    stock_quantity: number;
    low_stock_threshold?: number;
  }): Promise<Product> {
    if (data.stock_quantity <= 0) {
      throw new Error("Amount must be positive");
    }
    return prisma.product.create({ data });
  }

  async getProducts(): Promise<Product[]> {
    return prisma.product.findMany();
  }

  async getProductById(id: number): Promise<Product | null> {
    try {
      return prisma.product.findUnique({ where: { id } });
    } catch (error: any) {
      if ((error as Prisma.PrismaClientKnownRequestError)?.code === 'P2025') {
        throw new Error("Product not found");
      }
      throw error;
    }
  }

  async updateProduct(
    id: number,
    data: Partial<Product>
  ): Promise<Product | null> {
    try {
      return await prisma.product.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      if ((error as Prisma.PrismaClientKnownRequestError)?.code === 'P2025') {
        throw new Error("Product not found");
      }
      throw error;
    }
  }

  async deleteProduct(id: number): Promise<Product | null> {
    try {
      return await prisma.product.delete({ where: { id } });
    } catch (error: any) {
      if ((error as Prisma.PrismaClientKnownRequestError)?.code === 'P2025') {
        throw new Error("Product not found");
      }
      throw error;
    }
  }

  async increaseStock(id: number, quantity: number): Promise<Product> {
    if (quantity <= 0) {
      throw new Error("Amount must be positive");
    }

    try {
      return await prisma.product.update({
        where: { id },
        data: { stock_quantity: { increment: quantity } },
      });
    } catch (error: any) {
      if ((error as Prisma.PrismaClientKnownRequestError)?.code === 'P2025') {
        throw new Error("Product not found");
      }
      throw error;
    }
  }

  async decreaseStock(id: number, quantity: number): Promise<Product> {
    if (quantity <= 0) {
      throw new Error("Amount must be positive");
    }
    const product = await prisma.product.findUnique({where: {id}});

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stock_quantity < quantity) {
      throw new Error("Insufficient stock");
    }

    try {
      return await prisma.product.update({
        where: { id },
        data: { stock_quantity: { decrement: quantity } },
      });
    } catch (error: any) {
      throw error;
    }
  }

  async getLowStockProducts(): Promise<Product[]> {
    const products = await prisma.product.findMany();
    return products.filter(
      (p) =>
        p.low_stock_threshold !== null &&
        p.stock_quantity <= p.low_stock_threshold
    );
  }
}
