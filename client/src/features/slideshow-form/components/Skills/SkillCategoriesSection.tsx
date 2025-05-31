import { Wrap, WrapItem } from "@chakra-ui/react";
import { ScaleFade } from "@chakra-ui/transition";
import SkillTag from "./SkillTag";


interface SkillCategoriesSectionProps {
  categories: string[];
  expandedSkills: string[];
  onSkillClick: (skill: any) => void;
  getColorScheme: (skill: any) => string;
  useAnimation?: boolean;
}

const SkillCategoriesSection = ({ 
  categories, 
  expandedSkills, 
  onSkillClick, 
  getColorScheme,
  useAnimation = false 
}: SkillCategoriesSectionProps) => {
  const content = (
    <Wrap gap={4} mb={8}>
      {categories.map((skill) => (
        <WrapItem key={skill}>
          <SkillTag
            skill={skill}
            isExpanded={expandedSkills.includes(skill)}
            colorScheme={getColorScheme(skill)}
            size="lg"
            onClick={() => onSkillClick(skill)}
          />
        </WrapItem>
      ))}
    </Wrap>
  );

  if (useAnimation) {
    return (
      <ScaleFade initialScale={0.9} in={true}>
        {content}
      </ScaleFade>
    );
  }

  return content;
};

export default SkillCategoriesSection; 