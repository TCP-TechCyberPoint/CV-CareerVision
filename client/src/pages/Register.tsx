import { useState } from "react";
import { Box, Container, VStack, Heading, Text, Button, Image, Spinner } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import Navbar from "@/ui/Navbar";
import logo from "@/assets/images/career-vision-logo.png";
import axios from "@/auth/services/api";
import { storageUtils } from "@/auth/utils";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const passwordHint = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const res = await axios.post(`/auth/register`, { name, email, password });
      const { token, user } = res.data;
      if (token && user) {
        storageUtils.setToken(token);
        storageUtils.setUser(user);
        navigate("/home", { replace: true });
      } else {
        setError("Invalid response from server");
      }
    } catch (e: any) {
      setError(e?.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <Navbar />
      <Box as="main" display="flex" alignItems="center" minH="calc(100vh - 80px)" w="100%">
        <Container maxW={{ base: "container.sm", md: "container.md", lg: "container.xl" }} px={{ base: 4, md: 6 }}>
          <VStack gap={{ base: 6, md: 8 }} textAlign="center">
            <Image src={logo} alt="Career Vision" width={{ base: 150, md: 200 }} height={{ base: 50, md: 70 }} />
            <Heading fontSize={{ base: "xl", md: "2xl" }} color="blue.300" maxW={{ base: "sm", md: "md" }}>
              Create your account
            </Heading>
            <VStack w="full" gap={3} maxW={{ base: "xs", sm: "sm", md: "md" }}>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", padding: "12px", borderRadius: 6 }}
              />
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
              <Text color="blue.300" fontSize="xs" textAlign="left" w="full">
                {passwordHint}
              </Text>
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
                Create account
              </Button>
              <Button variant="link" color="blue.300" onClick={() => navigate("/login")}>Already have an account? Sign in</Button>
            </VStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Register;

