import { useMutation, useQuery } from "@tanstack/react-query";

import { useAuthContext } from "@/shared/hooks/use-auth-context";
import { getCurrentUser, login, refreshToken } from "@/api-query/api/auth/auth.api";
import { AUTH_KEY } from "@/api-query/keys/auth.key";

import type { UseMutationResult } from "@tanstack/react-query";
import type { AuthParams, LoginParams, LoginResponse } from "@/interfaces/auth.interfaces";

export const useAuthMutation = (): UseMutationResult<LoginResponse, Error, LoginParams> => {
  const { login: loginUser } = useAuthContext();

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      loginUser(response);
    },
  });
};

export const useCurrentUserQuery = ({ accessToken }: AuthParams) => {
  return useQuery({
    queryKey: AUTH_KEY,
    queryFn: () => getCurrentUser({ accessToken }),
    retry: 0,
  });
};

export const useRefreshTokenMutation = (): UseMutationResult<LoginResponse, Error, number> => {
  const { accessToken, login: loginUser } = useAuthContext();

  return useMutation({
    mutationFn: (workspaceId: number) => refreshToken({ workspaceId, accessToken }),
    onSuccess: (response) => {
      loginUser(response);
    },
  });
};
