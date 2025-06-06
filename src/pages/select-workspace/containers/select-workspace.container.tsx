import { useAuthContext } from '@/shared/hooks/use-auth-context';
import { SelectUserWorkspaceForm, type FormValues } from '../components/select-user-workspace-form';
import { useRefreshTokenMutation } from '@/api-query/queries/auth.query';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';

export const SelectWorkspaceContainer = () => {
  const { user: { userWorkspaces = [], email = '' } = {} } = useAuthContext();
  const { mutate, isPending } = useRefreshTokenMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSelectWorkspace = ({ workspaceId }: FormValues) => {
    mutate(Number(workspaceId), {
      onSuccess: (data) => {
        navigate(from, { replace: true });
        login(data);
        toast.success('Espacio de trabajo seleccionado correctamente');
      },
      onError: () => {
        toast.error('Error al seleccionar el espacio de trabajo, por favor intente nuevamente');
      },
    });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <SelectUserWorkspaceForm
        email={email}
        isLoading={isPending}
        userWorkspaces={userWorkspaces}
        onSubmit={handleSelectWorkspace}
      />
    </div>
  );
};
