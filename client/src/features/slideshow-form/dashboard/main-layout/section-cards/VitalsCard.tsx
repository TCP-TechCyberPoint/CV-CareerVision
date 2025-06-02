import { MdPerson, MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { Icon, Stack, Text, HStack, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { vitalsData } from "@/features/slideshow-form/utils/mockData";
import { getSectionStepPath } from "@/features/slideshow-form/routes";
import SectionCard from "@/features/slideshow-form/components/cards/SectionCard";

const VitalsCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(getSectionStepPath("vitals"));
  };

  const customContent = (
    <Stack gap={3}>
      <Box>
        <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }} mb={1}>
          Full Name
        </Text>
        <Text fontSize="md" fontWeight="medium">
          {vitalsData.name || "Not provided"}
        </Text>
      </Box>

      <HStack gap={4}>
        <Box flex="1">
          <HStack gap={2} mb={1}>
            <Icon as={MdEmail} fontSize="sm" color="gray.500" />
            <Text fontSize="xs" color={{ base: "gray.600", _dark: "gray.400" }}>
              Email
            </Text>
          </HStack>
          <Text fontSize="sm" fontWeight="medium" lineClamp={1}>
            {vitalsData.email || "Not provided"}
          </Text>
        </Box>
      </HStack>

      <HStack gap={4}>
        <Box flex="1">
          <HStack gap={2} mb={1}>
            <Icon as={MdPhone} fontSize="sm" color="gray.500" />
            <Text fontSize="xs" color={{ base: "gray.600", _dark: "gray.400" }}>
              Phone
            </Text>
          </HStack>
          <Text fontSize="sm" fontWeight="medium">
            {vitalsData.phone || "Not provided"}
          </Text>
        </Box>
      </HStack>

      <Box>
        <HStack gap={2} mb={1}>
          <Icon as={MdLocationOn} fontSize="sm" color="gray.500" />
          <Text fontSize="xs" color={{ base: "gray.600", _dark: "gray.400" }}>
            Location
          </Text>
        </HStack>
        <Text fontSize="sm" fontWeight="medium">
          {vitalsData.location || "Not provided"}
        </Text>
      </Box>
    </Stack>
  );

  return (
    <SectionCard
      title="Vitals"
      icon={<Icon as={MdPerson} />}
      completion={vitalsData.completion}
      themeColor="blue"
      customContent={customContent}
      footer="Click to edit your personal information"
      onClick={handleClick}
    />
  );
};

export default VitalsCard; 