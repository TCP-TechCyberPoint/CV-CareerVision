import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdCake,
} from "react-icons/md";
import { Icon, SimpleGrid, Text, HStack, Box } from "@chakra-ui/react";

import SectionCard from "@slideshow-form/components/cards/SectionCard";
import { useVitalsCard } from "./hooks";

const VitalsCard = () => {
  const { vitalsData, handleClick, formatAddress, completionPercentage } =
    useVitalsCard();

  const calculateAge = (dob: string | Date | undefined): string | number => {
    const date = new Date(dob ?? "");
    if (isNaN(date.getTime())) return "N/A";
    return new Date().getFullYear() - date.getFullYear();
  };

  const customContent = (
    <SimpleGrid columns={2} gap={4}>
      <Box>
        <Text
          fontSize="sm"
          fontWeight="semibold"
          color={{ base: "blue.600", _dark: "blue.400" }}
          mb={1}
        >
          Full Name
        </Text>
        <Text
          fontSize="md"
          fontWeight="medium"
          color={{ base: "blue.500", _dark: "blue.300" }}
        >
          {vitalsData?.name || "Not provided"}
        </Text>
      </Box>

      <Box>
        <HStack gap={2} mb={1}>
          <Icon as={MdCake} fontSize="sm" color="blue.500" />
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color={{ base: "blue.600", _dark: "blue.400" }}
          >
            Date of Birth
          </Text>
        </HStack>
        <Text
          fontSize="sm"
          fontWeight="medium"
          color={{ base: "blue.500", _dark: "blue.300" }}
        >
          {vitalsData?.dateOfBirth
            ? new Date(vitalsData.dateOfBirth).toLocaleDateString()
            : "Not provided"}
        </Text>
        <Text fontSize="xs" color={{ base: "blue.400", _dark: "blue.400" }}>
          Age: {calculateAge(vitalsData?.dateOfBirth)}
        </Text>
      </Box>

      <Box>
        <HStack gap={2} mb={1}>
          <Icon as={MdEmail} fontSize="sm" color="blue.500" />
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color={{ base: "blue.600", _dark: "blue.400" }}
          >
            Email
          </Text>
        </HStack>
        <Text
          fontSize="sm"
          fontWeight="medium"
          lineClamp={1}
          color={{ base: "blue.500", _dark: "blue.300" }}
        >
          {vitalsData?.email || "Not provided"}
        </Text>
      </Box>

      <Box>
        <HStack gap={2} mb={1}>
          <Icon as={MdPhone} fontSize="sm" color="blue.500" />
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color={{ base: "blue.600", _dark: "blue.400" }}
          >
            Phone
          </Text>
        </HStack>
        <Text
          fontSize="sm"
          fontWeight="medium"
          color={{ base: "blue.500", _dark: "blue.300" }}
        >
          {vitalsData?.phone || "Not provided"}
        </Text>
      </Box>

      <Box gridColumn="1 / -1">
        <HStack gap={2} mb={1}>
          <Icon as={MdLocationOn} fontSize="sm" color="blue.500" />
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color={{ base: "blue.600", _dark: "blue.400" }}
          >
            Address
          </Text>
        </HStack>
        <Text
          fontSize="sm"
          fontWeight="medium"
          color={{ base: "blue.500", _dark: "blue.300" }}
        >
          {formatAddress()}
        </Text>
      </Box>
    </SimpleGrid>
  );

  return (
    <SectionCard
      title="Vitals"
      icon={<Icon as={MdPerson} />}
      completion={completionPercentage}
      themeColor="blue"
      customContent={customContent}
      footer="Click to edit your personal information"
      onClick={handleClick}
    />
  );
};

export default VitalsCard;
