import Loading from "@/ui/Loading";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { setTokenGetter, useAppInit  } from "@/auth";
import type { AuthContextType } from "@/auth/types";
import { useAuth } from "@/auth/context/useAuth";
import { useEffect } from "react";
;

function App() {
const { getAccessToken } = useAuth() as AuthContextType;
const { isLoading, loadingStep } = useAppInit();


  useEffect(() => {
    setTokenGetter(getAccessToken);
  }, [getAccessToken]);

  if (isLoading) {
    return <Loading message={loadingStep} />;
  }

  return <RouterProvider router={router} />;
}

export default App;
