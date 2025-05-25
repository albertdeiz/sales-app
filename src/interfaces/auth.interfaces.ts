import type { User } from '@/shared/interfaces/auth.interfaces';

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}
