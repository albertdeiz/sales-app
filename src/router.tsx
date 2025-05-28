import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router';

import { AppBaseLayout, RootLayout } from './components/layouts';
import { Dashboard, Home, Login } from './pages';
import { UsersContainer } from './pages/settings/users';
import { ProfileContainer } from './pages/settings/profile';

const router = createBrowserRouter([
  {
    path: '/login',
    Component: RootLayout,
    children: [
      { index: true, Component: Login },
    ],
  },
  {
    path: '/',
    Component: AppBaseLayout,
    children: [
      { index: true, Component: Home },
      { path: 'dashboard', Component: Dashboard },
      {
        path: 'settings',
        children: [
          { path: 'users', Component: UsersContainer },
          { path: 'profile', Component: ProfileContainer },
        ],
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
