import { MdBuild } from "react-icons/md";
import { Icon, Stack, Text, Badge, HStack, Box, Wrap } from "@chakra-ui/react";

import SectionCard from "@slideshow-form/components/cards/SectionCard";
import { useHardSkillsCard } from "./hooks";

const HardSkillsCard = ({ mediaColumn }: { mediaColumn: "left" | "right" }) => {
  const { processedData, handleClick, completionPercentage } =
    useHardSkillsCard();

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
            <Icon as={MdBuild} fontSize="2xl" color="orange.500" />
            <Text fontSize="xl" fontWeight="bold" color={{ base: "orange.600", _dark: "orange.400" }}>
              Hard Skills
            </Text>
          </HStack>
          <Text fontSize="3xl" fontWeight="bold" color="orange.500">
            {completionPercentage}%
          </Text>
        </Stack>
      </Box>

      {/* Desktop view - full data */}
      <Box display={{ base: "none", md: "block" }}>
        <HStack gap={2} align="baseline">
          <Text fontSize="3xl" fontWeight="bold" color="orange.500">
            {processedData.totalSkills}
          </Text>
          <Text fontSize="xs" color={{ base: "orange.600", _dark: "orange.400" }}>
            Skills Added
          </Text>
        </HStack>

        <Box>
          <Text
            fontSize="sm"
            fontWeight="semibold"
            color={{ base: "orange.600", _dark: "orange.400" }}
            mb={2}
          >
            Top Skills
          </Text>
          <Wrap gap={2}>
            {processedData.skills.map((skill: string, index: number) => (
              <Badge key={index} colorPalette="orange" variant="subtle" size="sm">
                {skill}
              </Badge>
            ))} 
            {processedData.skills.length === 0 && (
              <Text fontSize="sm" color={{ base: "orange.400", _dark: "orange.400" }}>
                No skills added yet
              </Text>
            )}
          </Wrap>
        </Box>
      </Box>
    </>
  );

  return (
    <SectionCard
      title="Hard Skills"
      icon={<Icon as={MdBuild} />}
      completion={completionPercentage}
      themeColor="orange"
      customContent={customContent}
      onClick={handleClick}
      ml={{ base: mediaColumn === "left" ? 2 : 0, md: 0 }}
      mr={{ base: mediaColumn === "right" ? 2 : 0, md: 0 }}
    />
  );
};

export default HardSkillsCard;
