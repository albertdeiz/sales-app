import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SelectControlContainer } from "@/components/form/select/select-control.container";

import type { UserWorkspace } from "@/interfaces/user.interfaces";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { InputControlContainer } from "@/components/form/input/input-control.container";

export interface FormValues {
  email: string;
  workspaceId: string;
}

interface SelectUserWorkspaceFormProps {
  userWorkspaces: UserWorkspace[];
  email: string;
  isLoading?: boolean;
  onSubmit(values: FormValues): void;
  onExit?(): void;
}

const schema = zod.object({
  email: zod.string().email("El correo electrónico no es válido"),
  workspaceId: zod.string().min(1, "Debes seleccionar un espacio de trabajo"),
});

export const SelectUserWorkspaceForm = ({
  userWorkspaces,
  email,
  isLoading,
  onSubmit,
  onExit,
}: SelectUserWorkspaceFormProps) => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email,
    },
  });

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <Card className="w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Selecciona tu espacio de trabajo</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <InputControlContainer disabled label="correo electrónico" name="email" />
            <SelectControlContainer
              name="workspaceId"
              label="Espacio de trabajo"
              options={userWorkspaces.map(({ id, name }) => ({
                value: String(id),
                label: name,
              }))}
            />
          </CardContent>
          <CardFooter className="flex justify-between space-x-2">
            <Button type="submit" disabled={isLoading}>Entrar</Button>
            {onExit && <Button variant="ghost" type="button" onClick={onExit}>Salir</Button>}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
