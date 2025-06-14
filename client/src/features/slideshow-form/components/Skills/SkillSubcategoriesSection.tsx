import { Box, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import { Fade } from "@chakra-ui/transition";
import { motion } from "framer-motion";
import SkillTag from "@slideshow-form/components/Skills/SkillTag";
import type { HardSkill } from "@slideshow-form/types/skills";

const MotionBox = motion.create(Box);

interface SkillSubcategoriesSectionProps<T extends string> {
  skills: string[];
  selectedSkills: string[] | { [key: string]: HardSkill[] };
  onSkillClick: (skill: T) => void;
  getColorScheme: (skill: T) => string;
  useAnimation?: boolean;
}

const SkillSubcategoriesSection = <T extends string>({ 
  skills, 
  selectedSkills, 
  onSkillClick, 
  getColorScheme,
  useAnimation = false 
}: SkillSubcategoriesSectionProps<T>) => {
  if (skills.length === 0) return null;

  // Convert selectedSkills to array if it's an object
  const selectedSkillsArray = Array.isArray(selectedSkills)
    ? selectedSkills
    : Object.values(selectedSkills).flat();

  const content = (
    <Box mt={10}>
      <Heading size="sm" mb={6} color="gray.600">
        Refine your selection:
      </Heading>
      <Wrap gap={3}>
        {skills.map((skill) => (
          <WrapItem key={skill}>
            <SkillTag
              skill={skill}
              isSelected={selectedSkillsArray.includes(skill)}
              colorScheme={getColorScheme(skill as T)}
              size="md"
              onClick={() => onSkillClick(skill as T)}
              variant={selectedSkillsArray.includes(skill) ? "solid" : "subtle"}
            />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );

  if (useAnimation) {
    return (
      <MotionBox
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        transition={{ duration: 0.3 }}
      >
        {content}
      </MotionBox>
    );
  }

  return (
    <Fade in={true}>
      {content}
    </Fade>
  );
};

export default SkillSubcategoriesSection; 