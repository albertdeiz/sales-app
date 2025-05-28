import { isAxiosError } from 'axios';

import { axios } from '@/lib/axios';
import { ApiError } from '@/lib/errors';

import { transformUser } from './auth.transform';

import type { AuthParams, LoginParams, LoginResponse } from '@/interfaces/auth.interfaces';
import type { User } from '@/shared/interfaces/auth.interfaces';

export const login = async(params: LoginParams): Promise<LoginResponse> => {
  try {
    const { data } = await axios.post('/v1/sales/auth', params);

    return {
      accessToken: data.token,
    };
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw ApiError.fromAxiosError(error);
    }

    throw new ApiError(500, 'An unexpected error occurred');
  }
};

export const getCurrentUser = async({ accessToken }: AuthParams): Promise<User> => {
  try {
    const { data } = await axios.get('/v1/sales/auth/test', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return transformUser(data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw ApiError.fromAxiosError(error);
    }

    throw new ApiError(500, 'An unexpected error occurred');
  }
};
