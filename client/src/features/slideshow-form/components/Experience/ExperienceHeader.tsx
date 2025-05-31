import { Box, Text } from "@chakra-ui/react";

const ExperienceHeader = () => {
  return (
    <Box textAlign="center">
      <Text fontSize="3xl" fontWeight="bold" color="purple.600" mb={2}>
        Experience
      </Text>
      <Text fontSize="lg" color="gray.600" fontStyle="italic">
        ✨ Show Your Journey ✨
      </Text>
    </Box>
  );
};

export default ExperienceHeader; 