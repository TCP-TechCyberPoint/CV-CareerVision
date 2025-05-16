import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box minH="100vh">
      <Box as="main" py={4}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;