// auth/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth0Integration } from "./useAuth0Integration";
import Loading from "@/components/shared/Loading";
import { useEffect, useState } from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0Integration();
  const [auth0Timeout, setAuth0Timeout] = useState(false);

  // Add timeout for Auth0 loading to prevent unnecessary redirects
  useEffect(() => {
    if (isLoading && !auth0Timeout) {
      const timeout = setTimeout(() => {
        setAuth0Timeout(true);
      }, 1500); // Increased from 400ms to 1500ms to give Auth0 more time

      return () => clearTimeout(timeout);
    } else if (!isLoading) {
      setAuth0Timeout(false);
    }
  }, [isLoading, auth0Timeout]);

  // Show loading only briefly during Auth0 initialization
  if (isLoading && !auth0Timeout) {
    return <Loading />;
  }

  // If Auth0 timed out and still not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
