import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useColorModeValue } from "@chakra-ui/color-mode";
import loginBg from "../assets/images/login-background.png";
const LoginPage: React.FC = () => {
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
            <Stack gap={4}>
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
                />
              </FormControl>
              <Stack gap={6}>
                <Button bg="blue.400" color="white" _hover={{ bg: "blue.500" }}>
                  Sign In
                </Button>
                <Text fontSize="sm" textAlign="center">
                  Don't have an account? <strong>Sign up</strong>
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
