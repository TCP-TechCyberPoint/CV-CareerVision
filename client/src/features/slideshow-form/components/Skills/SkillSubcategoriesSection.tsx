import { Box, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import { Fade } from "@chakra-ui/transition";
import { motion } from "framer-motion";
import SkillTag from "./SkillTag";


const MotionBox = motion.create(Box);

interface SkillSubcategoriesSectionProps {
  skills: string[];
  selectedSkills: string[];
  onSkillClick: (skill: any) => void;
  getColorScheme: (skill: any) => string;
  useAnimation?: boolean;
}

const SkillSubcategoriesSection = ({ 
  skills, 
  selectedSkills, 
  onSkillClick, 
  getColorScheme,
  useAnimation = false 
}: SkillSubcategoriesSectionProps) => {
  if (skills.length === 0) return null;

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
              isSelected={selectedSkills.includes(skill)}
              colorScheme={getColorScheme(skill)}
              size="md"
              onClick={() => onSkillClick(skill)}
              variant={selectedSkills.includes(skill) ? "solid" : "subtle"}
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