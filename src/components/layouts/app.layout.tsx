import { Outlet } from 'react-router';
import { Sidebar } from './root/components/sidebar';
import { Topbar } from './root/components/topbar';

export const AppLayout = () => {
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
}
