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
import { useAuth0Integration } from "../auth/hooks/useAuth0Integration";
import Navbar from "@/ui/Navbar";
import logo from "@/assets/images/career-vision-logo.png";
import { AUTH_CONSTANTS } from "../auth/constants";
import axios from "@/auth/services/api";
import { storageUtils } from "@/auth/utils";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { isLoading } = useAuth0Integration();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const [shouldRender, setShouldRender] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const res = await axios.post(`/auth/login`, { email, password });
      const { token, user } = res.data;
      if (token && user) {
        storageUtils.setToken(token);
        storageUtils.setUser(user);
        navigate("/home", { replace: true });
      } else {
        setError("Invalid response from server");
      }
    } catch (e: any) {
      setError(e?.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box minH="100vh">
      <Navbar />
      <Box as="main" display="flex" alignItems="center" minH="calc(100vh - 80px)" w="100%">
        <Container maxW={{ base: "container.sm", md: "container.md", lg: "container.xl" }} px={{ base: 4, md: 6 }}>
          <VStack gap={{ base: 6, md: 8 }} textAlign="center">
            <Image 
              src={logo} 
              alt="Career Vision" 
              width={{ base: 150, md: 200 }} 
              height={{ base: 50, md: 70 }} 
            />

            <VStack gap={{ base: 3, md: 4 }}>
              <Heading 
                fontSize={{ base: "xl", md: "2xl" }} 
                color="blue.300" 
                maxW={{ base: "sm", md: "md" }}
              >
                Your Career Journey Starts Here
              </Heading>
              <Text color="blue.300" fontSize={{ base: "sm", md: "md" }}>
                Don’t have an account? <Link to="/register">Create one</Link>
              </Text>
            </VStack>

            <VStack gap={{ base: 4, md: 6 }} w="100%" maxW={{ base: "xs", sm: "sm", md: "md" }}>
              <Text 
                color="blue.300" 
                fontSize={{ base: "md", md: "lg" }}
                px={{ base: 2, md: 0 }}
              >
                Track your professional growth, set career goals, and visualize your path to success.
              </Text>
              <VStack w="full" gap={3}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: 6 }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: 6 }}
                />
                {error && (
                  <Text color="red.300" fontSize="sm">{error}</Text>
                )}
                <Button
                  size="lg"
                  fontSize={{ base: "lg", md: "xl" }}
                  margin={{ base: 4, md: 6 }}
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
                  w={{ base: "80%", sm: "70%", md: "full" }}
                  onClick={handleSubmit}
                  isLoading={submitting}
                  py={{ base: 4, md: 6 }}
                >
                  Sign In
                </Button>
              </VStack>
            </VStack>

            <VStack gap={{ base: 3, md: 4 }} pt={{ base: 6, md: 8 }}>
              <Text 
                fontSize={{ base: "xs", md: "sm" }} 
                color="blue.300"
                px={{ base: 4, md: 0 }}
              >
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