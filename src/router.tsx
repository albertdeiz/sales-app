import { lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router';

import { AppBaseLayout, RootLayout } from './components/layouts';
import { GuestOnlyRoute, ProtectedRoute, PublicRoute } from './components/routes';
import { Dashboard, Home, Login } from './pages';
import { UsersContainer } from './pages/settings/users';
import { ProfileContainer } from './pages/settings/profile';
import { WithoutWorkspaceOnlyRoute } from './components/routes/without-workspace-only-route';

const SelectWorkspaceContainer = lazy(() => import('./pages/select-workspace'));
const WarehousesContainer = lazy(() => import('./pages/warehouses'));

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/about',
        element: <div>Página pública sobre nosotros</div>,
      },
      {
        path: '/contact',
        element: <div>Página de contacto</div>,
      },
    ],
  },
  {
    element: <WithoutWorkspaceOnlyRoute />,
    children: [
      {
        path: '/select-workspace',
        element: <RootLayout />,
        children: [
          { index: true, element: <SelectWorkspaceContainer /> },
        ],
      },
    ],
  },
  {
    element: <GuestOnlyRoute />,
    children: [
      {
        path: '/login',
        element: <RootLayout />,
        children: [
          { index: true, element: <Login /> },
        ],
      },
      {
        path: '/register',
        element: <RootLayout />,
        children: [
          { index: true, element: <div>Página de registro</div> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <AppBaseLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: 'dashboard', element: <Dashboard /> },
          {
            path: 'warehouses',
            children: [
              {
                index: true,
                element: <WarehousesContainer />,
              },
              {
                path: ':id',
                element: <WarehousesContainer />,
              },
            ],
          },
          {
            path: 'settings',
            children: [
              { path: 'users', element: <UsersContainer /> },
              { path: 'profile', element: <ProfileContainer /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <div>404 - Página no encontrada</div>,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
