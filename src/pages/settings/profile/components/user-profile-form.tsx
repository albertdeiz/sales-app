import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import type { ReactElement } from "react";
import { InputControlContainer } from "@/components/form/input/input-control.container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/interfaces/user.interfaces";

export interface FormValues {
  firstName: string
  lastName: string
}

export interface UserProfileFormProps {
  isLoading: boolean;
  user: User;
  onSave(values: FormValues): void
}

const schema = z.object({
  firstName: z
    .string()
    .min(1, "El nombre es obligatorio"),
  lastName: z
    .string()
    .min(1, "El apellido es obligatorio"),
});

export const UserProfileForm = ({
  isLoading,
  user: { firstName, lastName },
  onSave,
}: UserProfileFormProps): ReactElement => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: {
      firstName,
      lastName,
    },
  });

  return (
    <FormProvider {...methods}>
      <Card className="w-full w-lg mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-xl">Datos personales</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <form onSubmit={methods.handleSubmit(onSave)} noValidate className="space-y-4">
            <InputControlContainer
              name="firstName"
              label="Nombre"
              type="text"
              placeholder="Tu nombre"
            />
            <InputControlContainer
              name="lastName"
              label="Apellido"
              type="text"
              placeholder="Tu apellido"
            />
            <Button type="submit" disabled={isLoading} className="w-full">Guardar</Button>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};
