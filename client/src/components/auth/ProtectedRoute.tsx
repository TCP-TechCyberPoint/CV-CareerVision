import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { cookieUtils } from "@/utils/cookie-utils";
import Loading from "../shared/Loading";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Show loading while auth is being initialized
  if (isLoading) {
    return <Loading />;
  }
  
  // Check if there's a token in cookies for immediate protection on refresh
  const hasToken = cookieUtils.getToken() !== null;
  
  // If no token and not authenticated, redirect to login
  if (!hasToken && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If we have a token OR are authenticated, allow access
  if (hasToken || isAuthenticated) {
    return <>{children}</>;
  }
  
  // Fallback: redirect to login
  return <Navigate to="/login" replace />;
};
