// client/src/router.tsx
import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import { Home, About, Register } from "@/pages"; // <- add Register if you need it
import { Login, useAuth0Integration } from "@/auth";
import { slideshowRoutes } from "@slideshow-form/routes";
import Loading from "@/ui/Loading";

// Auth wrapper for protected routes – now preserves "from"
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth0Integration();
  const location = useLocation();

  if (isLoading) return <Loading message="Initializing..." />;
  return isAuthenticated
    ? children
    : <Navigate to="/login" replace state={{ from: location }} />;
};

// Minimal “unauth only” wrapper for /login (and /register if desired)
const UnauthOnly = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth0Integration();
  const location = useLocation();

  if (isLoading) return <Loading message="Initializing..." />;
  if (isAuthenticated) {
    const from = (location.state as any)?.from?.pathname ?? "/home";
    return <Navigate to={from} replace />;
  }
  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Public landing
  },
  {
    path: "/login",
    element: (
      <UnauthOnly>
        <Login />
      </UnauthOnly>
    ),
  },
  {
    path: "/register",
    element: (
      <UnauthOnly>
        <Register />
      </UnauthOnly>
    ),
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
