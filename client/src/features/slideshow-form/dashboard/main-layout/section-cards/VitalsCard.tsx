import { MdPerson, MdEmail, MdPhone, MdLocationOn, MdCake } from "react-icons/md";
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

  // Function to calculate age from date of birth
  const calculateAge = (dateOfBirth: Date): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format full address
  const formatAddress = () => {
    const parts = [
      vitalsData.street,
      vitalsData.city,
      vitalsData.country
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : "Not provided";
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
            <Icon as={MdCake} fontSize="sm" color="gray.500" />
            <Text fontSize="xs" color={{ base: "gray.600", _dark: "gray.400" }}>
              Date of Birth
            </Text>
          </HStack>
          <Text fontSize="sm" fontWeight="medium">
            {vitalsData.dateOfBirth ? formatDate(vitalsData.dateOfBirth) : "Not provided"}
          </Text>
          {vitalsData.dateOfBirth && (
            <Text fontSize="xs" color="gray.500">
              Age: {calculateAge(vitalsData.dateOfBirth)} years old
            </Text>
          )}
        </Box>
      </HStack>

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
            Address
          </Text>
        </HStack>
        <Text fontSize="sm" fontWeight="medium">
          {formatAddress()}
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