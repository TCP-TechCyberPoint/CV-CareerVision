import { MdFolder, MdCode, MdStar } from "react-icons/md";
import { Icon, Stack, Text, Badge, HStack, Box } from "@chakra-ui/react";

import SectionCard from "@slideshow-form/components/cards/SectionCard";
import { useProjectsCard } from "./hooks";

const ProjectsCard = ({ mediaColumn }: { mediaColumn: "left" | "right" }) => {
  const {
    processedData,
    handleClick,
    completionPercentage,
  } = useProjectsCard();

  const customContent = (
    <>
      {/* Mobile view - simplified tile */}
      <Box 
        display={{ base: "flex", md: "none" }} 
        alignItems="center" 
        justifyContent="center" 
        h="full"
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex="1"
      >
        <Stack gap={2} align="center" textAlign="center">
          <HStack gap={2} align="center">
            <Icon as={MdCode} fontSize="2xl" color="purple.500" />
            <Text fontSize="xl" fontWeight="bold" color={{ base: "purple.600", _dark: "purple.400" }}>
              Projects
            </Text>
          </HStack>
          <Text fontSize="3xl" fontWeight="bold" color="purple.500">
            {completionPercentage}%
          </Text>
        </Stack>
      </Box>

      {/* Desktop view - full data */}
      <Stack gap={3} display={{ base: "none", md: "flex" }}>
        <HStack justify="space-between">
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="purple.500">
              {processedData.totalProjects}
            </Text>
            <Text fontSize="xs" color={{ base: "purple.600", _dark: "purple.400" }}>
              Projects Added
            </Text>
          </Box>
          <Box textAlign="right">
            <Text fontSize="lg" fontWeight="bold" color="purple.500">
              {processedData.technologies.length}
            </Text>
            <Text fontSize="xs" color={{ base: "purple.600", _dark: "purple.400" }}>
              Technologies
            </Text>
          </Box>
        </HStack>

        <Box>
          <Text
            fontSize="sm"
            color={{ base: "purple.600", _dark: "purple.400" }}
            mb={2}
          >
            Featured Projects
          </Text>
          <Stack gap={1}>
            {processedData.featuredProjects.slice(0, 2).map((project, index) => (
              <Text
                key={index}
                fontSize="sm"
                fontWeight="medium"
                color={{ base: "purple.500", _dark: "purple.300" }}
              >
                • {project}
              </Text>
            ))}
            {processedData.featuredProjects.length === 0 && (
              <Text fontSize="sm" color={{ base: "purple.400", _dark: "purple.400" }}>
                No projects added yet
              </Text>
            )}
          </Stack>
        </Box>

        <Box>
          <HStack gap={1} mb={2}>
            <Icon as={MdStar} fontSize="sm" color="purple.500" />
            <Text fontSize="sm" color={{ base: "purple.600", _dark: "purple.400" }}>
              Top Technologies
            </Text>
          </HStack>
          <Stack gap={1}>
            {processedData.technologies.slice(0, 3).map((tech, index) => (
              <Badge
                key={index}
                colorPalette="purple"
                variant="subtle"
                size="sm"
                width="fit-content"
              >
                {tech}
              </Badge>
            ))}
            {processedData.technologies.length > 3 && (
              <Text fontSize="xs" color={{ base: "purple.400", _dark: "purple.400" }}>
                +{processedData.technologies.length - 3} more
              </Text>
            )}
            {processedData.technologies.length === 0 && (
              <Text fontSize="sm" color={{ base: "purple.400", _dark: "purple.400" }}>
                No technologies added yet
              </Text>
            )}
          </Stack>
        </Box>
      </Stack>
    </>
  );

  return (
    <SectionCard
      title="Projects"
      icon={<Icon as={MdFolder} />}
      completion={completionPercentage}
      themeColor="purple"
      customContent={customContent}
      onClick={handleClick}
      ml={{ base: mediaColumn === "left" ? 2 : 0, md: 0 }}
      mr={{ base: mediaColumn === "right" ? 2 : 0, md: 0 }}
    />
  );
};

export default ProjectsCard; 