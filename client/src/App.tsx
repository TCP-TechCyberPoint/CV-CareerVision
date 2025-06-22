import useAppInit from "./hooks/useAppInit";
import { useAuthStore } from "@/store/auth/store";
import Loading from "./components/shared/Loading";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useAuth0Integration } from "@/hooks/useAuth0Integration";
import { setTokenGetter } from "./api/axios-instance";
import { useEffect } from "react";

function App() {
  const { initFromCookies } = useAuthStore();
  const { getAccessToken } = useAuth0Integration();
  const { isLoading, loadingStep } = useAppInit();

  useEffect(() => {
    initFromCookies();
  }, [initFromCookies]);

  useEffect(() => {
    setTokenGetter(getAccessToken);
  }, [getAccessToken]);

  if (isLoading) {
    return <Loading message={loadingStep} />;
  }

  return <RouterProvider router={router} />;
}

export default App;
