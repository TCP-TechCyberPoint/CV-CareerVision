// components/auth/ProtectedRoute.tsx
import { Box, Text, VStack } from "@chakra-ui/react";
import { useAuth0Integration } from "@/hooks/useAuth0Integration";
import { useAuthStore } from "@/store/auth/store";
import Loading from "../shared/Loading";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated: auth0IsAuthenticated, isLoading } = useAuth0Integration();
  const { isAuthenticated: storeIsAuthenticated } = useAuthStore();

  const isAuthenticated = auth0IsAuthenticated || storeIsAuthenticated;

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
        <VStack gap={4}>
          <Text fontSize="xl" color="gray.600" textAlign="center">
            Please log in to access this page
          </Text>
          <Text fontSize="md" color="gray.500" textAlign="center">
            Use the Login button in the navigation bar to authenticate
          </Text>
        </VStack>
      </Box>
    );
  }

  return <>{children}</>;
};
