import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import { RootLayout } from "./layouts";
import { Home, Login } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
    ],
  }
]);

export const Router = () => {
  return <RouterProvider router={router} />;
}
