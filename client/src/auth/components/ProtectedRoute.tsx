import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import type { AuthContextType,ProtectedRouteProps  } from '@/auth';
import Loading from '@/ui/Loading';

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback = <Loading message="Authenticating..." /> 
}) => {
  const { isAuthenticated, isLoading, isInitialized } = useAuth() as AuthContextType;

  // Show loading while initializing or Auth0 is loading
  if (!isInitialized || isLoading) {
    return <>{fallback}</>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};