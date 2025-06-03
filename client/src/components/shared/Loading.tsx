import { Box, Spinner, Text, VStack } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bg="gray.50"
    >
      <VStack gap={4}>
        <Spinner
          borderWidth="4px"
          size="xl"
          color="blue.500"
        />
        <Text color="gray.500" fontSize="lg">
          Loading...
        </Text>
      </VStack>
    </Box>
  );
};

export default Loading;