import { MdWork, MdBusiness, MdDateRange } from "react-icons/md";
import { Icon, Stack, Text, HStack, Box } from "@chakra-ui/react";

import SectionCard from "@slideshow-form/components/cards/SectionCard";
import { useExperienceStepForm } from "./hooks";
import type { Experience } from "@/features/slideshow-form/types";

const ExperienceStepForm = ({ mediaColumn }: { mediaColumn: "left" | "right" }) => {
  const { processedData, handleClick, completionPercentage } =
    useExperienceStepForm();

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
            <Icon as={MdWork} fontSize="2xl" color="green.500" />
            <Text fontSize="xl" fontWeight="bold" color={{ base: "green.600", _dark: "green.400" }}>
              Experience
            </Text>
          </HStack>
          <Text fontSize="3xl" fontWeight="bold" color="green.500">
            {completionPercentage}%
          </Text>
        </Stack>
      </Box>

      {/* Desktop view - full data */}
      <Stack gap={3} display={{ base: "none", md: "flex" }}>
        <Box>
          <Text
            fontSize="sm"
            color={{ base: "green.600", _dark: "green.400" }}
            mb={1}
          >
            Current Position
          </Text>
          <Text fontSize="md" fontWeight="semibold" lineClamp={1} color={{ base: "green.500", _dark: "green.300" }}>
            {processedData.currentRole}
          </Text>
          <HStack gap={1} mt={1}>
            <Icon as={MdBusiness} fontSize="sm" color="green.500" />
            <Text fontSize="sm" color={{ base: "green.400", _dark: "green.400" }}>
              {processedData.currentCompany}
            </Text>
          </HStack>
        </Box>

        <HStack justify="space-between">
          <Box>
            <HStack gap={1} mb={1}>
              <Icon as={MdDateRange} fontSize="sm" color="green.500" />
              <Text fontSize="xs" color={{ base: "green.600", _dark: "green.400" }}>
                Total Experience
              </Text>
            </HStack>
            <Text fontSize="lg" fontWeight="bold" color="green.500">
              {processedData.totalExperience}
            </Text>
          </Box>
          <Box textAlign="right">
            <Text fontSize="lg" fontWeight="semibold" color={{ base: "green.500", _dark: "green.300" }}>
              {processedData.totalJobs}
            </Text>
            <Text fontSize="xs" color={{ base: "green.600", _dark: "green.400" }}>
              Companies
            </Text>
          </Box>
        </HStack>

        <Box>
          <Text
            fontSize="sm"
            color={{ base: "green.600", _dark: "green.400" }}
            mb={2}
          >
            Recent Companies
          </Text>
          <Stack gap={1}>
            {processedData.recentCompanies 
              .slice(0, 2)
              .map((company:Experience["company"], index: number) => (
                <Text
                  key={index}
                  fontSize="sm"
                  fontWeight="medium"
                  color={{ base: "green.500", _dark: "green.300" }}
                >
                  • {company}
                </Text>
              ))}
            {processedData.recentCompanies.length > 2 && (
              <Text fontSize="xs" color={{ base: "green.400", _dark: "green.400" }}>
                +{processedData.recentCompanies.length - 2} more
              </Text>
            )}
            {processedData.recentCompanies.length === 0 && (
              <Text fontSize="sm" color={{ base: "green.400", _dark: "green.400" }}>
                No experience added yet
              </Text>
            )}
          </Stack>
        </Box>
      </Stack>
    </>
  );

  return (
    <SectionCard
      title="Experience"
      icon={<Icon as={MdWork} />}
      completion={completionPercentage}
      themeColor="green"
      customContent={customContent}
      onClick={handleClick}
      ml={{ base: mediaColumn === "left" ? 2 : 0, md: 0 }}
      mr={{ base: mediaColumn === "right" ? 2 : 0, md: 0 }}
    />
  );
};

export default ExperienceStepForm;
