import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "@/shared/hooks/use-auth-context";
import { LoadingWrapper } from "@/components/ui/loading-wrapper";

export const GuestOnlyRoute = () => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <LoadingWrapper isLoading={true} />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
