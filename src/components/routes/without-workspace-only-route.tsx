import { Navigate, Outlet, useLocation } from 'react-router';

import { useAuthContext } from '@/shared/hooks/use-auth-context';
import { LoadingWrapper } from '../ui/loading-wrapper';

export const WithoutWorkspaceOnlyRoute = () => {
  const { user, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) {
    return <LoadingWrapper isLoading={true} />;
  }

  if (user && user.currentWorkspaceId) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
