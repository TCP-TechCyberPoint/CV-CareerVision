import Loading from "@/ui/Loading";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider, useAuth } from "@/auth/AuthProvider";
import { useEffect, useRef } from "react";
import { api } from "./api/axios";

function AppContent() {
  const { ready, authenticated } = useAuth();
  const bootstrapRef = useRef(false);

  // Bootstrap user record on first login (only once)
  useEffect(() => { 
    if (ready && authenticated && !bootstrapRef.current) {
      bootstrapRef.current = true;
      api.post('/api/bootstrap').catch(() => {});
    }
  }, [ready, authenticated]);

  if (!ready) {
    return <Loading message="Initializing authentication..." />;
  }

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
