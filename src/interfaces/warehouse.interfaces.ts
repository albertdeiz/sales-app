export interface Product {
  id: number;
  name: string;
  price: number;
  sku: string;
  codeEan: string;
  codeDun: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface Warehouse {
  id: number;
  location: string;
  name: string;
  postAllowed: boolean;
  createdAt: string;
  updatedAt: string;
};
