// client/src/router.tsx
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Home, About } from '@/pages';
import Login from '@/pages/Login';
import { ProtectedRoute } from '@/auth/components/ProtectedRoute';
import { useAuth } from '@/auth/context/useAuth';
import type { AuthContextType } from '@/auth/types';
import { slideshowRoutes } from '@slideshow-form/routes';
import { chatbotRoutes } from '@chatbot/routes';
import Loading from '@/ui/Loading';

// Root redirect component
const RootRedirect: React.FC = () => {
  const { isAuthenticated, isLoading, isInitialized } = useAuth() as AuthContextType;

  if (!isInitialized || isLoading) {
    return <Loading message="Initializing..." />;
  }

  return isAuthenticated ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

// Helper function to wrap routes with ProtectedRoute
const createProtectedRoute = (element: React.ReactNode) => {
  if (!element) return null;
  return <ProtectedRoute>{element}</ProtectedRoute>;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: createProtectedRoute(<Home />),
  },
  {
    path: '/about',
    element: createProtectedRoute(<About />),
  },
  // Protected slideshow routes
  ...slideshowRoutes.map(route => ({
    ...route,
    element: createProtectedRoute(route.element),
  })),
  // Protected chatbot routes
  ...chatbotRoutes.map(route => ({
    ...route,
    element: createProtectedRoute(route.element),
  })),
]);