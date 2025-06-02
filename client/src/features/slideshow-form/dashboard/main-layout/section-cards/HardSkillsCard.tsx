import { MdBuild } from "react-icons/md";
import { Icon, Stack, Text, Badge, HStack, Box, Wrap } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { hardSkillsData } from "@/features/slideshow-form/utils/mockData";
import { getSectionStepPath } from "@/features/slideshow-form/routes";
import SectionCard from "@/features/slideshow-form/components/cards/SectionCard";

const HardSkillsCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(getSectionStepPath("hardSkills"));
  };

  const customContent = (
    <Stack gap={3}>
      <HStack justify="space-between">
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="green.500">
            {hardSkillsData.totalSkills}
          </Text>
          <Text fontSize="xs" color={{ base: "gray.600", _dark: "gray.400" }}>
            Skills Added
          </Text>
        </Box>
        <Box textAlign="right">
          <Text fontSize="lg" fontWeight="semibold">
            {hardSkillsData.categories.length}
          </Text>
          <Text fontSize="xs" color={{ base: "gray.600", _dark: "gray.400" }}>
            Categories
          </Text>
        </Box>
      </HStack>

      <Box>
        <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }} mb={2}>
          Top Skills
        </Text>
        <Wrap gap={2}>
          {hardSkillsData.topSkills.map((skill, index) => (
            <Badge 
              key={index}
              colorPalette="green"
              variant="outline"
              size="sm"
            >
              {skill}
            </Badge>
          ))}
        </Wrap>
      </Box>

      <Box>
        <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }} mb={2}>
          Categories
        </Text>
        <Text fontSize="sm" fontWeight="medium">
          {hardSkillsData.categories.join(" • ")}
        </Text>
      </Box>
    </Stack>
  );

  return (
    <SectionCard
      title="Hard Skills"
      icon={<Icon as={MdBuild} />}
      completion={hardSkillsData.completion}
      themeColor="green"
      customContent={customContent}
      footer="Click to manage your technical skills"
      onClick={handleClick}
    />
  );
};

export default HardSkillsCard; 