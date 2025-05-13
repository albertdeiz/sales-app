import type { LoginParams, LoginResponse } from "@/interfaces/auth.interfaces";
import { axios } from "@/lib/axios";

export const authenticate = async (params: LoginParams): Promise<LoginResponse> => {
  const response = await axios.post('/v1/sales/auth', params);
  const { access_token, user } = response.data;

  console.log('Login response:', response.data);

  return {
    accessToken: access_token,
    user,
  }
};