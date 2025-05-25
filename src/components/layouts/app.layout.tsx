import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { Sidebar } from './root/components/sidebar';
import { Topbar } from './root/components/topbar';

import { useAuthContext } from '@/shared/hooks/use-auth-context';

export const AppLayout = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen bg-muted">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="p-6 overflow-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
