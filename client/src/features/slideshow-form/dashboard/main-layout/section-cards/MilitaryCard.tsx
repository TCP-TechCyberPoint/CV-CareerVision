import { MdSecurity, MdStar, MdCalendarToday } from "react-icons/md";
import { Icon, Stack, Text, HStack, Box, Badge } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { SectionCard } from "@/features/slideshow-form/components/cards";
import { useMilitaryCard } from "./hooks";
import { getSectionStepPath } from "@slideshow-form/routes";

const MilitaryCard = ({ mediaColumn }: { mediaColumn: "left" | "right" }) => {
  const navigate = useNavigate();
  const { militaryService, completionPercentage } = useMilitaryCard();

  const handleEdit = () => {
    navigate(getSectionStepPath("military"));
  };

  const getDegreeLabel = (degree: string) => {
    return degree || "N/A";
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
            <Icon as={MdSecurity} fontSize="2xl" color="red.500" />
            <Text fontSize="xl" fontWeight="bold" color={{ base: "red.600", _dark: "red.400" }}>
              Military
            </Text>
          </HStack>
          <Text fontSize="3xl" fontWeight="bold" color="red.500">
            {completionPercentage}%
          </Text>
        </Stack>
      </Box>

      {/* Desktop view - full data */}
      <Stack gap={3} display={{ base: "none", md: "flex" }}>
        <Box>
          <Text fontSize="sm" color={{ base: "red.600", _dark: "red.400" }} mb={1}>
            Service Status
          </Text>
          <Text fontSize="md" fontWeight="semibold" color={{ base: "red.500", _dark: "red.300" }}>
            {militaryService?.militaryServiceStatus || "Not specified"}
          </Text>
        </Box>

        <HStack justify="space-between">
          <Box>
            <HStack gap={1} mb={1}>
              <Icon as={MdStar} fontSize="sm" color="red.500" />
              <Text fontSize="xs" color={{ base: "red.600", _dark: "red.400" }}>
                Rank
              </Text>
            </HStack>
            <Text fontSize="lg" fontWeight="bold" color="red.500">
              {militaryService?.degree ? getDegreeLabel(militaryService.degree) : "N/A"}
            </Text>
          </Box>
          <Box textAlign="right">
            <HStack gap={1} justify="end" mb={1}>
              <Icon as={MdCalendarToday} fontSize="sm" color="red.500" />
              <Text fontSize="xs" color={{ base: "red.600", _dark: "red.400" }}>
                Service Period
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="medium" color={{ base: "red.500", _dark: "red.300" }}>
              {militaryService?.serviceDuration || "N/A"}
            </Text>
          </Box>
        </HStack>

        <Box>
          <Text fontSize="sm" color={{ base: "red.600", _dark: "red.400" }} mb={2}>
            Military Degrees
          </Text>
          <Stack gap={1}>
            {militaryService?.degree && (
              <Badge
                colorPalette="red"
                variant="subtle"
                size="sm"
                width="fit-content"
              >
                {getDegreeLabel(militaryService.degree)}
              </Badge>
            )}
            {!militaryService?.degree && (
              <Text fontSize="sm" color={{ base: "red.400", _dark: "red.400" }}>
                No military degrees added
              </Text>
            )}
          </Stack>
        </Box>
      </Stack>
    </>
  );

  return (
    <SectionCard
      title="Military Service"
      icon={<Icon as={MdSecurity} />}
      completion={completionPercentage}
      themeColor="red"
      customContent={customContent}
      onClick={handleEdit}
      ml={{ base: mediaColumn === "left" ? 2 : 0, md: 0 }}
      mr={{ base: mediaColumn === "right" ? 2 : 0, md: 0 }}
    />
  );
};

export default MilitaryCard; 