import { Navigate } from "react-router-dom";
import { useTokenValidation } from "@/hooks/useTokenValidation";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isValidating, isTokenValid, isAuthenticated } = useTokenValidation();

  if (isValidating) return <div>Loading...</div>;
  if (!isAuthenticated || !isTokenValid) return <Navigate to="/login" replace />;
  
  return <>{children}</>;
};
