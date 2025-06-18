/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Warehouse } from "@/interfaces/warehouse.interfaces";

export const warehouseTransform = (warehouse: any): Warehouse => {
  return {
    id: warehouse.id,
    location: warehouse.location,
    name: warehouse.name,
    posAllowed: warehouse.posAllowed,
    createdAt: warehouse.createdAt,
    updatedAt: warehouse.updatedAt,
  };
};
