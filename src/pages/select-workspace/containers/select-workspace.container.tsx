import { useAuthContext } from '@/shared/hooks/use-auth-context';
import { SelectUserWorkspaceForm } from '../components/select-user-workspace-form';

export const SelectWorkspaceContainer = () => {
  const { user: { userWorkspaces = [], email = '' } = {} } = useAuthContext();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <SelectUserWorkspaceForm email={email} userWorkspaces={userWorkspaces} onSubmit={console.log} onExit={console.log} />
    </div>
  );
};
