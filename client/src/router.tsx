import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home, About } from "@/pages";
import { ProtectedRoute } from "@/auth/components/ProtectedRoute";
import { useAuth } from "@/auth/AuthProvider";
import { slideshowRoutes } from "@slideshow-form/routes";
import Loading from "@/ui/Loading";
import SignIn from "@/pages/SignIn";

// Component to handle root route based on authentication
const RootRedirect = () => {
  const { ready, authenticated } = useAuth();

  // Show loading while Keycloak is initializing
  if (!ready) {
    return <Loading message="Initializing..." />;
  }

  // Redirect based on authentication state
  if (authenticated) {
    return <Navigate to="/home" replace />;
  } else {
    return <Navigate to="/signin" replace />;
  }
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/signin",
    element: <SignIn />,
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