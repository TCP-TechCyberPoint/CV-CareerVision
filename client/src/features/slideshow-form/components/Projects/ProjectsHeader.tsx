import { Box, Text } from "@chakra-ui/react";

const ProjectsHeader = () => {
  return (
    <Box textAlign="center">
      <Text fontSize="3xl" fontWeight="bold" color="blue.600" mb={2}>
        Projects
      </Text>
      <Text fontSize="lg" color="gray.600" fontStyle="italic">
        🚀 Showcase Your Work 🚀
      </Text>
    </Box>
  );
};

export default ProjectsHeader; 