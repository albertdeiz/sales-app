/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Product } from "@/interfaces/product.interfaces";

export const transformProduct = (product: any): Product => {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    sku: product.sku,
    codeEan: product.codeEan,
    codeDun: product.codeDun,
    available: product.available,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};
