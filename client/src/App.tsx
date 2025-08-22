import useAppInit from "@/auth/hooks/useAppInit";
import Loading from "@/ui/Loading";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useAuth0Integration } from "@/auth";

function App() {
  useAuth0Integration();
  const { isLoading, loadingStep } = useAppInit();

  if (isLoading) {
    return <Loading message={loadingStep} />;
  }

  return <RouterProvider router={router} />;
}

export default App;
