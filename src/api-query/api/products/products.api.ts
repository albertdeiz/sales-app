import { isAxiosError } from 'axios';
import { transformProduct } from './products.transform';
import { axios } from '@/lib/axios';
import { ApiError } from '@/lib/errors';

import type { Product } from '@/interfaces/product.interfaces';
import type { AuthParams } from '@/interfaces/auth.interfaces';

export type CreateProductParams = AuthParams & Partial<Product>;

export type UpdateProductParams = AuthParams & Partial<Product>;

export interface GetProductParams extends AuthParams {
  id: number;
}

export const getProducts = async ({ accessToken }: AuthParams): Promise<Product[]> => {
  try {
    const { data } = await axios.get('/v1/sales/products/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.products.map(transformProduct);
  } catch (error) {
    if (isAxiosError(error)) {
      throw ApiError.fromAxiosError(error);
    }
    throw new ApiError(500, 'An unexpected error occurred');
  }
};

export const createProduct = async (params: CreateProductParams): Promise<Product> => {
  const { accessToken, ...dataParams } = params;
  console.log(Number(dataParams.price));

  try {
    const { data } = await axios.post('/v1/sales/products/', { ...dataParams, ...(dataParams.price ? { price: Number(dataParams.price) } : {}) }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return transformProduct(data);
  } catch (error) {
    if (isAxiosError(error)) {
      throw ApiError.fromAxiosError(error);
    }

    throw new ApiError(500, 'An unexpected error occurred');
  }
};

export const updateProduct = async (params: UpdateProductParams): Promise<Product> => {
  const { id, accessToken, ...dataParams } = params;

  try {
    const { data } = await axios.patch(`/v1/sales/products/${id}`, { ...dataParams, ...(dataParams.price ? { price: Number(dataParams.price) } : {}) }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return transformProduct(data);
  } catch (error) {
    if (isAxiosError(error)) {
      throw ApiError.fromAxiosError(error);
    }

    throw new ApiError(500, 'An unexpected error occurred');
  }
};

export const deleteProduct = async ({ id, accessToken }: { id: number } & AuthParams): Promise<void> => {
  if (!id) {
    throw new ApiError(400, 'Product ID is required for deletion');
  }

  try {
    await axios.delete(`/v1/sales/products/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    if (isAxiosError(error)) {
      throw ApiError.fromAxiosError(error);
    }

    throw new ApiError(500, 'An unexpected error occurred');
  }
};

export const getProduct = async ({ id, accessToken }: GetProductParams): Promise<Product> => {
  try {
    const { data } = await axios.get(`/v1/sales/products/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return transformProduct(data.products[0]);
  } catch (error) {
    if (isAxiosError(error)) {
      throw ApiError.fromAxiosError(error);
    }

    throw new ApiError(500, 'An unexpected error occurred');
  }
};
