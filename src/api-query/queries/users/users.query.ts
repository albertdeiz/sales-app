import { useQuery } from "@tanstack/react-query";

import { useAuthContext } from "@/shared/hooks/use-auth-context";

import { getUsers } from "../../api/users/users.api";
import { USERS_KEY } from "../../keys/users.key";

import type { UseQueryResult } from "@tanstack/react-query";
import type { User } from "@/interfaces/user.interfaces";
import type { ApiError } from "@/lib/errors";

export const useUsersQuery = (): UseQueryResult<User[], ApiError> => {
  const { accessToken } = useAuthContext();

  return useQuery<User[], ApiError>({
    queryKey: USERS_KEY,
    queryFn: () => getUsers({ accessToken }),
    staleTime: 1000 * 60 * 5,
  });
};
