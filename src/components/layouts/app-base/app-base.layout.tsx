import { Outlet } from "react-router";

import { Sidebar } from "./components/sidebar";
import { TopbarContainer } from "./containers/topbar.container";

export const AppBaseLayout = () => {
  return (
    <div className="flex h-screen max-w-screen bg-muted">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopbarContainer />
        <main className="p-6 overflow-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
