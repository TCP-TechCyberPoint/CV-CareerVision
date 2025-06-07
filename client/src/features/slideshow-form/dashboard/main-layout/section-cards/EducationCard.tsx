import { MdSchool, MdVerifiedUser, MdCalendarToday } from "react-icons/md";
import { Icon, Box, Stack, Text, Badge, HStack } from "@chakra-ui/react";

import SectionCard from "@slideshow-form/components/cards/SectionCard";
import { useEducationCard } from "./hooks";

const EducationCard = () => {
  const {
    processedData,
    handleClick,
    completionPercentage,
  } = useEducationCard();

  const customContent = (
    <Stack gap={3}>
      <Box>
        <Text fontSize="sm"  color={{ base: "teal.600", _dark: "teal.400" }} mb={1}>
          Latest Degree
        </Text>
        <Text fontSize="md" fontWeight="semibold" lineClamp={1} color={{ base: "teal.500", _dark: "teal.300" }}>
          {processedData.latestDegree}
        </Text>
        <Text fontSize="sm" color={{ base: "teal.600", _dark: "teal.400" }} mt={1}>
          {processedData.institution}
        </Text>
      </Box>

      <HStack justify="space-between">
        <Box>
          <HStack gap={1} mb={1}>
            <Icon as={MdCalendarToday} fontSize="sm" color="teal.500" />
            <Text fontSize="xs"  color={{ base: "teal.600", _dark: "teal.400" }}>
              Graduated
            </Text>
          </HStack>
          <Text fontSize="lg" fontWeight="bold" color="teal.500">
            {processedData.graduationYear}
          </Text>
        </Box>
      </HStack>

      <Box>
        <HStack gap={2} mb={2}>
          <Icon as={MdVerifiedUser} fontSize="sm" color="teal.500" />
          <Text fontSize="sm" color={{ base: "teal.600", _dark: "teal.400" }}>
            Certifications ({processedData.certifications.length})
          </Text>
        </HStack>
        <Stack gap={1}>
          {processedData.certifications.slice(0, 2).map((cert, index) => (
            <Badge 
              key={index}
              colorPalette="teal"
              variant="outline"
              size="sm"
              width="fit-content"
            >
              {cert}
            </Badge>
          ))}
          {processedData.certifications.length > 2 && (
            <Text fontSize="xs" color={{ base: "teal.400", _dark: "teal.400" }}>
              +{processedData.certifications.length - 2} more certifications
            </Text>
          )}
          {processedData.certifications.length === 0 && (
            <Text fontSize="sm" color={{ base: "teal.400", _dark: "teal.400" }}>
              No certifications added yet
            </Text>
          )}
        </Stack>
      </Box>
    </Stack>
  );

  return (
    <SectionCard
      title="Education"
      icon={<Icon as={MdSchool} />}
      completion={completionPercentage}
      themeColor="teal"
      customContent={customContent}
      footer="Click to manage your education & certifications"
      onClick={handleClick}
    />
  );
};

export default EducationCard; 