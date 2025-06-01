import { createContext } from 'react';

import type { LoginResponse } from '@/interfaces/auth.interfaces';
import type { User } from '@/interfaces/user.interfaces';

interface AuthContextType {
  user?: User;
  accessToken?: string;
  isLoading: boolean;
  logout(): void;
  login(data: LoginResponse): void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
