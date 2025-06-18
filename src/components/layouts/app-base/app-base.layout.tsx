import { Outlet } from "react-router";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

export const AppBaseLayout = () => (
  <SidebarProvider >
    <AppSidebar />
    <main>
      <SidebarTrigger />
      <Outlet />
    </main>
  </SidebarProvider>
);
