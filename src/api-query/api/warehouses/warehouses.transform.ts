/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Product, Warehouse } from '@/interfaces/warehouse.interfaces';

export const warehouseTransform = (warehouse: any): Warehouse => {
  return {
    id: warehouse.id,
    location: warehouse.location,
    name: warehouse.name,
    postAllowed: warehouse.posAllowed,
    createdAt: warehouse.createdAt,
    updatedAt: warehouse.updatedAt,
  };
};

export const productTransform = (product: any): Product => {
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
