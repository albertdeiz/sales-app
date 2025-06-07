import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { useAuthContext } from '@/shared/hooks/use-auth-context';
import { SelectUserWorkspaceForm, type FormValues } from '../components/select-user-workspace-form';
import { useRefreshTokenMutation } from '@/api-query/queries/auth.query';

export const SelectWorkspaceContainer = () => {
  const { user: { userWorkspaces = [], email = '' } = {} } = useAuthContext();
  const { mutate, isPending } = useRefreshTokenMutation();
  const navigate = useNavigate();

  const handleSelectWorkspace = ({ workspaceId }: FormValues) => {
    mutate(Number(workspaceId), {
      onSuccess: () => {
        toast.success('Espacio de trabajo seleccionado correctamente');
        navigate('/select-workspace', { replace: true });
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
