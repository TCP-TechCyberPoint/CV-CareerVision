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
import { useRegisterForm } from "@/hooks/useAuthForm";
import type { RegisterFormData } from "@/utils/validations";
import loginBg from "../assets/images/login-background.png";
import BaseButton from "@/components/ui/BaseButton";

const RegisterPage: React.FC = () => {
  const { register, handleSubmit: hookFormSubmit } = useForm<RegisterFormData>();
  const { handleSubmit, errors, isLoading } = useRegisterForm();

  return (
    <Flex
      minH="100vh"
      bg={useColorModeValue("gray.50", "gray.800")}
      bgImage={`url(${loginBg})`}
      bgSize="cover"
      bgRepeat="no-repeat"
    >
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
              Create an Account
            </Heading>
            <Text fontSize="sm" color="gray.500" textAlign="center">
              Create your account to get started
            </Text>
            <Field.Root id="name" invalid={!!errors.name}>
              <Field.Label>Full Name</Field.Label>
              <Input
                type="text"
                placeholder="John Doe"
                width="100%"
                maxW="320px"
                mx="auto"
                {...register("name")}
              />
              <Field.ErrorText>{errors.name}</Field.ErrorText>
            </Field.Root>
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
            <Field.Root id="confirmPassword" invalid={!!errors.confirmPassword}>
              <Field.Label>Confirm Password</Field.Label>
              <Input
                type="password"
                placeholder="••••••••"
                width="100%"
                maxW="320px"
                mx="auto"
                {...register("confirmPassword")}
              />
              <Field.ErrorText>{errors.confirmPassword}</Field.ErrorText>
            </Field.Root>
            <Stack gap={6}>
              <BaseButton
                type="submit"
                variant="solid"
                colorPalette="teal"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </BaseButton>
              <Text fontSize="sm" textAlign="center">
                Already have an account?{" "}
                <RouterLink to="/login">
                  <strong>Log in</strong>
                </RouterLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
};

export default RegisterPage;
