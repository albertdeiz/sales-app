import {
  createBrowserRouter,
  RouterProvider
} from 'react-router';

import { AppLayout, RootLayout } from './components/layouts';
import { Dashboard, Home, Login } from './pages';

const router = createBrowserRouter([
  {
    path: '/login',
    Component: RootLayout,
    children: [
      { index: true, Component: Login },
    ]
  },
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: Home },
      { path: 'dashboard', Component: Dashboard },
    ]
  }
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
