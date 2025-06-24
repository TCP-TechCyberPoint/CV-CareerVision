import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { useAuth0Integration } from "@/auth/useAuth0Integration";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";

const Login = () => {
  const { isAuthenticated, isLoading, loginWithAuth0 } = useAuth0Integration();
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.50", "gray.900");

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <Box minH="100vh" bg={bgColor}>
        <Navbar />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minH="calc(100vh - 80px)"
        >
          <Text>Loading...</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={bgColor}>
      <Navbar />
      <Box as="main" display="flex" alignItems="center" minH="calc(100vh - 80px)">
        <Container maxW="container.sm">
          <VStack gap={8} textAlign="center">
            <VStack gap={4}>
              <Heading size="2xl" color="blue.500">
                Career View
              </Heading>
              <Text fontSize="xl" color="gray.600">
                Your Career Journey Starts Here
              </Text>
            </VStack>

            <VStack gap={6} w="full" maxW="md">
              <Text color="gray.500" fontSize="md">
                Track your professional growth, set career goals, and visualize your path to success.
              </Text>
              
              <Button
                size="lg"
                colorScheme="blue"
                w="full"
                onClick={() => loginWithAuth0()}
                fontSize="md"
                py={6}
              >
                Sign In to Continue
              </Button>
            </VStack>

            <VStack gap={4} pt={8}>
              <Text fontSize="sm" color="gray.500">
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