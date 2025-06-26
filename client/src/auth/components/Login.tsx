import { useEffect, useState } from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { useAuth0Integration } from "../hooks/useAuth0Integration";
import Navbar from "@/ui/Navbar";
import logo from "@/assets/images/career-vision-logo.png";
import { AUTH_CONSTANTS } from "../constants";

const Login = () => {
  const { isLoading, loginWithAuth0 } = useAuth0Integration();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const [shouldRender, setShouldRender] = useState(false);

  // Add a small delay to prevent race conditions
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, AUTH_CONSTANTS.APP_INIT_DELAY);

    return () => clearTimeout(timer);
  }, []);

  // Show loading spinner while Auth0 is initializing or during delay
  if (isLoading || !shouldRender) {
    return (
      <Box minH="100vh" bg={bgColor}>
        <Navbar />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minH="calc(100vh - 80px)"
        >
          <Spinner size="xl" color="blue.300" />
        </Box>
      </Box>
    );
  }

  return (
    <Box minH="100vh">
      <Navbar />
      <Box as="main" display="flex" alignItems="center" minH="calc(100vh - 80px)" w="100%">
        <Container maxW="container.xl">
          <VStack gap={8} textAlign="center">
            <Image src={logo} alt="Career Vision" width={200} height={70} />

            <VStack gap={4}>
              <Heading fontSize="2xl" color="blue.300" maxW="md">
                Your Career Journey Starts Here
              </Heading>
            </VStack>

            <VStack gap={6} w="100%" maxW="md">
              <Text color="blue.300" fontSize="lg">
                Track your professional growth, set career goals, and visualize your path to success.
              </Text>
              
              <Button
                size="lg"
                fontSize="xl"
                margin={6}
                bgColor="rgba(66, 153, 225, 0.2)"
                border="1px solid rgba(255, 255, 255, 0.9)"
                _hover={{
                  bgColor: "rgba(66, 153, 225, 0.2)",
                  color: "white",
                  border: "1px solid white",
                  boxShadow: "0 0 8px rgba(66, 153, 225, 0.5)",
                }}
                color="blue.300"
                fontWeight="bold"
                w="full"
                onClick={() => loginWithAuth0()}
                py={6}
              >
                Sign In to Continue
              </Button>
            </VStack>

            <VStack gap={4} pt={8}>
              <Text fontSize="sm" color="blue.300">
                By signing in, you agree to our terms of service and privacy policy.
              </Text>
            </VStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Login; 