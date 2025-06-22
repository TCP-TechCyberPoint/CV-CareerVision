import { createBrowserRouter } from "react-router-dom";
import { Home, About, EditProfilePage } from "@/pages";
import MainLayout from "@/components/layout/MainLayout";
import { slideshowRoutes } from "./features/slideshow-form/routes/slideshowRoutes";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { 
        path: "/", 
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "/about", 
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "/edit-profile", 
        element: (
          <ProtectedRoute>
            <EditProfilePage />
          </ProtectedRoute>
        ) 
      },
      ...slideshowRoutes.map(route => ({
        ...route,
        element: <ProtectedRoute>{route.element}</ProtectedRoute>
      })),
    ],
  },
]);