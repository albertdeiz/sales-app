import { useMutation, useQuery, useQueryClient, type UseMutationResult, type UseQueryResult } from '@tanstack/react-query';
import { createWarehouse, deleteWarehouse, getWarehouse, getWarehouses, updateWarehouse } from '../api/warehouses/warehouses.api';
import { useAuthContext } from '@/shared/hooks/use-auth-context';

import type { ListWarehousesParams } from '../api/warehouses/warehouses.api';
import type { ApiError } from '@/lib/errors';
import type { Warehouse } from '@/interfaces/warehouse.interfaces';

const WAREHOUSE_KEY = ['warehouses'];

export const useWarehousesQuery = (params: ListWarehousesParams = {}): UseQueryResult<Warehouse[], ApiError> => {
  const { accessToken } = useAuthContext();

  return useQuery<Warehouse[], ApiError>({
    queryKey: [...WAREHOUSE_KEY, params],
    queryFn: () => getWarehouses({ ...params, accessToken }),
    staleTime: 1000 * 60 * 5,
  });
};

export const useWarehouseQuery = (id = 0): UseQueryResult<Warehouse, ApiError> => {
  const { accessToken } = useAuthContext();

  return useQuery<Warehouse, ApiError>({
    queryKey: [...WAREHOUSE_KEY, 'details', id],
    queryFn: () => getWarehouse({ id, accessToken }),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};

export const useUpdateWarehouseMutation = (): UseMutationResult<Warehouse, ApiError, Partial<Warehouse>> => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthContext();

  const params = {};

  return useMutation<Warehouse, ApiError, Partial<Warehouse>>({
    mutationFn: (warehouse) => updateWarehouse({ ...warehouse, accessToken }),
    onSuccess: (data) => {
      queryClient.setQueryData<Warehouse[]>([...WAREHOUSE_KEY, params], (oldData) => {
        if (!oldData) return [data];

        return oldData.map((item) => (item.id === data.id ? data : item));
      });

      queryClient.setQueryData<Warehouse>([...WAREHOUSE_KEY, 'details', data.id], data);
    },
  });
};

export const useCreateWarehouseMutation = (): UseMutationResult<Warehouse, ApiError, Partial<Warehouse>> => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthContext();

  const params = {};

  return useMutation<Warehouse, ApiError, Partial<Warehouse>>({
    mutationFn: (warehouse) => createWarehouse({ ...warehouse, accessToken }),
    onSuccess: (data) => {
      queryClient.setQueryData<Warehouse[]>([...WAREHOUSE_KEY, params], (oldData) => {
        if (!oldData) return [data];

        return [...oldData, data];
      });

      queryClient.setQueryData<Warehouse>([...WAREHOUSE_KEY, 'details', data.id], data);
    },
  });
};

export const useDeleteWarehouseMutation = (): UseMutationResult<void, ApiError, number> => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthContext();

  const params = {};

  return useMutation<void, ApiError, number>({
    mutationFn: (id) => deleteWarehouse({ id, accessToken }),
    onSuccess: (_, id) => {
      queryClient.setQueryData<Warehouse[]>([...WAREHOUSE_KEY, params], (oldData) => {
        if (!oldData) return [];

        return oldData.filter((item) => item.id !== id);
      });
    },
  });
};
