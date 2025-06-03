import { Navigate } from "react-router-dom";
import { useTokenValidation } from "@/hooks/useTokenValidation";
import Loading from "../shared/Loading";


export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isTokenValid, isAuthenticated } = useTokenValidation();

  if (isTokenValid === null)
    return <Loading />;
  if (!isAuthenticated || !isTokenValid) {
        return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
