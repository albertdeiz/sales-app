import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Outlet />
    </div>
  );
};
