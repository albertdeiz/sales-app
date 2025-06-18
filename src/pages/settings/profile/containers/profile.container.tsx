import { useAuthContext } from "@/shared/hooks/use-auth-context";
import { UserProfileForm, type FormValues } from "../components/user-profile-form";
import { useUserMutation } from "@/api-query/queries/users/users.mutations";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AUTH_KEY } from "@/api-query/keys/auth.key";

export const ProfileContainer = () => {
  const { user, accessToken } = useAuthContext();
  const { mutateAsync, isPending } = useUserMutation();
  const queryClient = useQueryClient();

  const handleSubmit = useCallback(async({ firstName, lastName }: FormValues) => {
    await mutateAsync({
      accessToken,
      id: user?.id || 0,
      firstName,
      lastName,
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: AUTH_KEY });
      },
    });
  }, [accessToken, mutateAsync, queryClient, user?.id]);

  return user && <div>
    <UserProfileForm isLoading={isPending} user={user} onSave={handleSubmit} />
  </div>;
};
