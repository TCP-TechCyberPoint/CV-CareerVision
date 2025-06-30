import { MdSettings, MdWork, MdLocationOn, MdAttachMoney } from "react-icons/md";
import { Icon, Stack, Text, HStack, Box, Badge } from "@chakra-ui/react";

import SectionCard from "@slideshow-form/components/cards/SectionCard";
import { usePreferencesCard } from "./hooks";

const PreferencesCard = ({ mediaColumn }: { mediaColumn: "left" | "right" }) => {
  const { processedData, preferencesData, handleClick, completionPercentage } =
    usePreferencesCard();

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
            <Icon as={MdSettings} fontSize="2xl" color="gray.500" />
            <Text fontSize="xl" fontWeight="bold" color={{ base: "gray.600", _dark: "gray.400" }}>
              Preferences
            </Text>
          </HStack>
          <Text fontSize="3xl" fontWeight="bold" color="gray.500">
            {completionPercentage}%
          </Text>
        </Stack>
      </Box>

      {/* Desktop view - full data */}
      <Stack gap={3} display={{ base: "none", md: "flex" }}>
        <Box>
          <HStack gap={1} mb={1}>
            <Icon as={MdWork} fontSize="sm" color="gray.500" />
            <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }}>
              Preferred Role
            </Text>
          </HStack>
          <Text fontSize="md" fontWeight="semibold" color={{ base: "gray.500", _dark: "gray.300" }}>
            {processedData.preferredRole}
          </Text>
        </Box>

        <Box>
          <HStack gap={1} mb={1}>
            <Icon as={MdLocationOn} fontSize="sm" color="gray.500" />
            <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }}>
              Work Type
            </Text>
          </HStack>
          <Text fontSize="md" fontWeight="semibold" color={{ base: "gray.500", _dark: "gray.300" }}>
            {processedData.workType}
          </Text>
        </Box>

        <Box>
          <HStack gap={1} mb={1}>
            <Icon as={MdAttachMoney} fontSize="sm" color="gray.500" />
            <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }}>
              Salary Range
            </Text>
          </HStack>
          <Text fontSize="md" fontWeight="semibold" color={{ base: "gray.500", _dark: "gray.300" }}>
            {processedData.salaryRange}
          </Text>
        </Box>

        <Box>
          <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }} mb={2}>
            CV Style
          </Text>
          <Badge colorPalette="gray" variant="subtle" size="sm">
            {preferencesData?.cvStyle || "Not specified"}
          </Badge>
        </Box>
      </Stack>
    </>
  );

  return (
    <SectionCard
      title="Preferences"
      icon={<Icon as={MdSettings} />}
      completion={completionPercentage}
      themeColor="gray"
      customContent={customContent}
      onClick={handleClick}
      ml={{ base: mediaColumn === "left" ? 2 : 0, md: 0 }}
      mr={{ base: mediaColumn === "right" ? 2 : 0, md: 0 }}
    />
  );
};

export default PreferencesCard; 