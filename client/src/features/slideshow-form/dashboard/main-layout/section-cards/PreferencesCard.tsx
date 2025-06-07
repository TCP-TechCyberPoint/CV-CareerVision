import { MdSettings, MdLocationOn, MdAttachMoney, MdWork } from "react-icons/md";
import { Icon, Stack, Text, Badge, HStack, Box } from "@chakra-ui/react";

import SectionCard from "@slideshow-form/components/cards/SectionCard";
import { usePreferencesCard } from "./hooks";

const PreferencesCard = () => {
  const {
    processedData,
    handleClick,
    completionPercentage,
  } = usePreferencesCard();

  const customContent = (
    <Stack gap={3}>
      <Box>
        <Text fontSize="sm" color={{ base: "cyan.600", _dark: "cyan.400" }} mb={1}>
          Preferred Role
        </Text>
        <Text fontSize="md" fontWeight="semibold" lineClamp={1} color={{ base: "cyan.500", _dark: "cyan.300" }}>
          {processedData.preferredRole}
        </Text>
      </Box>

      <HStack justify="space-between">
        <Box>
          <HStack gap={1} mb={1}>
            <Icon as={MdWork} fontSize="sm" color="cyan.500" />
            <Text fontSize="xs" color={{ base: "cyan.600", _dark: "cyan.400" }}>
              Work Type
            </Text>
          </HStack>
          <Badge 
            colorPalette="cyan"
            variant="outline"
            size="sm"
          >
            {processedData.workType}
          </Badge>
        </Box>
        <Box textAlign="right">
          <HStack gap={1} justify="end" mb={1}>
            <Icon as={MdLocationOn} fontSize="sm" color="cyan.500" />
            <Text fontSize="xs" color={{ base: "cyan.600", _dark: "cyan.400" }}>
              Location
            </Text>
          </HStack>
          <Text fontSize="sm" fontWeight="medium" color={{ base: "cyan.500", _dark: "cyan.300" }}>
            {processedData.location}
          </Text>
        </Box>
      </HStack>

      <Box>
        <HStack gap={1} mb={1}>
          <Icon as={MdAttachMoney} fontSize="sm" color="cyan.500" />
          <Text fontSize="sm" color={{ base: "cyan.600", _dark: "cyan.400" }}>
            Salary Expectation
          </Text>
        </HStack>
        <Text fontSize="lg" fontWeight="bold" color="cyan.500">
          {processedData.salaryRange}
        </Text>
      </Box>

      <Box>
        <Text fontSize="sm" color={{ base: "cyan.600", _dark: "cyan.400" }} mb={2}>
          Preferred Industries
        </Text>
        <Text fontSize="sm" fontWeight="medium" color={{ base: "cyan.500", _dark: "cyan.300" }}>
          {processedData.industries.length > 0 
            ? processedData.industries.join(" • ") 
            : "No industries selected"
          }
        </Text>
      </Box>

      <HStack justify="space-between">
        <Badge 
          colorPalette="blue"
          variant="subtle"
          size="sm"
        >
          {processedData.jobType}
        </Badge>
        <Text fontSize="xs" color={{ base: "cyan.400", _dark: "cyan.400" }}>
          {processedData.industries.length} industries selected
        </Text>
      </HStack>
    </Stack>
  );

  return (
    <SectionCard
      title="Preferences"
      icon={<Icon as={MdSettings} />}
      completion={completionPercentage}
      themeColor="cyan"
      customContent={customContent}
      footer="Click to set your job preferences"
      onClick={handleClick}
    />
  );
};

export default PreferencesCard; 