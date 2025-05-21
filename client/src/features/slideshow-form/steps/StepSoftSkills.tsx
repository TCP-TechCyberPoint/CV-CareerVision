import BaseButton from "@/components/ui/BaseButton";
import { Box, Heading, TagLabel, Text, VStack, Wrap, WrapItem, Tag, Flex, Badge } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { ScaleFade, Fade } from "@chakra-ui/transition";
import { useState } from "react";
import { SOFT_SKILLS_HIERARCHY } from "../constants/skills-hierarchy";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const StepSoftSkills = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [expandedSkills, setExpandedSkills] = useState<string[]>([]);
  
  const bgColor = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  
  const handleSkillClick = (skill: string) => {
    const isMainCategory = SOFT_SKILLS_HIERARCHY[skill as keyof typeof SOFT_SKILLS_HIERARCHY] !== undefined;
    
    if (isMainCategory) {
      if (!expandedSkills.includes(skill)) {
        setExpandedSkills((prev) => [...prev, skill]);
      } else {
        setExpandedSkills((prev) => prev.filter((s) => s !== skill));
      }
    } else {
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
      const category = SOFT_SKILLS_HIERARCHY[skill as keyof typeof SOFT_SKILLS_HIERARCHY];
      if (category) {
        next.push(...category.skills.filter((child: string) => !selectedSkills.includes(child)));
      }
    });
    return next;
  };

  const getColorScheme = (skill: string) => {
    const category = SOFT_SKILLS_HIERARCHY[skill as keyof typeof SOFT_SKILLS_HIERARCHY];
    if (category) {
      return category.color;
    }
    
    for (const [_, categoryData] of Object.entries(SOFT_SKILLS_HIERARCHY)) {
      if (categoryData.skills.some((s: string) => s === skill)) {
        return categoryData.color;
      }
    }
    
    return "gray";
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      mt={24}
      mx="auto"
      maxW="900px"
      p={10}
      borderRadius="3xl"
      boxShadow="2xl"
      bg={bgColor}
      border="1px solid"
      borderColor={borderColor}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minH="600px"
    >
      <VStack gap={8} align="flex-start" w="full">
        <Box textAlign="center" w="full">
          <Heading size="xl" bgGradient="linear(to-r, blue.400, purple.500)" bgClip="text">
            Soft Skills & Personal Qualities
          </Heading>
          <Text fontSize="lg" color="gray.500" mt={2}>
            Select the soft skills that best represent your professional character
          </Text>
        </Box>

        <Box p={8} w="full" bg={cardBg} borderRadius="2xl">
          <Heading size="md" mb={8} color="gray.600">
            Choose your core competencies
          </Heading>

          <ScaleFade initialScale={0.9} in={true}>
            <Wrap gap={4} mb={8}>
              {Object.keys(SOFT_SKILLS_HIERARCHY).map((skill) => (
                <WrapItem key={skill}>
                  <Tag.Root
                    size="lg"
                    variant={expandedSkills.includes(skill) ? "outline" : "solid"}
                    colorPalette={getColorScheme(skill)}
                    cursor="pointer"
                    onClick={() => handleSkillClick(skill)}
                    transition="all 0.3s"
                    _hover={{
                      transform: "translateY(-3px)",
                      boxShadow: "xl",
                    }}
                    px={5}
                    py={3}
                    borderRadius="full"
                  >
                    <TagLabel fontWeight="bold" fontSize="md">{skill}</TagLabel>
                  </Tag.Root>
                </WrapItem>
              ))}
            </Wrap>
          </ScaleFade>

          {expandedSkills.length > 0 && (
            <Fade in={true}>
              <Box mt={10}>
                <Heading size="sm" mb={6} color="gray.600">
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
                          transform: "translateY(-2px)",
                          boxShadow: "md",
                        }}
                        px={4}
                        py={2}
                        borderRadius="full"
                      >
                        <TagLabel>{skill}</TagLabel>
                      </Tag.Root>
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
            </Fade>
          )}

          {selectedSkills.length > 0 && (
            <ScaleFade initialScale={0.95} in={true}>
              <Box mt={10} p={6} bg={bgColor} borderRadius="xl" boxShadow="md">
                <Flex justify="space-between" align="center" mb={6}>
                  <Heading size="sm" color="gray.600">
                    Your Selected Skills
                  </Heading>
                  <Badge colorScheme="blue" fontSize="sm" px={3} py={1} borderRadius="full">
                    {selectedSkills.length} selected
                  </Badge>
                </Flex>
                <Wrap gap={3}>
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
                        px={4}
                        py={2}
                        borderRadius="full"
                      >
                        <TagLabel>{skill}</TagLabel>
                      </Tag.Root>
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
            </ScaleFade>
          )}
        </Box>
      </VStack>

      <Flex justify="space-between" pt={8} gap={4}>
        <BaseButton
          onClick={prevStep}
          colorScheme="red"
          variant="outline"
          size="lg"
          minW="140px"
          _hover={{
            transform: "translateX(-4px)",
            boxShadow: "md",
          }}
          transition="all 0.2s"
        >
          Back
        </BaseButton>
        <BaseButton
          onClick={nextStep}
          size="lg"
          colorScheme="blue"
          minW="140px"
          _hover={{
            transform: "translateX(4px)",
            boxShadow: "md",
          }}
          transition="all 0.2s"
        >
          Next
        </BaseButton>
      </Flex>
    </MotionBox>
  );
};

export default StepSoftSkills;