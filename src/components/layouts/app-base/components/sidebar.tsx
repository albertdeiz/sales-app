import { Home, User, Settings, Calendar } from 'lucide-react';
import { useLocation, Link } from 'react-router';

import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Dashboard', icon: Home, path: '/dashboard' },
  { label: 'Usuarios', icon: User, path: '/users' },
  { label: 'Configuración', icon: Settings, path: '/settings' }
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-60 bg-white border-r h-full p-4">
      <div className="text-2xl font-bold mb-6 flex items-center gap-2"><Calendar /> Proto Sales</div>
      <nav className="flex flex-col gap-2">
        {navItems.map(({ label, icon: Icon, path }) => (
          <Link key={path} to={path}>
            <Button
              variant={location.pathname === path ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-2"
            >
              <Icon size={18} />
              {label}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
