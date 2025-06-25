import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home, About, Login } from "@/ui";
import { slideshowRoutes } from "./features/slideshow-form/routes/slideshowRoutes";
import { ProtectedRoute } from "@/auth/ProtectedRoute";
import { useAuth0Integration } from "@/auth/useAuth0Integration";
import Loading from "@/components/shared/Loading";

// Component to handle root route based on authentication
const RootRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth0Integration();

  // Show loading while Auth0 is initializing
  if (isLoading) {
    return <Loading message="Initializing..." />;
  }

  // Redirect based on authentication state
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
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