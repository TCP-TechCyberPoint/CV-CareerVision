import { MdFolder, MdCode, MdLink, MdStar } from "react-icons/md";
import { Icon, Stack, Text, Badge, HStack, Box, Wrap } from "@chakra-ui/react";

import SectionCard from "@slideshow-form/components/cards/SectionCard";
import { useProjectsCard } from "./hooks";

const ProjectsCard = () => {
  const {
    processedData,
    handleClick,
    completionPercentage,
  } = useProjectsCard();

  const customContent = (
    <Stack gap={3}>
      <HStack justify="space-between">
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="orange.500">
            {processedData.totalProjects}
          </Text>
          <Text fontSize="xs" color={{ base: "orange.600", _dark: "orange.400" }}>
            Total Projects
          </Text>
        </Box>
        <Box textAlign="center">
          <HStack gap={1} justify="center" mb={1}>
            <Icon as={MdLink} fontSize="sm" color="orange.500" />
            <Text fontSize="lg" fontWeight="semibold" color={{ base: "orange.500", _dark: "orange.300" }}>
              {processedData.liveProjects}
            </Text>
          </HStack>
          <Text fontSize="xs" color={{ base: "orange.600", _dark: "orange.400" }}>
            Live
          </Text>
        </Box>
        <Box textAlign="right">
          <HStack gap={1} justify="end" mb={1}>
            <Icon as={MdCode} fontSize="sm" color="orange.500" />
            <Text fontSize="lg" fontWeight="semibold" color={{ base: "orange.500", _dark: "orange.300" }}>
              {processedData.githubRepos}
            </Text>
          </HStack>
          <Text fontSize="xs" color={{ base: "orange.600", _dark: "orange.400" }}>
            Repos
          </Text>
        </Box>
      </HStack>

      <Box>
        <HStack gap={2} mb={2}>
          <Icon as={MdStar} fontSize="sm" color="orange.500" />
          <Text fontSize="sm" color={{ base: "orange.600", _dark: "orange.400" }}>
            Featured Projects
          </Text>
        </HStack>
        <Stack gap={1}>
          {processedData.featuredProjects.map((project, index) => (
            <Text 
              key={index}
              fontSize="sm" 
              fontWeight="medium"
              color={{ base: "orange.500", _dark: "orange.300" }}
            >
              • {project}
            </Text>
          ))}
          {processedData.featuredProjects.length === 0 && (
            <Text fontSize="sm" color={{ base: "orange.400", _dark: "orange.400" }}>
              No projects added yet
            </Text>
          )}
        </Stack>
      </Box>

      <Box>
        <Text fontSize="sm" color={{ base: "orange.600", _dark: "orange.400" }} mb={2}>
          Top Technologies
        </Text>
        <Wrap gap={2}>
          {processedData.technologies.slice(0, 3).map((tech, index) => (
            <Badge 
              key={index}
              colorPalette="orange"
              variant="outline"
              size="sm"
            >
              {tech}
            </Badge>
          ))}
          {processedData.technologies.length > 3 && (
            <Badge 
              colorPalette="gray"
              variant="subtle"
              size="sm"
            >
              +{processedData.technologies.length - 3}
            </Badge>
          )}
          {processedData.technologies.length === 0 && (
            <Text fontSize="sm" color={{ base: "orange.400", _dark: "orange.400" }}>
              No technologies specified
            </Text>
          )}
        </Wrap>
      </Box>
    </Stack>
  );

  return (
    <SectionCard
      title="Projects"
      icon={<Icon as={MdFolder} />}
      completion={completionPercentage}
      themeColor="orange"
      customContent={customContent}
      footer="Click to showcase your projects"
      onClick={handleClick}
    />
  );
};

export default ProjectsCard; 