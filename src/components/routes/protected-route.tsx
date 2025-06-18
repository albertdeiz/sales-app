import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthContext } from "@/shared/hooks/use-auth-context";
import { LoadingWrapper } from "@/components/ui/loading-wrapper";

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) {
    return <LoadingWrapper isLoading={true} />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user.currentWorkspaceId) {
    return <Navigate to="/select-workspace" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
