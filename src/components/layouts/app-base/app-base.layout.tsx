import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { Sidebar } from './components/sidebar';
import { TopbarContainer } from './containers/topbar.container';

import { useAuthContext } from '@/shared/hooks/use-auth-context';

export const AppBaseLayout = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuthContext();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/login');
    }
  }, [user, navigate, isLoading]);

  return !isLoading
    ? (<div className="flex h-screen bg-muted">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopbarContainer />
        <main className="p-6 overflow-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>)
    : (<div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary" />
    </div>);
};
