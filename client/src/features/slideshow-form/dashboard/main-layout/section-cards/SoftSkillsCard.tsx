import { MdPsychology } from "react-icons/md";
import {
  Icon,
  Stack,
  Text,
  HStack,
  Box,
  Flex,
  Badge,
} from "@chakra-ui/react";

import SectionCard from "@slideshow-form/components/cards/SectionCard";
import { useSoftSkillsCard } from "./hooks";

const SoftSkillsCard = () => {
  const { processedData, handleClick, completionPercentage } =
    useSoftSkillsCard();

  const customContent = (
    <Stack gap={3}>
      <HStack justify="space-between">
        <HStack gap={2} align="baseline">
          <Text fontSize="2xl" fontWeight="bold" color="pink.500">
            {processedData.totalSkills}
          </Text>
          <Text fontSize="xs" color={{ base: "pink.600", _dark: "pink.400" }}>
            Skills Added
          </Text>
        </HStack>
        <HStack gap={2} align="baseline">
          <Text fontSize="lg" fontWeight="bold" color="pink.500">
            {processedData.categories.length}
          </Text>
          <Text fontSize="xs" color={{ base: "pink.600", _dark: "pink.400" }}>
            Categories
          </Text>
        </HStack>
      </HStack>

      <Box>
        <Text
          fontSize="sm"
          fontWeight="semibold"
          color={{ base: "pink.600", _dark: "pink.400" }}
          mb={3}
        >
          Your Skills
        </Text>
        {processedData.skills.length > 0 ? (
          <Flex wrap="wrap" gap={2}>
            {processedData.skills.map((skill, index) => (
              <Badge
                key={index}
                colorPalette="pink"
                variant="subtle"
                px={2}
                py={1}
                borderRadius="md"
                fontSize="xs"
              >
                {skill}
              </Badge>
            ))}
          </Flex>
        ) : (
          <Text fontSize="sm" color={{ base: "pink.400", _dark: "pink.400" }}>
            No soft skills added yet
          </Text>
        )}
      </Box>
    </Stack>
  );

  return (
    <SectionCard
      title="Soft Skills"
      icon={<Icon as={MdPsychology} />}
      completion={completionPercentage}
      themeColor="pink"
      customContent={customContent}
      footer="Click to manage your interpersonal skills"
      onClick={handleClick}
    />
  );
};

export default SoftSkillsCard;
