import { useAuthMutation } from "@/api-query/queries/auth.query";
import { toast } from "sonner"
import { LoginForm } from "../components/login-form";

import type { ReactElement } from "react"
import type { FormValues } from "../components/login-form";

export const AuthContainer = (): ReactElement => {
  const { mutate, isPending } = useAuthMutation();

  const handleLogin = ({
    email,
    password,
  }: FormValues) => {
    mutate({
      email,
      password,
    }, {
      onSuccess: (data) => {
        console.log("Login exitoso", data);
        toast.success("Login exitoso");
      },
      onSettled: (s) => {
        console.log("Login settled", s);
        toast.error("Error al iniciar sesión, verifique sus credenciales");
      }
    })
  };

  return (
    <LoginForm onLogin={handleLogin} isLoading={isPending} />
  )
};
