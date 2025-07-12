// client/src/pages/Login.tsx
import React from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Image,
  Spinner,
} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/system';
import { useAuth } from '../auth/context/useAuth';
import type { AuthContextType } from '../auth/types';
import Navbar from '@/ui/Navbar';
import logo from '@/assets/images/career-vision-logo.png';

const Login: React.FC = () => {
  const { login, isLoading } = useAuth() as AuthContextType;
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const handleLogin = () => {
    login();
  };

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
          <Spinner size="xl" color="blue.300" />
        </Box>
      </Box>
    );
  }

  return (
    <Box minH="100vh">
      <Navbar />
      <Box as="main" display="flex" alignItems="center" minH="calc(100vh - 80px)" w="100%">
        <Container maxW={{ base: 'container.sm', md: 'container.md', lg: 'container.xl' }} px={{ base: 4, md: 6 }}>
          <VStack gap={{ base: 6, md: 8 }} textAlign="center">
            <Image 
              src={logo} 
              alt="Career Vision" 
              width={{ base: 150, md: 200 }} 
              height={{ base: 50, md: 70 }} 
            />

            <VStack gap={{ base: 3, md: 4 }}>
              <Heading 
                fontSize={{ base: 'xl', md: '2xl' }} 
                color="blue.300" 
                maxW={{ base: 'sm', md: 'md' }}
              >
                Your Career Journey Starts Here
              </Heading>
            </VStack>

            <VStack gap={{ base: 4, md: 6 }} w="100%" maxW={{ base: 'xs', sm: 'sm', md: 'md' }}>
              <Text 
                color="blue.300" 
                fontSize={{ base: 'md', md: 'lg' }}
                px={{ base: 2, md: 0 }}
              >
                Track your professional growth, set career goals, and visualize your path to success.
              </Text>
              
              <Button
                size="lg"
                fontSize={{ base: 'lg', md: 'xl' }}
                margin={{ base: 4, md: 6 }}
                bgColor="rgba(66, 153, 225, 0.2)"
                border="1px solid rgba(255, 255, 255, 0.9)"
                _hover={{
                  bgColor: 'rgba(66, 153, 225, 0.2)',
                  color: 'white',
                  border: '1px solid white',
                  boxShadow: '0 0 8px rgba(66, 153, 225, 0.5)',
                }}
                color="blue.300"
                fontWeight="bold"
                w={{ base: '80%', sm: '70%', md: 'full' }}
                onClick={handleLogin}
                py={{ base: 4, md: 6 }}
              >
                Sign In to Continue
              </Button>
            </VStack>

            <VStack gap={{ base: 3, md: 4 }} pt={{ base: 6, md: 8 }}>
              <Text 
                fontSize={{ base: 'xs', md: 'sm' }} 
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