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

const SignUpPage: React.FC = () => {
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
                Create an Account
              </Heading>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Sign up to get started
              </Text>
              <FormControl id="name">
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  placeholder="John Doe"
                  width="100%"
                  maxW="320px"
                  mx="auto"
                />
              </FormControl>
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
              <FormControl id="confirmPassword">
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  placeholder="••••••••"
                  width="100%"
                  maxW="320px"
                  mx="auto"
                />
              </FormControl>
              <Stack gap={6}>
                <Button bg="teal.400" color="white" _hover={{ bg: "teal.500" }}>
                  Sign Up
                </Button>
                <Text fontSize="sm" textAlign="center">
                  Already have an account? <strong>Log in</strong>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Flex>
  );
};

export default SignUpPage;
