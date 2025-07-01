import { Box, Container, Heading, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import ChatSession from "./ChatSession";

const Chatbot = () => {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      <Container maxW="container.lg" py={8}>
        <VStack gap={6} align="stretch">
          <Heading 
            textAlign="center" 
            color={useColorModeValue("gray.800", "white")}
            fontSize={{ base: "2xl", md: "3xl" }}
          >
            AI Career Assistant
          </Heading>
          <ChatSession />
        </VStack>
      </Container>
    </Box>
  );
};

export default Chatbot; 