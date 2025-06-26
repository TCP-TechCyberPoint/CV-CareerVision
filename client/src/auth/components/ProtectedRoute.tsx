import { Navigate } from "react-router-dom";
import { useAuth0Integration } from "../hooks/useAuth0Integration";
import { useAuth0Timeout } from "../utils";
import Loading from "@/components/shared/Loading";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0Integration();
  const auth0Timeout = useAuth0Timeout(isLoading);

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