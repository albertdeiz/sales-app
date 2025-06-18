import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthContext } from "@/shared/hooks/use-auth-context";
import { createReception } from "@/api-query/api/receptions/receptions.api";
import { RECEPTIONS_KEY } from "@/api-query/keys/receptions";

import type { UseMutationResult } from "@tanstack/react-query";
import type { Reception } from "@/interfaces/reception.interfaces";
import type { CreateReceptionPayload } from "@/api-query/api/receptions/receptions.api";
import type { ApiError } from "@/lib/errors";

export const useCreateReceptionMutation = (): UseMutationResult<
  Reception,
  ApiError,
  CreateReceptionPayload
> => {
  const { accessToken } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReceptionPayload) =>
      createReception({
        payload,
        accessToken,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: RECEPTIONS_KEY,
      });
    },
  });
};
