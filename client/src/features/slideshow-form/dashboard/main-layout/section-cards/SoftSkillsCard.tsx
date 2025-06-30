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

const SoftSkillsCard = ({ mediaColumn }: { mediaColumn: "left" | "right" }) => {
  const { processedData, handleClick, completionPercentage } =
    useSoftSkillsCard();

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
            <Icon as={MdPsychology} fontSize="2xl" color="pink.500" />
            <Text fontSize="xl" fontWeight="bold" color={{ base: "pink.600", _dark: "pink.400" }}>
              Soft Skills
            </Text>
          </HStack>
          <Text fontSize="3xl" fontWeight="bold" color="pink.500">
            {completionPercentage}%
          </Text>
        </Stack>
      </Box>

      {/* Desktop view - full data */}
      <Box display={{ base: "none", md: "block" }}>
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
      </Box>
    </>
  );

  return (
    <SectionCard
      title="Soft Skills"
      icon={<Icon as={MdPsychology} />}
      completion={completionPercentage}
      themeColor="pink"
      customContent={customContent}
      onClick={handleClick}
      ml={{ base: mediaColumn === "left" ? 2 : 0, md: 0 }}
      mr={{ base: mediaColumn === "right" ? 2 : 0, md: 0 }}
    />
  );
};

export default SoftSkillsCard;
