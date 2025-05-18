import BaseButton from "@/components/ui/BaseButton";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const StepSkills = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  return (
    <Box
      mt={24}
      mx="auto"
      maxW="600px"
      p={10}
      borderRadius="2xl"
      boxShadow="2xl"
      bg="white"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minH="500px"
    >
      <VStack gap={6} align="flex-start">
        <Heading size="xl">Skills & Expertise</Heading>
        <Text fontSize="md" color="gray.600">
          Tell us about your professional skills and areas of expertise.
        </Text>

        {/* Skills form content will go here */}
      </VStack>

      <Box display="flex" justifyContent="space-between" pt={6}>
        <BaseButton
          onClick={prevStep}
          colorScheme="red"
          variant="subtle"
          size="lg"
          minW="120px"
        >
          Back
        </BaseButton>
        <BaseButton
          onClick={nextStep}
          size="lg"
          variant="subtle"
          colorScheme="green"
          minW="120px"
        >
          Next
        </BaseButton>
      </Box>
    </Box>
  );
};

export default StepSkills;
