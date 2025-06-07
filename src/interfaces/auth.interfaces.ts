export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface AuthParams {
  accessToken?: string;
}

export interface RefreshTokenParams extends AuthParams {
  workspaceId: number;
}
