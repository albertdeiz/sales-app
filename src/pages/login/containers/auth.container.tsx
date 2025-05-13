import { useAuthMutation } from "@/api-query/queries/auth.query";
import { LoginForm } from "../components/login-form";

import { useState, type ReactElement } from "react"
import type { FormValues } from "../components/login-form";

export const AuthContainer = (): ReactElement => {
  const [ isLoading, setIsLoading ] = useState(false);
  const { mutate } = useAuthMutation();

  const handleLogin = ({
    email,
    password,
  }: FormValues) => {
    setIsLoading(true)
    mutate({
      email,
      password,
    }, {
      onSuccess: (data) => {
        console.log("Login exitoso", data);
      },
      onSettled: () => {
        setIsLoading(false);
      }
    })
  };

  return (
    <LoginForm onLogin={handleLogin} isLoading={isLoading} />
  )
};
