import { Box, Heading, Flex, Badge, Wrap, WrapItem } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { ScaleFade } from "@chakra-ui/transition";
import { motion } from "framer-motion";
import SkillTag from "./SkillTag";

const MotionBox = motion.create(Box);

interface SelectedSkillsSectionProps {
  selectedSkills: string[];
  onRemoveSkill: (skill: string) => void;
  getColorScheme: (skill: string) => string;
  useAnimation?: boolean;
}

const SelectedSkillsSection = ({ 
  selectedSkills, 
  onRemoveSkill, 
  getColorScheme,
  useAnimation = false 
}: SelectedSkillsSectionProps) => {
  const bgColor = useColorModeValue("white", "gray.800");

  if (selectedSkills.length === 0) return null;

  const content = (
    <Box mt={4} p={4} bg={bgColor} borderRadius="xl" boxShadow="md">
      <Flex justify="space-between" align="center" mb={4}>
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
            <SkillTag
              skill={skill}
              isSelected={true}
              colorScheme={getColorScheme(skill)}
              size="md"
              onClick={() => onRemoveSkill(skill)}
              variant="solid"
            />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );

  if (useAnimation) {
    return (
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {content}
      </MotionBox>
    );
  }

  return (
    <ScaleFade initialScale={0.95} in={true}>
      {content}
    </ScaleFade>
  );
};

export default SelectedSkillsSection; 