import { useAuth0Integration } from "@/hooks/useAuth0Integration";
import { useAuthStore } from "@/store/auth/store";
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
  const { logout, isAuthenticated: auth0IsAuthenticated, loginWithAuth0 } = useAuth0Integration();
  const { isAuthenticated: storeIsAuthenticated } = useAuthStore();

  // Use store authentication as fallback when Auth0 is having issues
  const isAuthenticated = auth0IsAuthenticated || storeIsAuthenticated;

  const handleSignOut = () => {
    logout();
  };

  const handleRedirectEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleLogin = () => {
    loginWithAuth0();
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
            {isAuthenticated ? (
              <>
                <ProfileDropdown onSignOut={handleSignOut} onRedirectEditProfile={handleRedirectEditProfile} />
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
              </>
            ) : (
              <BaseButton
                variant="outline"
                color="orange.500"
                colorScheme="orange"
                onClick={handleLogin}
              >
                Login
              </BaseButton>
            )}
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
