import { createBrowserRouter } from "react-router-dom";
import { Home, About, LoginPage, RegisterPage, EditProfilePage } from "@/pages";
import MainLayout from "@/components/layout/MainLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import SlideshowForm from "./features/slideshow-form/SlideshowForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/edit-profile",
        element: <EditProfilePage />,
      },
      {
        path: "/create-cv",
        element: <SlideshowForm />,
      } ,    
      {
        path: "/create-cv/:step",
        element: <SlideshowForm />,
        
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
