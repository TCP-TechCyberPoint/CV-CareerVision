import useAppInit from "./hooks/useAppInit";
import Loading from "./components/shared/Loading";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useAuth0Integration } from "@/hooks/useAuth0Integration";
import { setTokenGetter } from "./api/axios-instance";
import { useEffect } from "react";

function App() {
  const { getAccessToken } = useAuth0Integration();
  const { isLoading, loadingStep } = useAppInit();

  useEffect(() => {
    setTokenGetter(getAccessToken);
  }, []);

  if (isLoading) {
    return <Loading message={loadingStep} />;
  }

  return <RouterProvider router={router} />;
}

export default App;
