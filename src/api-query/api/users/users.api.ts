import { isAxiosError } from "axios";

import { axios } from "@/lib/axios";
import { ApiError } from "@/lib/errors";

import { transformUser } from "./users.transform";

import type { User } from "@/interfaces/user.interfaces";
import type { AuthParams } from "@/interfaces/auth.interfaces";

export interface UpdateUserParams extends AuthParams {
  id: number;
  firstName?: string;
  lastName?: string;
}

export const updateUser = async ({
  id,
  firstName,
  lastName,
  accessToken,
}: UpdateUserParams): Promise<User> => {
  try {
    const { data } = await axios.patch("/v1/sales/user/update", {
      id,
      firstName,
      lastName,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return transformUser(data);
  } catch (error) {
    if (isAxiosError(error)) {
      throw ApiError.fromAxiosError(error);
    }

    throw new ApiError(500, "An unexpected error occurred");
  }
};

/**
 * Fetches a list of users from the API.
 */
export const getUsers = async ({ accessToken }: AuthParams): Promise<User[]> => {
  try {
    const { data } = await axios.get("/v1/sales/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.users.map(transformUser);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw ApiError.fromAxiosError(error);
    }

    throw new ApiError(500, "An unexpected error occurred");
  }
};
