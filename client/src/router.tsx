import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home, About, Login } from "@/ui";
import { slideshowRoutes } from "./features/slideshow-form/routes/slideshowRoutes";
import { ProtectedRoute } from "@/auth/ProtectedRoute";

// Component to handle root route based on authentication
const RootRedirect = () => {
  // This will be handled by the ProtectedRoute component
  // which will redirect unauthenticated users to login
  return <Navigate to="/home" replace />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/about",
    element: (
      <ProtectedRoute>
        <About />
      </ProtectedRoute>
    ),
  },
  ...slideshowRoutes.map(route => ({
    ...route,
    element: <ProtectedRoute>{route.element}</ProtectedRoute>
  })),
]);