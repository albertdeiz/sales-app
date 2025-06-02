import { axios } from '@/lib/axios';
import { warehouseTransform } from './warehouses.transform';
import { isAxiosError } from 'axios';
import { ApiError } from '@/lib/errors';

import type { Warehouse } from '@/interfaces/warehouse.interfaces';
import type { AuthParams } from '@/interfaces/auth.interfaces';

export interface ListWarehousesParams extends AuthParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
}

export const getWarehouses = async(params: ListWarehousesParams): Promise<Warehouse[]> => {
  const { page, pageSize, search, sort, accessToken } = params ?? {};

  const queryParams: Record<string, string | number | undefined> = {
    page,
    pageSize,
  };

  if (search) {
    queryParams.search = search;
  }

  if (sort) {
    queryParams.sort = sort;
  }
  try {
    const { data: { warehouses } } = await axios.get('/v1/sales/warehouse', {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return warehouses.map(warehouseTransform);
  } catch (error) {
    if (isAxiosError(error)) {
      throw ApiError.fromAxiosError(error);
    }

    throw new ApiError(500, 'An unexpected error occurred');
  }
};
