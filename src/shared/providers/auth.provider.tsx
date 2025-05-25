import { useCallback, useState, type ReactNode } from 'react';
import { AuthContext } from '../contexts/auth.context';
import { useLocalStorageContext } from '../hooks/use-local-storage-context';

import type { LoginResponse } from '@/interfaces/auth.interfaces';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setItem, removeItem, state: { user } } = useLocalStorageContext();
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback(({ accessToken, user }: LoginResponse) => {
    setItem('user', user);
    setItem('authToken', accessToken);
  }, [setItem]);

  const logout = useCallback(() => {
    removeItem('user');
    removeItem('authToken');
  }, [removeItem]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
