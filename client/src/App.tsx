import { Outlet, RouterProvider } from "react-router-dom";
import { router } from "./router";
import ErrorBoundary from "./components/shared/ErrorBoundary";

function App() {
  return (
    // show details in development mode only
    <ErrorBoundary showDetails={import.meta.env.DEV}>
      <RouterProvider router={router} />
      <Outlet />
    </ErrorBoundary>
  );
}

export default App;
