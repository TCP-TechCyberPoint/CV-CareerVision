import { MdWork, MdBusiness, MdDateRange } from "react-icons/md";
import { Icon, Box, Stack, Text, Badge, HStack, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { experienceData, getCompletionColor } from "@/features/slideshow-form/utils/mockData";
import { getSectionStepPath } from "@/features/slideshow-form/routes";

const ExperienceCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(getSectionStepPath("experience"));
  };

  return (
    <Box
      onClick={handleClick}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={{ base: "gray.200", _dark: "gray.600" }}
      p={5}
      transition="all 0.3s ease"
      _hover={{ 
        boxShadow: "lg", 
        transform: "translateY(-2px)",
        borderColor: "purple.300"
      }}
      cursor="pointer"
      boxShadow="sm"
      bg={{ base: "white", _dark: "gray.800" }}
      role="group"
    >
      {/* Header */}
      <Flex align="center" justify="space-between" mb={4}>
        <Flex align="center" gap={3}>
          <Icon 
            as={MdWork} 
            fontSize="2xl" 
            color="purple.500"
            _groupHover={{ color: "purple.600" }}
          />
          <Text fontSize="lg" fontWeight="semibold">
            Experience
          </Text>
        </Flex>
        <Badge 
          colorPalette={getCompletionColor(experienceData.completion)}
          variant="subtle"
          borderRadius="full"
        >
          {experienceData.completion}%
        </Badge>
      </Flex>

      {/* Content */}
      <Stack gap={3}>
        <Box>
          <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }} mb={1}>
            Current Position
          </Text>
          <Text fontSize="md" fontWeight="semibold" lineClamp={1}>
            {experienceData.currentRole}
          </Text>
          <HStack gap={1} mt={1}>
            <Icon as={MdBusiness} fontSize="sm" color="gray.500" />
            <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }}>
              {experienceData.currentCompany}
            </Text>
          </HStack>
        </Box>

        <HStack justify="space-between">
          <Box>
            <HStack gap={1} mb={1}>
              <Icon as={MdDateRange} fontSize="sm" color="gray.500" />
              <Text fontSize="xs" color={{ base: "gray.600", _dark: "gray.400" }}>
                Total Experience
              </Text>
            </HStack>
            <Text fontSize="lg" fontWeight="bold" color="purple.500">
              {experienceData.totalExperience}
            </Text>
          </Box>
          <Box textAlign="right">
            <Text fontSize="lg" fontWeight="semibold">
              {experienceData.totalJobs}
            </Text>
            <Text fontSize="xs" color={{ base: "gray.600", _dark: "gray.400" }}>
              Companies
            </Text>
          </Box>
        </HStack>

        <Box>
          <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }} mb={2}>
            Recent Companies
          </Text>
          <Stack gap={1}>
            {experienceData.recentCompanies.slice(0, 2).map((company, index) => (
              <Text 
                key={index}
                fontSize="sm" 
                fontWeight="medium"
                color={{ base: "gray.700", _dark: "gray.300" }}
              >
                • {company}
              </Text>
            ))}
            {experienceData.recentCompanies.length > 2 && (
              <Text fontSize="xs" color={{ base: "gray.500", _dark: "gray.400" }}>
                +{experienceData.recentCompanies.length - 2} more
              </Text>
            )}
          </Stack>
        </Box>
      </Stack>

      {/* Footer */}
      <Text 
        fontSize="xs" 
        color={{ base: "gray.500", _dark: "gray.400" }} 
        mt={4}
      >
        Click to manage your work experience
      </Text>
    </Box>
  );
};

export default ExperienceCard; 