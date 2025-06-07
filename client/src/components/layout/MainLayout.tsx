import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import ErrorBoundary from "../shared/ErrorBoundary";

const MainLayout = () => {
  return (
    <Box minH="100vh">
      <Box as="main">
        <Navbar />
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Box>
    </Box>
  );
};

export default MainLayout;