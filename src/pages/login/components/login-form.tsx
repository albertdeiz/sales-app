import { z as zod } from 'zod';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { InputControlContainer } from '@/components/form/input/input-control.container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import type { ReactElement } from 'react';

export interface FormValues {
  email: string
  password: string
}

export interface LoginFormProps {
  isLoading: boolean;
  onLogin(values: FormValues): void
}

const schema = zod.object({
  email: zod
    .string()
    .min(1, 'El correo electrónico es obligatorio')
    .email('El correo electrónico no es válido'),
  password: zod
    .string()
    .min(1, 'La contraseña es obligatoria')
});

export const LoginForm = ({ isLoading, onLogin }: LoginFormProps): ReactElement => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onLogin)} noValidate>
        <Card className="w-full w-sm mx-auto mt-10">
          <CardHeader>
            <CardTitle className="text-xl">Iniciar sesión</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <InputControlContainer
              name="email"
              label="Correo electrónico"
              type="email"
              placeholder="tu@email.com"
            />
            <InputControlContainer
              name="password"
              label="Contraseña"
              type="password"
              placeholder="••••••••"
            />
          </CardContent>
          <CardFooter className="flex justify-between space-x-2">
            <Button type="submit" disabled={isLoading}>Entrar</Button>
            <Button variant="ghost" type="button">¿Olvidaste tu contraseña?</Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
};
