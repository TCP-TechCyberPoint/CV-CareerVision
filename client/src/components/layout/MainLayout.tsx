import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <Box minH="100vh">
      <Box as="main">
        <Navbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;