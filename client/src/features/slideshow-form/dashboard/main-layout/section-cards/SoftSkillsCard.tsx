import { MdPsychology } from "react-icons/md";
import {
  Icon,
  Stack,
  Text,
  HStack,
  Box,
  Flex,
  Progress,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { softSkillsData } from "@slideshow-form/utils/mockData";
import { getSectionStepPath } from "@slideshow-form/routes";
import SectionCard from "@slideshow-form/components/cards/SectionCard";

const SoftSkillsCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(getSectionStepPath("softSkills"));
  };

  const getSkillColor = (level: number) => {
    if (level >= 80) return "green";
    if (level >= 60) return "blue";
    if (level >= 40) return "orange";
    return "red";
  };

  const customContent = (
    <Stack gap={3}>
      <HStack justify="space-between">
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="pink.500">
            {softSkillsData.totalSkills}
          </Text>
          <Text fontSize="xs" color={{ base: "gray.600", _dark: "gray.400" }}>
            Skills Added
          </Text>
        </Box>
        <Box textAlign="right">
          <Text fontSize="lg" fontWeight="semibold">
            {softSkillsData.categories.length}
          </Text>
          <Text fontSize="xs" color={{ base: "gray.600", _dark: "gray.400" }}>
            Categories
          </Text>
        </Box>
      </HStack>

      <Box>
        <Text
          fontSize="sm"
          color={{ base: "gray.600", _dark: "gray.400" }}
          mb={3}
        >
          Top Skills
        </Text>
        <Stack gap={2}>
          {softSkillsData.topSkills.map((skill, index) => (
            <Box key={index}>
              <Flex justify="space-between" mb={1}>
                <Text fontSize="sm" fontWeight="medium">
                  {skill.name}
                </Text>
                <Text
                  fontSize="xs"
                  color={{ base: "gray.600", _dark: "gray.400" }}
                >
                  {skill.level}%
                </Text>
              </Flex>
              <Progress.Root 
                value={skill.level} 
                size="sm"
                colorPalette={getSkillColor(skill.level)}
              >
                <Progress.Track>
                  <Progress.Range />
                </Progress.Track>
              </Progress.Root>
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  );

  return (
    <SectionCard
      title="Soft Skills"
      icon={<Icon as={MdPsychology} />}
      completion={softSkillsData.completion}
      themeColor="pink"
      customContent={customContent}
      footer="Click to manage your interpersonal skills"
      onClick={handleClick}
    />
  );
};

export default SoftSkillsCard;
