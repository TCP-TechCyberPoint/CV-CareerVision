// auth/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth0Integration } from "./useAuth0Integration";
import Loading from "@/components/shared/Loading";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0Integration();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
