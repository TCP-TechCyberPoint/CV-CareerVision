import { Box, Spinner, Text, VStack } from "@chakra-ui/react";

interface LoadingProps {
  message?: string;
}

const Loading = ({ message = "Loading..." }: LoadingProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bg="gray.50"
    >
      <VStack gap={4} maxW="400px" px={6}>
        <Spinner
          size="xl"
          color="blue.500"
        />
        
        <VStack gap={2} textAlign="center">
          <Text color="gray.700" fontSize="lg" fontWeight="medium">
            {message}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Loading;