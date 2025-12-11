import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/main-layout";
import AuthLayout from "@/layouts/auth-layout";

import Login from "@/pages/login";
import Register from "@/pages/register";
import HomePage from "@/pages/home";
import NotFoundPage from "@/pages/not-found";

import ProtectedRoutes from "@/components/auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
