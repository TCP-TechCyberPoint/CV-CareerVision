import React from "react";
import {
  Box,
  Container,
  Field,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginForm } from "../hooks/useLoginForm";
import type { LoginFormData } from "@/utils/validations";
import loginBg from "../assets/images/login-background.png";
import BaseButton from "@/components/ui/BaseButton";
import BaseButton from "@/components/ui/BaseButton";

const LoginPage: React.FC = () => {
  const { register, handleSubmit: hookFormSubmit } = useForm<LoginFormData>();
  const { handleSubmit, errors, isLoading } = useLoginForm();

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
            <Stack gap={4} as="form" onSubmit={hookFormSubmit(handleSubmit)}>
              <Heading fontSize="2xl" textAlign="center">
                Welcome Back
              </Heading>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Please login to your account
              </Text>
              <Field.Root id="email" invalid={!!errors.email}>
                <Field.Label>Email address</Field.Label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  width="100%"
                  maxW="320px"
                  mx="auto"
                  {...register("email")}
                />
                <Field.ErrorText>{errors.email}</Field.ErrorText>
              </Field.Root>
              <Field.Root id="password" invalid={!!errors.password}>
                <Field.Label>Password</Field.Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  width="100%"
                  maxW="320px"
                  mx="auto"
                  {...register("password")}
                />
                <Field.ErrorText>{errors.password}</Field.ErrorText>
              </Field.Root>
              <Stack gap={6}>
                <BaseButton
                  colorPalette="blue"
                  type="submit"
                  variant="solid"
                  color="white"
                  _hover={{ bg: "blue.500" }}
                  isDisabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </BaseButton>
                <BaseButton
                  colorPalette="gray"
                  variant="outline"
                  onClick={() => {
                    const quickLoginData = {
                      email: "email@email.com",
                      password: "Pa$$w0rd"
                    };
                    handleSubmit(quickLoginData);
                  }}
                  isDisabled={isLoading}
                >
                  Quick Login
                </BaseButton>
                <Text fontSize="sm" textAlign="center">
                  Don't have an account?{" "}
                  <RouterLink to="/register">
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
