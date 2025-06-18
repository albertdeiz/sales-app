import { updateUser, type UpdateUserParams } from "@/api-query/api/users/users.api";
import type { User } from "@/interfaces/user.interfaces";
import type { ApiError } from "@/lib/errors";
import { useMutation } from "@tanstack/react-query";

export const useUserMutation = () => useMutation<User, ApiError, UpdateUserParams>({
  mutationFn: updateUser,
});
