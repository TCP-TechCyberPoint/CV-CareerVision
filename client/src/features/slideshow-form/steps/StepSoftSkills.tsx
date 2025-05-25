import BaseButton from "@/components/ui/BaseButton";
import { Box, Heading, TagLabel, Text, VStack, Wrap, WrapItem, Tag, Flex, Badge } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { ScaleFade, Fade } from "@chakra-ui/transition";
import { motion } from "framer-motion";
import { SOFT_SKILLS_HIERARCHY } from "../constants/skills-hierarchy";
import { useSoftSkills } from "../hooks/useSoftSkills";
import StepNavigationButtons from "../components/StepNavigationButtons";
import type { SoftSkillCategory } from "../types/soft-skills.type";

const MotionBox = motion.create(Box);

const StepSoftSkills = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const {
    selectedSkills,
    expandedSkills,
    handleSkillClick,
    handleRemoveSkill,
    getNextSkills,
    getColorScheme,
  } = useSoftSkills();
  
  const bgColor = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

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
                    variant={expandedSkills.includes(skill as SoftSkillCategory) ? "outline" : "solid"}
                    colorPalette={getColorScheme(skill as SoftSkillCategory)}
                    cursor="pointer"
                    onClick={() => handleSkillClick(skill as SoftSkillCategory)}
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

      <StepNavigationButtons
        onPrevStep={prevStep}
        onNextStep={nextStep}
      />
    </MotionBox>
  );
};

export default StepSoftSkills;