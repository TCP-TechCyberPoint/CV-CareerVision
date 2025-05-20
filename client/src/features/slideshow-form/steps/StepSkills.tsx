import BaseButton from "@/components/ui/BaseButton";
import { Box, Heading, TagLabel, Text, VStack, Wrap, WrapItem, Tag, Flex, Badge } from "@chakra-ui/react";
import { useState } from "react";
import { skillsHierarchy, skillsColorSchemes } from "../constants/soft-skills-map"



const StepSkills = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [expandedSkills, setExpandedSkills] = useState<string[]>([]);
  
  const handleSkillClick = (skill: string) => {
    // Check if this is a main category (has children)
    const isMainCategory = skillsHierarchy[skill] !== undefined;
    
    if (isMainCategory) {
      // For main categories, just toggle expansion
      if (!expandedSkills.includes(skill)) {
        setExpandedSkills((prev) => [...prev, skill]);
      } else {
        setExpandedSkills((prev) => prev.filter((s) => s !== skill));
      }
    } else {
      // For sub-interests, toggle selection
      if (!selectedSkills.includes(skill)) {
        setSelectedSkills((prev) => [...prev, skill]);
      } else {
        setSelectedSkills((prev) => prev.filter((s) => s !== skill));
      }
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSelectedSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };
  
  const getNextSkills = () => {
    const next: string[] = [];
    expandedSkills.forEach((skill) => {
      const children = skillsHierarchy[skill];
      if (children) {
        next.push(...children.filter((child) => !selectedSkills.includes(child)));
      }
    });
    return next;
  };

  const getColorScheme = (skill: string) => {
    return skillsColorSchemes[skill as keyof typeof skillsColorSchemes] || "gray";
  };

  return (
    <Box
      mt={24}
      mx="auto"
      maxW="800px"
      p={10}
      borderRadius="2xl"
      boxShadow="2xl"
      bg="white"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minH="500px"
    >
      <VStack gap={6} align="flex-start">
        <Heading size="xl">Skills & Expertise</Heading>
        <Text fontSize="md" color="gray.600">
          Tell us about your professional skills and areas of expertise.
        </Text>

        <Box p={6} maxW="800px" mx="auto" w="full">
          <Heading size="md" mb={6}>Choose your interests and skills</Heading>

          {/* Top-level options */}
          <Wrap gap={3} mb={6}>
            {Object.keys(skillsHierarchy)
              .map((skill) => (
                <WrapItem key={skill}>
                  <Tag.Root
                    size="lg"
                    variant={expandedSkills.includes(skill) ? "outline" : "solid"}
                    colorPalette={getColorScheme(skill)}
                    cursor="pointer"
                    onClick={() => handleSkillClick(skill)}
                    transition="all 0.2s"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                    px={4}
                    py={2}
                    borderRadius="full"
                  >
                    <TagLabel fontWeight="bold">{skill}</TagLabel>
                  </Tag.Root>
                </WrapItem>
              ))}
          </Wrap>

          {/* Selected */}
          {expandedSkills.length > 0 && (
            <>
              <Heading size="sm" mt={8} mb={4} color="gray.600">
                Refine your selection:
              </Heading>
              <Wrap gap={3}>
                {getNextSkills().map((skill) => (
                  <WrapItem key={skill}>
                    <Tag.Root
                      size="md"
                      variant={selectedSkills.includes(skill) ? "solid" : "subtle"}
                      colorPalette={getColorScheme(skill)}
                      cursor="pointer"
                      onClick={() => handleSkillClick(skill)}
                      transition="all 0.2s"
                      _hover={{
                        transform: "translateY(-1px)",
                        boxShadow: "md",
                      }}
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      <TagLabel>{skill}</TagLabel>
                    </Tag.Root>
                  </WrapItem>
                ))}
              </Wrap>
            </>
          )}

          {/* Selected Skills Section */}
          {selectedSkills.length > 0 && (
            <Box mt={8} p={4} bg="gray.50" borderRadius="xl">
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="sm" color="gray.600">
                  Selected Skills
                </Heading>
                <Badge colorScheme="blue" fontSize="sm" px={2} py={1} borderRadius="full">
                  {selectedSkills.length} selected
                </Badge>
              </Flex>
              <Wrap gap={2}>
                {selectedSkills.map((skill) => (
                  <WrapItem key={skill}>
                    <Tag.Root
                      size="md"
                      variant="solid"
                      colorPalette={getColorScheme(skill)}
                      cursor="pointer"
                      onClick={() => handleRemoveSkill(skill)}
                      transition="all 0.2s"
                      _hover={{
                        transform: "scale(0.95)",
                        opacity: 0.8,
                      }}
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      <TagLabel>{skill}</TagLabel>
                    </Tag.Root>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
          )}
        </Box>
      </VStack>

      <Box display="flex" justifyContent="space-between" pt={6}>
        <BaseButton
          onClick={prevStep}
          colorScheme="red"
          variant="subtle"
          size="lg"
          minW="120px"
        >
          Back
        </BaseButton>
        <BaseButton
          onClick={nextStep}
          size="lg"
          variant="subtle"
          colorScheme="green"
          minW="120px"
        >
          Next
        </BaseButton>
      </Box>
    </Box>
  );
};

export default StepSkills;
