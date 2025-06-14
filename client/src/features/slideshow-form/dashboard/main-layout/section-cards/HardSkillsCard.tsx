import { MdBuild } from "react-icons/md";
import { Icon, Stack, Text, Badge, HStack, Box, Wrap } from "@chakra-ui/react";

import SectionCard from "@slideshow-form/components/cards/SectionCard";
import { useHardSkillsCard } from "./hooks";

const HardSkillsCard = () => {
  const { processedData, handleClick, completionPercentage } =
    useHardSkillsCard();

  const customContent = (
    <Stack gap={3}>
      <HStack gap={2} align="baseline">
        <Text fontSize="3xl" fontWeight="bold" color="green.500">
          {processedData.totalSkills}
        </Text>
        <Text fontSize="xs" color={{ base: "green.600", _dark: "green.400" }}>
          Skills Added
        </Text>
      </HStack>

      <Box>
        <Text
          fontSize="sm"
          fontWeight="semibold"
          color={{ base: "green.600", _dark: "green.400" }}
          mb={2}
        >
          Top Skills
        </Text>
        <Wrap gap={2}>
          {processedData.topSkills.map((skill: string, index: number) => (
            <Badge key={index} colorPalette="green" variant="subtle" size="sm">
              {skill}
            </Badge>
          ))}
          {processedData.topSkills.length === 0 && (
            <Text fontSize="sm" color={{ base: "green.400", _dark: "green.400" }}>
              No skills added yet
            </Text>
          )}
        </Wrap>
      </Box>
    </Stack>
  );

  return (
    <SectionCard
      title="Hard Skills"
      icon={<Icon as={MdBuild} />}
      completion={completionPercentage}
      themeColor="green"
      customContent={customContent}
      footer="Click to manage your technical skills"
      onClick={handleClick}
    />
  );
};

export default HardSkillsCard;
