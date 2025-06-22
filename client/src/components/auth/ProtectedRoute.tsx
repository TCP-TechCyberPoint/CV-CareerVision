// components/auth/ProtectedRoute.tsx
import { Box, Text, VStack, Button } from "@chakra-ui/react";
import { useAuth0Integration } from "@/hooks/useAuth0Integration";
import Loading from "../shared/Loading";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, loginWithAuth0 } = useAuth0Integration();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minH="50vh"
        px={4}
      >
        <VStack gap={6}>
          <Text fontSize="xl" color="gray.600" textAlign="center">
            Please log in to access this page
          </Text>
          <Text fontSize="md" color="gray.500" textAlign="center">
            Sign in to continue to your career dashboard
          </Text>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => loginWithAuth0()}
          >
            Sign In
          </Button>
        </VStack>
      </Box>
    );
  }

  return <>{children}</>;
};
