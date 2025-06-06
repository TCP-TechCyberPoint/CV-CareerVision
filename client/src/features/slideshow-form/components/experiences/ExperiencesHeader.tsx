import { VStack, Text, Heading } from "@chakra-ui/react";

const ExperiencesHeader = () => {
  return (
    <VStack gap={3} textAlign="center">
      <Heading size="lg" color="green.600">
        Professional Experience
      </Heading>
      <Text color="gray.600" fontSize="md" maxW="600px">
        Share your work experience, including current and previous positions. 
        This helps showcase your professional background and career progression.
      </Text>
    </VStack>
  );
};

export default ExperiencesHeader; 