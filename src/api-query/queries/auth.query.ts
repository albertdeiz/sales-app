import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuthContext } from '@/shared/hooks/use-auth-context';

import { authenticate } from '../api/auth.api';

import type { UseMutationResult } from '@tanstack/react-query';
import type { LoginParams, LoginResponse } from '@/interfaces/auth.interfaces';

export const useAuthMutation = (): UseMutationResult<LoginResponse, Error, LoginParams> => {
  const queryClient = useQueryClient();
  const { login, setIsLoading } = useAuthContext();

  setIsLoading(true);

  return useMutation({
    mutationFn: authenticate,
    onSuccess: (response) => {
      setIsLoading(false);
      login(response);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    }
  });
};
