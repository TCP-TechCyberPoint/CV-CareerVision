import { createBrowserRouter } from "react-router-dom";
import { Home, About, LoginPage, SignUpPage, EditProfilePage } from "@/pages";
import MainLayout from "@/components/layout/MainLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About
         />,
      },
      // Add more protected routes here
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/edit-profile",
    element: <EditProfilePage />,
  },
]);
