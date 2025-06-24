import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { useAuth0Integration } from "@/auth/useAuth0Integration";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import logo from "@/assets/images/career-vision-logo.png";

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
    <Box minH="100vh" >
      <Navbar />
      <Box  as="main" display="flex" alignItems="center" minH="calc(100vh - 80px)" w="100%">
        <Container maxW="container.xl">
          <VStack gap={8} textAlign="center">
            <Image src={logo} alt="Career Vision" width={200} height={70} />

            <VStack gap={4}>
           
              <Heading  fontSize="2xl" color="blue.300" maxW="md">
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