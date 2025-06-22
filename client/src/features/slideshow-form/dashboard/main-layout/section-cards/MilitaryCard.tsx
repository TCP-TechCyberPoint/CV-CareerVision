import { Text, HStack, Badge, Box, Stack } from "@chakra-ui/react";
import { FaMedal, FaCalendarAlt, FaStar, FaShieldAlt } from "react-icons/fa";
import { TfiMedall } from "react-icons/tfi";
import { Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useMilitaryCard } from "@slideshow-form/dashboard/main-layout/section-cards/hooks";
import { SectionCard } from "@/features/slideshow-form/components/cards";
import type { MilitaryDegree } from "@/features/slideshow-form/types/military.types";

const MilitaryCard = () => {
  const navigate = useNavigate();
  const { militaryService, completionPercentage, isComplete } = useMilitaryCard();

  const handleEdit = () => {
    navigate("/create-cv/military");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "full_military":
        return "green";
      case "partial_military":
        return "blue";
      case "national_service":
        return "purple";
      case "civil_service":
        return "orange";
      case "exempted":
        return "yellow";
      case "not_served":
        return "gray";
      case "other":
        return "teal";
      default:
        return "gray";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "full_military":
        return "Full Military";
      case "partial_military":
        return "Partial Military";
      case "national_service":
        return "National Service";
      case "civil_service":
        return "Civil Service";
      case "exempted":
        return "Exempted";
      case "not_served":
        return "Not Served";
      case "other":
        return "Other";
      default:
        return "Not Specified";
    }
  };

  const getDegreeLabel = (degree: MilitaryDegree) => {
    const degreeMap: Record<MilitaryDegree, { hebrew: string; english: string }> = {
      // Enlisted
      private: { hebrew: 'טוראי', english: 'Private' },
      corporal: { hebrew: 'רב-טוראי', english: 'Corporal' },
      sergeant: { hebrew: 'סמל', english: 'Sergeant' },
      staff_sergeant: { hebrew: 'סמל ראשון', english: 'Staff Sergeant' },
      
      // Senior NCOs
      sergeant_first_class: { hebrew: 'רב-סמל (רס"ל)', english: 'Sergeant First Class' },
      master_sergeant: { hebrew: 'רב-סמל ראשון (רס"ר)', english: 'Master Sergeant' },
      sergeant_major: { hebrew: 'רב-סמל מתקדם (רס"מ)', english: 'Sergeant Major' },
      senior_sergeant_major: { hebrew: 'רב-סמל בכיר (רס"ב)', english: 'Senior Sergeant Major' },
      command_chief_warrant_officer: { hebrew: 'רב-נגד (רנ"ג)', english: 'Command Chief Warrant Officer' },
      
      // Officers
      second_lieutenant: { hebrew: 'סגן משנה (סג"מ)', english: 'Second Lieutenant' },
      lieutenant: { hebrew: 'סגן (סגן)', english: 'Lieutenant' },
      captain: { hebrew: 'סרן (סרן)', english: 'Captain' },
      major: { hebrew: 'רב-סרן (רס"ן)', english: 'Major' },
    };

    const degreeInfo = degreeMap[degree];
    return degreeInfo ? `${degreeInfo.hebrew} – ${degreeInfo.english}` : degree;
  };

  const customContent = (
    <Stack gap={4}>
      {isComplete ? (
        <>
          <Box>
            <HStack gap={2} mb={2}>
              <Icon as={TfiMedall} fontSize="sm" color="purple.500" />
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color={{ base: "purple.600", _dark: "purple.400" }}
              >
                Service Status
              </Text>
            </HStack>
            <Badge
              colorScheme={getStatusColor(militaryService?.militaryServiceStatus || "")}
              variant="subtle"
              fontSize="sm"
              px={3}
              py={1}
              borderRadius="full"
            >
              {getStatusLabel(militaryService?.militaryServiceStatus || "")}
            </Badge>
          </Box>

          {militaryService?.serviceDuration && (
            <Box>
              <HStack gap={2} mb={1}>
                <Icon as={FaCalendarAlt} fontSize="sm" color="purple.500" />
                <Text
                  fontSize="xs"
                  fontWeight="semibold"
                  color={{ base: "purple.600", _dark: "purple.400" }}
                >
                  Service Duration
                </Text>
              </HStack>
              <Text
                fontSize="md"
                fontWeight="semibold"
                color={{ base: "purple.500", _dark: "purple.300" }}
              >
                {militaryService.serviceDuration}
              </Text>
            </Box>
          )}

          {militaryService?.degreeGroup && militaryService?.degree && (
            <Box>
              <HStack gap={2} mb={1}>
                <Icon as={FaStar} fontSize="sm" color="purple.500" />
                <Text
                  fontSize="xs"
                  fontWeight="semibold"
                  color={{ base: "purple.600", _dark: "purple.400" }}
                >
                  Military Rank
                </Text>
              </HStack>
              <Text
                fontSize="md"
                fontWeight="semibold"
                color={{ base: "purple.500", _dark: "purple.300" }}
              >
                {getDegreeLabel(militaryService.degree)}
              </Text>
            </Box>
          )}

          {militaryService?.serviceDetails && (
            <Box>
              <HStack gap={2} mb={1}>
                <Icon as={FaMedal} fontSize="sm" color="purple.500" />
                <Text
                  fontSize="xs"
                  fontWeight="semibold"
                  color={{ base: "purple.600", _dark: "purple.400" }}
                >
                  Role
                </Text>
              </HStack>
              <Text
                fontSize="md"
                fontWeight="semibold"
                color={{ base: "purple.500", _dark: "purple.300" }}
              >
                {militaryService.serviceDetails}
              </Text>
            </Box>
          )}
        </>
      ) : (
        <Box textAlign="center" py={4}>
          <Icon as={FaShieldAlt} fontSize="3xl" color="purple.300" mb={2} />
          <Text fontSize="sm" color={{ base: "purple.400", _dark: "purple.400" }}>
            No military service information added
          </Text>
          <Text fontSize="xs" color={{ base: "purple.400", _dark: "purple.400" }} mt={1}>
            Click to add your military experience
          </Text>
        </Box>
      )}
    </Stack>
  );

  return (
    <SectionCard
      title="Military Service"
      icon={<Icon as={FaShieldAlt} />}
      completion={completionPercentage}
      themeColor="purple"
      customContent={customContent}
      footer="Click to manage your military service information"
      onClick={handleEdit}
    />
  );
};

export default MilitaryCard; 