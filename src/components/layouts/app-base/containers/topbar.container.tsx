import { useAuthContext } from '@/shared/hooks/use-auth-context';
import { Topbar } from '../components/topbar';

export const TopbarContainer = () => {
  const { user: { firstName, lastName } = {} } = useAuthContext();

  const userName = [firstName, lastName].join(' ').trim() || 'Usuario';

  return <Topbar userName={userName} />;
};
