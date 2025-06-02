import { MdSchool, MdVerifiedUser, MdCalendarToday } from "react-icons/md";
import { Icon, Box, Stack, Text, Badge, HStack, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { educationData, getCompletionColor } from "@/features/slideshow-form/utils/mockData";
import { getSectionStepPath } from "@/features/slideshow-form/routes";

const EducationCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(getSectionStepPath("education"));
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
        borderColor: "teal.300"
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
            as={MdSchool} 
            fontSize="2xl" 
            color="teal.500"
            _groupHover={{ color: "teal.600" }}
          />
          <Text fontSize="lg" fontWeight="semibold">
            Education
          </Text>
        </Flex>
        <Badge 
          colorPalette={getCompletionColor(educationData.completion)}
          variant="subtle"
          borderRadius="full"
        >
          {educationData.completion}%
        </Badge>
      </Flex>

      {/* Content */}
      <Stack gap={3}>
        <Box>
          <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }} mb={1}>
            Latest Degree
          </Text>
          <Text fontSize="md" fontWeight="semibold" lineClamp={1}>
            {educationData.latestDegree}
          </Text>
          <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }} mt={1}>
            {educationData.institution}
          </Text>
        </Box>

        <HStack justify="space-between">
          <Box>
            <HStack gap={1} mb={1}>
              <Icon as={MdCalendarToday} fontSize="sm" color="gray.500" />
              <Text fontSize="xs" color={{ base: "gray.600", _dark: "gray.400" }}>
                Graduated
              </Text>
            </HStack>
            <Text fontSize="lg" fontWeight="bold" color="teal.500">
              {educationData.graduationYear}
            </Text>
          </Box>
          <Box textAlign="center">
            <Text fontSize="lg" fontWeight="semibold">
              {educationData.gpa}
            </Text>
            <Text fontSize="xs" color={{ base: "gray.600", _dark: "gray.400" }}>
              GPA
            </Text>
          </Box>
          <Box textAlign="right">
            <Text fontSize="lg" fontWeight="semibold">
              {educationData.totalDegrees}
            </Text>
            <Text fontSize="xs" color={{ base: "gray.600", _dark: "gray.400" }}>
              Degrees
            </Text>
          </Box>
        </HStack>

        <Box>
          <HStack gap={2} mb={2}>
            <Icon as={MdVerifiedUser} fontSize="sm" color="teal.500" />
            <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }}>
              Certifications ({educationData.certifications.length})
            </Text>
          </HStack>
          <Stack gap={1}>
            {educationData.certifications.slice(0, 2).map((cert, index) => (
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
            {educationData.certifications.length > 2 && (
              <Text fontSize="xs" color={{ base: "gray.500", _dark: "gray.400" }}>
                +{educationData.certifications.length - 2} more certifications
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
        Click to manage your education & certifications
      </Text>
    </Box>
  );
};

export default EducationCard; 