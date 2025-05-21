import BaseButton from "@/components/ui/BaseButton";
import { Box, Heading, TagLabel, Text, VStack, Wrap, WrapItem, Tag, Flex, Badge } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { useState } from "react";
import { HARD_SKILLS_HIERARCHY } from "../constants/skills-hierarchy";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionTag = motion(Tag.Root);

const StepHardSkills = ({
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
    const isMainCategory = HARD_SKILLS_HIERARCHY[skill as keyof typeof HARD_SKILLS_HIERARCHY] !== undefined;
    
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
      const category = HARD_SKILLS_HIERARCHY[skill as keyof typeof HARD_SKILLS_HIERARCHY];
      if (category) {
        next.push(...category.skills.filter((child: string) => !selectedSkills.includes(child)));
      }
    });
    return next;
  };

  const getColorScheme = (skill: string) => {
    const category = HARD_SKILLS_HIERARCHY[skill as keyof typeof HARD_SKILLS_HIERARCHY];
    if (category) {
      return category.color;
    }
    
    for (const [_, categoryData] of Object.entries(HARD_SKILLS_HIERARCHY)) {
      if (categoryData.skills.some((s: string) => s === skill)) {
        return categoryData.color;
      }
    }
    
    return "gray";
  };

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
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
          <Heading 
            size="xl" 
            bgGradient="linear(to-r, teal.400, blue.500)" 
            bgClip="text"
          >
            Technical Skills & Expertise
          </Heading>
          <Text 
            fontSize="lg" 
            color="gray.500" 
            mt={2}
          >
            Select your technical skills and areas of expertise
          </Text>
        </Box>

        <Box p={8} w="full" bg={cardBg} borderRadius="2xl">
          <Heading size="md" mb={8} color="gray.600">
            Choose your technical competencies
          </Heading>

          <Wrap gap={4} mb={8}>
            {Object.keys(HARD_SKILLS_HIERARCHY).map((skill) => (
              <WrapItem key={skill}>
                <MotionTag
                  size="lg"
                  variant={expandedSkills.includes(skill) ? "outline" : "solid"}
                  colorPalette={getColorScheme(skill)}
                  cursor="pointer"
                  onClick={() => handleSkillClick(skill)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  px={5}
                  py={3}
                  borderRadius="full"
                >
                  <TagLabel fontWeight="bold" fontSize="md">{skill}</TagLabel>
                </MotionTag>
              </WrapItem>
            ))}
          </Wrap>

          {expandedSkills.length > 0 && (
            <MotionBox
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              mt={10}
            >
              <Heading size="sm" mb={6} color="gray.600">
                Refine your selection:
              </Heading>
              <Wrap gap={3}>
                {getNextSkills().map((skill) => (
                  <WrapItem key={skill}>
                    <MotionTag
                      size="md"
                      variant={selectedSkills.includes(skill) ? "solid" : "subtle"}
                      colorPalette={getColorScheme(skill)}
                      cursor="pointer"
                      onClick={() => handleSkillClick(skill)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      px={4}
                      py={2}
                      borderRadius="full"
                    >
                      <TagLabel>{skill}</TagLabel>
                    </MotionTag>
                  </WrapItem>
                ))}
              </Wrap>
            </MotionBox>
          )}

          {selectedSkills.length > 0 && (
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              mt={10}
              p={6}
              bg={bgColor}
              borderRadius="xl"
              boxShadow="md"
            >
              <Flex justify="space-between" align="center" mb={6}>
                <Heading size="sm" color="gray.600">
                  Your Selected Skills
                </Heading>
                <Badge 
                  colorScheme="blue" 
                  fontSize="sm" 
                  px={3} 
                  py={1} 
                  borderRadius="full"
                >
                  {selectedSkills.length} selected
                </Badge>
              </Flex>
              <Wrap gap={3}>
                {selectedSkills.map((skill) => (
                  <WrapItem key={skill}>
                    <MotionTag
                      size="md"
                      variant="solid"
                      colorPalette={getColorScheme(skill)}
                      cursor="pointer"
                      onClick={() => handleRemoveSkill(skill)}
                      whileHover={{ scale: 0.95 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      px={4}
                      py={2}
                      borderRadius="full"
                    >
                      <TagLabel>{skill}</TagLabel>
                    </MotionTag>
                  </WrapItem>
                ))}
              </Wrap>
            </MotionBox>
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
        >
          Back
        </BaseButton>
        <BaseButton
          onClick={nextStep}
          size="lg"
          colorScheme="blue"
          minW="140px"
        >
          Next
        </BaseButton>
      </Flex>
    </MotionBox>
  );
};

export default StepHardSkills;
