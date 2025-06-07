import { createBrowserRouter } from "react-router-dom";
import { Home, About, LoginPage, RegisterPage, EditProfilePage } from "@/pages";
import MainLayout from "@/components/layout/MainLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { slideshowRoutes } from "./features/slideshow-form/routes/slideshowRoutes";

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
        element: <About />,
      },
      {
        path: "/edit-profile",
        element: <EditProfilePage />,
      },
      // Import all slideshow-form routes
      ...slideshowRoutes,
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
