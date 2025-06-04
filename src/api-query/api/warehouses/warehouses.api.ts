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

export interface GetWarehouseParams extends AuthParams {
  id: number;
}

export const getWarehouses = async (params: ListWarehousesParams): Promise<Warehouse[]> => {
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

export const getWarehouse = async ({ id, accessToken }: GetWarehouseParams): Promise<Warehouse> => {
  try {
    const { data: { warehouses } } = await axios.get(`/v1/sales/warehouse/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return warehouseTransform(warehouses[0]);
  } catch (error) {
    if (isAxiosError(error)) {
      throw ApiError.fromAxiosError(error);
    }

    throw new ApiError(500, 'An unexpected error occurred');
  }
};

export const updateWarehouse = async (params: Partial<Warehouse> & AuthParams): Promise<Warehouse> => {
  const { id, accessToken, ...dataParams } = params;

  if (!id) {
    throw new ApiError(400, 'Warehouse ID is required for update');
  }

  try {
    const { data } = await axios.patch(`/v1/sales/warehouse/update/${id}`, dataParams, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return warehouseTransform(data);
  } catch (error) {
    if (isAxiosError(error)) {
      throw ApiError.fromAxiosError(error);
    }

    throw new ApiError(500, 'An unexpected error occurred');
  }
};

export const createWarehouse = async (params: Partial<Warehouse> & AuthParams): Promise<Warehouse> => {
  const { accessToken, ...dataParams } = params;

  try {
    const { data } = await axios.post('/v1/sales/warehouse/create', dataParams, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return warehouseTransform(data);
  } catch (error) {
    if (isAxiosError(error)) {
      throw ApiError.fromAxiosError(error);
    }

    throw new ApiError(500, 'An unexpected error occurred');
  }
};

export const deleteWarehouse = async ({ id, accessToken }: { id: number; } & AuthParams): Promise<void> => {
  if (!id) {
    throw new ApiError(400, 'Warehouse ID is required for deletion');
  }

  try {
    await axios.delete(`/v1/sales/warehouse/${id}`, {
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
