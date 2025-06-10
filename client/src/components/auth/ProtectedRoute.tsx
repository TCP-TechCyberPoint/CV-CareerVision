import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth/store";
import { cookieUtils } from "@/utils/cookie-utils";
import Loading from "../shared/Loading";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useAuthStore();
  const hasToken = cookieUtils.getToken() !== null;
  
  // Show loading while auth is being initialized
  if (isLoading) {
    return <Loading />;
  }
  
  // If no token, redirect to login
  if (!hasToken) {
    return <Navigate to="/login" replace />;
  }
  
  // If we have a token, allow access
  return <>{children}</>;
};
