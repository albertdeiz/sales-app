import { toast } from 'sonner';
import { useLocation, useNavigate } from 'react-router';

import { useAuthContext } from '@/shared/hooks/use-auth-context';
import { useAuthMutation } from '@/api-query/queries/auth.query';

import { LoginForm } from '../components/login-form';

import type { ReactElement } from 'react';
import type { FormValues } from '../components/login-form';

export const AuthContainer = (): ReactElement => {
  const { mutate, isPending } = useAuthMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();

  const from = location.state?.from?.pathname || '/select-workspace';

  const handleLogin = ({
    email,
    password,
  }: FormValues) => {
    mutate({
      email,
      password,
    }, {
      onSuccess: (response) => {
        login(response);
        toast.success('Login exitoso');
        navigate(from, { replace: true });
      },
      onError: () => {
        toast.error('Error al iniciar sesión, verifique sus credenciales');
      },
    });
  };

  return (
    <LoginForm onLogin={handleLogin} isLoading={isPending} />
  );
};
