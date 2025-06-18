import { toast } from "sonner";
import { useAuthContext } from "@/shared/hooks/use-auth-context";
import { SelectUserWorkspaceForm, type FormValues } from "../components/select-user-workspace-form";
import { useRefreshTokenMutation } from "@/api-query/queries/auth.query";

export const SelectWorkspaceContainer = () => {
  const { user: { userWorkspaces = [], email = "" } = {} } = useAuthContext();
  const { mutate, isPending } = useRefreshTokenMutation();

  const handleSelectWorkspace = ({ workspaceId }: FormValues) => {
    mutate(Number(workspaceId), {
      onSuccess: () => {
        toast.success("Espacio de trabajo seleccionado correctamente");
      },
      onError: () => {
        toast.error("Error al seleccionar el espacio de trabajo, por favor intente nuevamente");
      },
    });
  };

  return (
    <SelectUserWorkspaceForm
      email={email}
      isLoading={isPending}
      userWorkspaces={userWorkspaces}
      onSubmit={handleSelectWorkspace}
    />
  );
};
