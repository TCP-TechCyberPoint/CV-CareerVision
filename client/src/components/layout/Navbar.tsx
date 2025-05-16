import {
  Box,
  Flex,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import BaseButton from "../ui/BaseButton";

const Navbar = () => {
  
  const navigate = useNavigate();
  const links = [
    { label: "Profile", path: "/edit-profile"   },
    { label: "Home", path: "/"   },
    { label: "About", path: "/about"  },
  ];

  return (
    <Box bg="gray.800" px={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir="row-reverse"
      >
        <Box>
          <HStack
            direction={"row"}
            gap={8}
            alignItems="center"
            flexDir="row-reverse"
          >
          {links.map(({ label, path }) => (
            <BaseButton
              key={label}
              variant="ghost"
              color="white"
              onClick={() => navigate(path)}
            >
          {label}
        </BaseButton>
      ))}
    </HStack>
        </Box>

        {/* Logo */}
        <Text fontSize="xl" color="white" fontWeight="bold">
          Career Vision
        </Text>
      </Flex>
     </Box>
  );
};

export default Navbar;
