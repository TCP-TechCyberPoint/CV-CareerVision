import { MdSettings, MdLocationOn, MdAttachMoney, MdWork } from "react-icons/md";
import { Icon, Box, Stack, Text, Badge, HStack, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { preferencesData, getCompletionColor } from "@slideshow-form/utils/mockData";
import { getSectionStepPath } from "@slideshow-form/routes";

const PreferencesCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(getSectionStepPath("preferences"));
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
        borderColor: "cyan.300"
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
            as={MdSettings} 
            fontSize="2xl" 
            color="cyan.500"
            _groupHover={{ color: "cyan.600" }}
          />
          <Text fontSize="lg" fontWeight="semibold">
            Preferences
          </Text>
        </Flex>
        <Badge 
          colorPalette={getCompletionColor(preferencesData.completion)}
          variant="subtle"
          borderRadius="full"
        >
          {preferencesData.completion}%
        </Badge>
      </Flex>

      {/* Content */}
      <Stack gap={3}>
        <Box>
          <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }} mb={1}>
            Preferred Role
          </Text>
          <Text fontSize="md" fontWeight="semibold" lineClamp={1}>
            {preferencesData.preferredRole || "Not specified"}
          </Text>
        </Box>

        <HStack justify="space-between">
          <Box>
            <HStack gap={1} mb={1}>
              <Icon as={MdWork} fontSize="sm" color="gray.500" />
              <Text fontSize="xs" color={{ base: "gray.600", _dark: "gray.400" }}>
                Work Type
              </Text>
            </HStack>
            <Badge 
              colorPalette="cyan"
              variant="outline"
              size="sm"
            >
              {preferencesData.workType}
            </Badge>
          </Box>
          <Box textAlign="right">
            <HStack gap={1} justify="end" mb={1}>
              <Icon as={MdLocationOn} fontSize="sm" color="gray.500" />
              <Text fontSize="xs" color={{ base: "gray.600", _dark: "gray.400" }}>
                Location
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="medium">
              {preferencesData.location}
            </Text>
          </Box>
        </HStack>

        <Box>
          <HStack gap={1} mb={1}>
            <Icon as={MdAttachMoney} fontSize="sm" color="gray.500" />
            <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }}>
              Salary Expectation
            </Text>
          </HStack>
          <Text fontSize="lg" fontWeight="bold" color="cyan.500">
            {preferencesData.salaryRange}
          </Text>
        </Box>

        <Box>
          <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }} mb={2}>
            Preferred Industries
          </Text>
          <Text fontSize="sm" fontWeight="medium">
            {preferencesData.industries.join(" • ")}
          </Text>
        </Box>

        <HStack justify="space-between">
          <Badge 
            colorPalette="blue"
            variant="subtle"
            size="sm"
          >
            {preferencesData.jobType}
          </Badge>
          <Text fontSize="xs" color={{ base: "gray.500", _dark: "gray.400" }}>
            {preferencesData.industries.length} industries selected
          </Text>
        </HStack>
      </Stack>

      {/* Footer */}
      <Text 
        fontSize="xs" 
        color={{ base: "gray.500", _dark: "gray.400" }} 
        mt={4}
      >
        Click to set your job preferences
      </Text>
    </Box>
  );
};

export default PreferencesCard; 