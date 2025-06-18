import { Home, Calendar, Warehouse, Users, Store, FileInput } from "lucide-react";
import { useLocation, Link } from "react-router";

import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { label: "Almacenes", icon: Warehouse, path: "/warehouses" },
  { label: "Recepción", icon: FileInput, path: "/receptions" },
  { label: "Productos", icon: Store, path: "/products" },
  { label: "Usuarios", icon: Users, path: "/settings/users" },
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
              variant={location.pathname === path ? "secondary" : "ghost"}
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
