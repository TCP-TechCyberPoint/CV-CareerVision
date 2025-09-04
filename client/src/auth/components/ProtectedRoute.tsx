import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import Loading from "@/ui/Loading";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { ready, authenticated } = useAuth();

  // Show loading while Keycloak is initializing
  if (!ready) {
    return <Loading message="Initializing authentication..." />;
  }

  // If not authenticated, redirect to signin
  if (!authenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}; 