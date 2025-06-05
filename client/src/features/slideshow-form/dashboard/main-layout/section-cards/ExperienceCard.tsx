import { MdWork, MdBusiness, MdDateRange } from "react-icons/md";
import { Icon, Stack, Text, HStack, Box } from "@chakra-ui/react";

import SectionCard from "@slideshow-form/components/cards/SectionCard";
import { useExperienceCard } from "./hooks";

const ExperienceCard = () => {
  const { processedData, handleClick, completionPercentage } =
    useExperienceCard();

  const customContent = (
    <Stack gap={3}>
      <Box>
        <Text
          fontSize="sm"
          color={{ base: "purple.600", _dark: "purple.400" }}
          mb={1}
        >
          Current Position
        </Text>
        <Text fontSize="md" fontWeight="semibold" lineClamp={1} color={{ base: "purple.500", _dark: "purple.300" }}>
          {processedData.currentRole}
        </Text>
        <HStack gap={1} mt={1}>
          <Icon as={MdBusiness} fontSize="sm" color="purple.500" />
          <Text fontSize="sm" color={{ base: "purple.400", _dark: "purple.400" }}>
            {processedData.currentCompany}
          </Text>
        </HStack>
      </Box>

      <HStack justify="space-between">
        <Box>
          <HStack gap={1} mb={1}>
            <Icon as={MdDateRange} fontSize="sm" color="purple.500" />
            <Text fontSize="xs" color={{ base: "purple.600", _dark: "purple.400" }}>
              Total Experience
            </Text>
          </HStack>
          <Text fontSize="lg" fontWeight="bold" color="purple.500">
            {processedData.totalExperience}
          </Text>
        </Box>
        <Box textAlign="right">
          <Text fontSize="lg" fontWeight="semibold" color={{ base: "purple.500", _dark: "purple.300" }}>
            {processedData.totalJobs}
          </Text>
          <Text fontSize="xs" color={{ base: "purple.600", _dark: "purple.400" }}>
            Companies
          </Text>
        </Box>
      </HStack>

      <Box>
        <Text
          fontSize="sm"
          color={{ base: "purple.600", _dark: "purple.400" }}
          mb={2}
        >
          Recent Companies
        </Text>
        <Stack gap={1}>
          {processedData.recentCompanies
            .slice(0, 2)
            .map((company: any, index: any) => (
              <Text
                key={index}
                fontSize="sm"
                fontWeight="medium"
                color={{ base: "purple.500", _dark: "purple.300" }}
              >
                • {company}
              </Text>
            ))}
          {processedData.recentCompanies.length > 2 && (
            <Text fontSize="xs" color={{ base: "purple.400", _dark: "purple.400" }}>
              +{processedData.recentCompanies.length - 2} more
            </Text>
          )}
          {processedData.recentCompanies.length === 0 && (
            <Text fontSize="sm" color={{ base: "purple.400", _dark: "purple.400" }}>
              No experience added yet
            </Text>
          )}
        </Stack>
      </Box>
    </Stack>
  );

  return (
    <SectionCard
      title="Experience"
      icon={<Icon as={MdWork} />}
      completion={completionPercentage}
      themeColor="purple"
      customContent={customContent}
      footer="Click to manage your work experience"
      onClick={handleClick}
    />
  );
};

export default ExperienceCard;
