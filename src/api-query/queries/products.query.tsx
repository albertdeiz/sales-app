import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuthContext } from "@/shared/hooks/use-auth-context";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../api/products/products.api";
import { PRODUCT_KEY } from "../keys/product.key";

import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { Product } from "@/interfaces/product.interfaces";
import type { ApiError } from "@/lib/errors";

export const useProductsQuery = (): UseQueryResult<Product[], ApiError> => {
  const { accessToken } = useAuthContext();

  return useQuery<Product[], ApiError>({
    queryKey: PRODUCT_KEY,
    queryFn: () => getProducts({ accessToken }),
    staleTime: 1000 * 60 * 5,
  });
};

export const useProductQuery = (id = 0): UseQueryResult<Product, ApiError> => {
  const { accessToken } = useAuthContext();

  return useQuery<Product, ApiError>({
    queryKey: [...PRODUCT_KEY, "details", id],
    queryFn: () => getProduct({ id, accessToken }),
    enabled: !!id,
  });
};

export const useCreateProductMutation = (): UseMutationResult<Product, ApiError, Partial<Product>> => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthContext();

  return useMutation<Product, ApiError, Partial<Product>>({
    mutationFn: (product) => createProduct({ ...product, accessToken }),
    onSuccess: (data) => {
      queryClient.setQueryData<Product[]>(PRODUCT_KEY, (oldData) => {
        if (!oldData) return [data];

        return [...oldData, data];
      });

      queryClient.setQueryData<Product>([...PRODUCT_KEY, "details", data.id], data);
    },
  });
};

export const useUpdateProductMutation = (): UseMutationResult<Product, ApiError, Partial<Product>> => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthContext();

  return useMutation<Product, ApiError, Partial<Product>>({
    mutationFn: (product) => updateProduct({ ...product, accessToken }),
    onSuccess: (data) => {
      queryClient.setQueryData<Product[]>(PRODUCT_KEY, (oldData) => {
        if (!oldData) return [];
        return oldData.map((item) => (item.id === data.id ? data : item));
      });
      queryClient.setQueryData<Product>([...PRODUCT_KEY, "details", data.id], data);
    },
  });
};

export const useDeleteProductMutation = (): UseMutationResult<void, ApiError, number> => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthContext();

  return useMutation<void, ApiError, number>({
    mutationFn: (id) => deleteProduct({ id, accessToken }),
    onSuccess: (_, id) => {
      queryClient.setQueryData<Product[]>(PRODUCT_KEY, (oldData) => {
        if (!oldData) return [];
        return oldData.filter((item) => item.id !== id);
      });
    },
  });
};
