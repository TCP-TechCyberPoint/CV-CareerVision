import { useAuth } from "@/auth/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  HStack,
} from "@chakra-ui/react";
import ProfileDropdown from "./ProfileDropdown";
import BaseButton from "@/ui/BaseButton";
import { pages } from "@/constants/pages";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, authenticated, login } = useAuth();

  const isSignInPage = location.pathname === "/signin";

  const handleSignOut = async () => {
    await logout();
    navigate("/signin", { replace: true });
  };

  const handleLogin = () => {
    login();
  };

  return (
    <Box bg="linear-gradient(157deg,rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%);" px={4} position="relative">
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir="row-reverse"
      >
        <Box>
          <HStack gap={{ base: 4, md: 8 }} alignItems="center" flexDir="row-reverse">
            {authenticated ? (
              <>
                <ProfileDropdown onSignOut={handleSignOut} />
                {pages.map(({ label, path }) => (
                  <BaseButton
                    key={label}
                    variant="outline"
                    color="white"
                    colorScheme="whiteAlpha.900"
                    borderColor="whiteAlpha.900"
                    fontWeight="bold"
                    size={{ base: "sm", sm: "md" }}
                    _hover={{
                      bgColor: "whiteAlpha.900",
                      color: "blue.700",
                      borderColor: "whiteAlpha.900",
                    }}
                    onClick={() => navigate(path)}
                  >
                    {label}
                  </BaseButton>       
                ))}
              </>
            ) : isSignInPage ? (
              // On signin page, show nothing in the right side since signin form is in the main content
              <></>
            ) : (
              <BaseButton
                variant="outline"
                color="orange.500"
                colorScheme="orange"
                size={{ base: "sm", sm: "md" }}
                onClick={handleLogin}
              >
                Sign In
              </BaseButton>
            )}
          </HStack>
        </Box>

        {/* Logo */}
        <Text fontSize={{ base: "md", sm: "lg" }} color="white" fontWeight="bold">
          Career Vision
        </Text>
      </Flex>
    </Box>
  );
};

export default Navbar;
