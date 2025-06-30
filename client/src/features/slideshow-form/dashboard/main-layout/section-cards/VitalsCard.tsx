import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdCake,
} from "react-icons/md";
import { Icon, SimpleGrid, Text, HStack, Box, Stack } from "@chakra-ui/react";

import SectionCard from "@slideshow-form/components/cards/SectionCard";
import { useVitalsCard } from "./hooks";

const VitalsCard = ({ mediaColumn }: { mediaColumn: "left" | "right" }) => {
  const { vitalsData, handleClick, formatAddress, completionPercentage } =
    useVitalsCard();

  const calculateAge = (dob: string | Date | undefined): string | number => {
    const date = new Date(dob ?? "");
    if (isNaN(date.getTime())) return "N/A";
    
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    
    // If birthday hasn't occurred yet this year, subtract 1 from age
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
      age--;
    }
    
    return age;
  };

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
            <Icon as={MdPerson} fontSize="2xl" color="blue.500" />
            <Text fontSize="xl" fontWeight="bold" color={{ base: "blue.600", _dark: "blue.400" }}>
              Vitals
            </Text>
          </HStack>
          <Text fontSize="3xl" fontWeight="bold" color="blue.500">
            {completionPercentage}%
          </Text>
        </Stack>
      </Box>

      {/* Desktop view - full data */}
      <SimpleGrid columns={2} gap={4} display={{ base: "none", md: "grid" }}>
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
    </>
  );

  return (
    <SectionCard
      title="Vitals"
      icon={<Icon as={MdPerson} />}
      completion={completionPercentage}
      themeColor="blue"
      customContent={customContent}
      onClick={handleClick}
      ml={{ base: mediaColumn === "left" ? 2 : 0, md: 0 }}
      mr={{ base: mediaColumn === "right" ? 2 : 0, md: 0 }}
    />
  );
};

export default VitalsCard;
