import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  HStack,
} from "@chakra-ui/react";
import ProfileDropdown from "./ProfileDropdown";
import BaseButton from "@/components/ui/BaseButton";
import { pages } from "@/constants/pages";

const Navbar = () => {
  const navigate = useNavigate();
  const  {logout}  = useAuth();



  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  const handleRedirectEditProfile = () => {
    navigate("/edit-profile");
  };

 
  return (
    <Box bg="gray.800" px={4} position="relative">
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir="row-reverse"
      >
        <Box>
          <HStack gap={8} alignItems="center" flexDir="row-reverse">
            <ProfileDropdown onSignOut={handleSignOut} onRedirectEditProfile={handleRedirectEditProfile}  />
       
            {pages.map(({ label, path }) => (
               <BaseButton
                  key={label}
                  variant="outline"
                  color="orange.500"
                  colorScheme="orange"
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
