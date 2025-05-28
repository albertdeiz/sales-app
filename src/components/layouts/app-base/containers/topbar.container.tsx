import { useAuthContext } from '@/shared/hooks/use-auth-context';
import { Topbar } from '../components/topbar';
import { useNavigate } from 'react-router';
import { useCallback } from 'react';

export const TopbarContainer = () => {
  const { user: { email = '', firstName, lastName } = {}, logout } = useAuthContext();
  const nagivate = useNavigate();

  const userName = [firstName, lastName].join(' ').trim() || 'Usuario';

  const handleLogout = useCallback(() => {
    logout();
    nagivate('/login');
  }, [logout, nagivate]);

  const handleClickProfile = useCallback(() => {
    nagivate('/settings/profile');
  }, [nagivate]);

  return <Topbar
    userName={userName}
    email={email}
    onLogoutClick={handleLogout}
    onProfileClick={handleClickProfile}
  />;
};
