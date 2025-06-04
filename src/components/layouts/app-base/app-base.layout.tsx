import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { Sidebar } from './components/sidebar';
import { TopbarContainer } from './containers/topbar.container';

import { useAuthContext } from '@/shared/hooks/use-auth-context';
import { LoadingWrapper } from '@/components/ui/loading-wrapper';

export const AppBaseLayout = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuthContext();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/login');
    }
  }, [user, navigate, isLoading]);

  return (
    <div className="flex h-screen bg-muted">
      <LoadingWrapper isLoading={isLoading}>
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopbarContainer />
          <main className="p-6 overflow-auto flex-1">
            <Outlet />
          </main>
        </div>
      </LoadingWrapper>
    </div>
  );
};
