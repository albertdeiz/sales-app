import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getWarehouses } from '../api/warehouses/warehouses.api';
import type { ListWarehousesParams } from '../api/warehouses/warehouses.api';
import type { ApiError } from '@/lib/errors';
import type { Warehouse } from '@/interfaces/warehouse.interfaces';
import { useAuthContext } from '@/shared/hooks/use-auth-context';

export const useWarehousesQuery = (params?: ListWarehousesParams): UseQueryResult<Warehouse[], ApiError> => {
  const { accessToken } = useAuthContext();

  return useQuery<Warehouse[], ApiError>({
    queryKey: ['warehouses', params],
    queryFn: () => getWarehouses({ ...params, accessToken }),
    staleTime: 1000 * 60 * 5,
  });
};
