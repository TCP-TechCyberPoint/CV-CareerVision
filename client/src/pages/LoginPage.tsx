import React, { useState } from "react";
import { Box, Container, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import loginBg from "../assets/images/login-background.png";
import BaseButton from "@/components/ui/BaseButton";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        toaster.create({
          title: "Error",
          description: `Failed to login. Please try again. ${error.message}`,
          type: "error",
          duration: 3000,
          closable: true,
        });
      }
    }
  };

  return (
    <Flex
      minH="100vh"
      bg={useColorModeValue("gray.50", "gray.800")}
      bgImage={`url(${loginBg})`}
      bgSize="cover"
      bgRepeat="no-repeat"
    >
      <Box>
        <Container
          minH="100vh"
          maxW="100%"
          px={{ base: 6, md: "60" }}
          py={{ base: 6, md: "48" }}
        >
          <Box
            maxW="md"
            w="full"
            bg={useColorModeValue("white", "gray.700")}
            mx="10"
            px={{ base: 6, md: 12 }}
            py={{ base: 6, md: 8 }}
            rounded="lg"
            shadow="lg"
          >
            <Stack gap={4} as="form" onSubmit={handleSubmit}>
              <Heading fontSize="2xl" textAlign="center">
                Welcome Back
              </Heading>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Please login to your account
              </Text>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  width="100%"
                  maxW="320px"
                  mx="auto"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="••••••••"
                  width="100%"
                  maxW="320px"
                  mx="auto"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack gap={6}>
                <BaseButton
                  type="submit"
                  colorPalette="blue"
                  color="white"
                  variant="solid"
                >
                  Sign In
                </BaseButton>
                <Text fontSize="sm" textAlign="center">
                  Don't have an account?{" "}
                  <RouterLink to="/signup">
                    <strong>Sign up</strong>
                  </RouterLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Flex>
  );
};

export default LoginPage;
