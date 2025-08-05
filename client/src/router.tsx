import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home, About } from "@/pages";
import { Login, useAuth0Integration } from "@/auth";
import { slideshowRoutes } from "@slideshow-form/routes";
import Loading from "@/ui/Loading";

// Auth wrapper for protected routes
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth0Integration();

  if (isLoading) return <Loading message="Initializing..." />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Publicly accessible Home page
  },
  {
    path: "/login",
    element: <Login />, // Publicly accessible login
  },
  {
    path: "/home",
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: "/about",
    element: (
      <RequireAuth>
        <About />
      </RequireAuth>
    ),
  },
  ...slideshowRoutes.map(route => ({
    ...route,
    element: <RequireAuth>{route.element}</RequireAuth>,
  })),
]);
