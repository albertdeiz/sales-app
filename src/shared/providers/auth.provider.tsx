import { useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "@/shared/contexts/auth.context";
import { useLocalStorageContext } from "@/shared/hooks/use-local-storage-context";
import { useCurrentUserQuery } from "@/api-query/queries/auth.query";
import { AUTH_KEY } from "@/api-query/keys/auth.key";

import type { LoginResponse } from "@/interfaces/auth.interfaces";
import type { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setItem, removeItem, state: { accessToken } } = useLocalStorageContext();
  const { data: currentUser, isLoading, isError } = useCurrentUserQuery({ accessToken });
  const queryClient = useQueryClient();

  const login = useCallback(({ accessToken }: LoginResponse) => {
    setItem("accessToken", accessToken);
  }, [setItem]);

  const logout = useCallback(() => {
    removeItem("accessToken");
    queryClient.setQueriesData({ queryKey: AUTH_KEY }, null);
  }, [queryClient, removeItem]);

  useEffect(() => {
    if (isError) {
      // logout();
    }
  }, [isError, logout]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    queryClient.invalidateQueries({ queryKey: AUTH_KEY });
  }, [accessToken, queryClient]);

  return (
    <AuthContext.Provider value={{ user: currentUser, login, logout, isLoading, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
