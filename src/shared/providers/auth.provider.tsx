import { useCallback } from 'react';

import { AuthContext } from '@/shared/contexts/auth.context';
import { useLocalStorageContext } from '@/shared/hooks/use-local-storage-context';
import { useCurrentUserQuery } from '@/api-query/queries/auth.query';

import type { LoginResponse } from '@/interfaces/auth.interfaces';
import type { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setItem, removeItem, state: { accessToken } } = useLocalStorageContext();
  const { data: currentUser, isLoading } = useCurrentUserQuery({ accessToken });

  const login = useCallback(({ accessToken }: LoginResponse) => {
    setItem('accessToken', accessToken);
  }, [setItem]);

  const logout = useCallback(() => {
    removeItem('accessToken');
  }, [removeItem]);

  return (
    <AuthContext.Provider value={{ user: currentUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
