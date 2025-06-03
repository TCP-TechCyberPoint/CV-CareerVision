import { MdFolder, MdCode, MdLink, MdStar } from "react-icons/md";
import { Icon, Box, Stack, Text, Badge, HStack, Flex, Wrap } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { projectsData, getCompletionColor } from "@slideshow-form/utils/mockData";
import { getSectionStepPath } from "@slideshow-form/routes";

const ProjectsCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(getSectionStepPath("projects"));
  };

  return (
    <Box
      onClick={handleClick}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={{ base: "gray.200", _dark: "gray.600" }}
      p={5}
      transition="all 0.3s ease"
      _hover={{ 
        boxShadow: "lg", 
        transform: "translateY(-2px)",
        borderColor: "orange.300"
      }}
      cursor="pointer"
      boxShadow="sm"
      bg={{ base: "white", _dark: "gray.800" }}
      role="group"
    >
      {/* Header */}
      <Flex align="center" justify="space-between" mb={4}>
        <Flex align="center" gap={3}>
          <Icon 
            as={MdFolder} 
            fontSize="2xl" 
            color="orange.500"
            _groupHover={{ color: "orange.600" }}
          />
          <Text fontSize="lg" fontWeight="semibold">
            Projects
          </Text>
        </Flex>
        <Badge 
          colorPalette={getCompletionColor(projectsData.completion)}
          variant="subtle"
          borderRadius="full"
        >
          {projectsData.completion}%
        </Badge>
      </Flex>

      {/* Content */}
      <Stack gap={3}>
        <HStack justify="space-between">
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color="orange.500">
              {projectsData.totalProjects}
            </Text>
            <Text fontSize="xs" color={{ base: "gray.600", _dark: "gray.400" }}>
              Total Projects
            </Text>
          </Box>
          <Box textAlign="center">
            <HStack gap={1} justify="center" mb={1}>
              <Icon as={MdLink} fontSize="sm" color="gray.500" />
              <Text fontSize="lg" fontWeight="semibold">
                {projectsData.liveProjects}
              </Text>
            </HStack>
            <Text fontSize="xs" color={{ base: "gray.600", _dark: "gray.400" }}>
              Live
            </Text>
          </Box>
          <Box textAlign="right">
            <HStack gap={1} justify="end" mb={1}>
              <Icon as={MdCode} fontSize="sm" color="gray.500" />
              <Text fontSize="lg" fontWeight="semibold">
                {projectsData.githubRepos}
              </Text>
            </HStack>
            <Text fontSize="xs" color={{ base: "gray.600", _dark: "gray.400" }}>
              Repos
            </Text>
          </Box>
        </HStack>

        <Box>
          <HStack gap={2} mb={2}>
            <Icon as={MdStar} fontSize="sm" color="orange.500" />
            <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }}>
              Featured Projects
            </Text>
          </HStack>
          <Stack gap={1}>
            {projectsData.featuredProjects.map((project, index) => (
              <Text 
                key={index}
                fontSize="sm" 
                fontWeight="medium"
                color={{ base: "gray.700", _dark: "gray.300" }}
              >
                • {project}
              </Text>
            ))}
          </Stack>
        </Box>

        <Box>
          <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }} mb={2}>
            Top Technologies
          </Text>
          <Wrap gap={2}>
            {projectsData.technologies.slice(0, 3).map((tech, index) => (
              <Badge 
                key={index}
                colorPalette="orange"
                variant="outline"
                size="sm"
              >
                {tech}
              </Badge>
            ))}
            {projectsData.technologies.length > 3 && (
              <Badge 
                colorPalette="gray"
                variant="subtle"
                size="sm"
              >
                +{projectsData.technologies.length - 3}
              </Badge>
            )}
          </Wrap>
        </Box>
      </Stack>

      {/* Footer */}
      <Text 
        fontSize="xs" 
        color={{ base: "gray.500", _dark: "gray.400" }} 
        mt={4}
      >
        Click to showcase your projects
      </Text>
    </Box>
  );
};

export default ProjectsCard; 