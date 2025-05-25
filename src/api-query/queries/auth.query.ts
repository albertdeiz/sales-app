import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthContext } from '@/shared/hooks/use-auth-context';
import { getCurrentUser, login } from '@/api-query/api/auth/auth.api';
import { AUTH_KEY } from '@/api-query/keys/auth.key';

import type { UseMutationResult } from '@tanstack/react-query';
import type { AuthParams, LoginParams, LoginResponse } from '@/interfaces/auth.interfaces';

export const useAuthMutation = (): UseMutationResult<LoginResponse, Error, LoginParams> => {
  const queryClient = useQueryClient();
  const { login: loginUser } = useAuthContext();

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      loginUser(response);
      queryClient.invalidateQueries({ queryKey: AUTH_KEY });
    }
  });
};

export const useCurrentUserQuery = ({ accessToken }: AuthParams) => {
  return useQuery({
    queryKey: AUTH_KEY,
    queryFn: () => getCurrentUser({ accessToken }),
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
};
