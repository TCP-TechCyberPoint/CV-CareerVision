import useAppInit from "@/auth/hooks/useAppInit";
import Loading from "@/ui/Loading";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useAuth0Integration, setTokenGetter } from "@/auth";
import { useEffect } from "react";

function App() {
  const { getAccessToken } = useAuth0Integration();
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
