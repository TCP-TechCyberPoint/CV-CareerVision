import { Wrap, WrapItem, SimpleGrid } from "@chakra-ui/react";
import { ScaleFade } from "@chakra-ui/transition";
import SkillTag from "@slideshow-form/components/Skills/SkillTag";

interface SkillCategoriesSectionProps<T extends string> {
  categories: string[];
  selectedSkills?: T[];
  expandedSkills?: string[];
  onSkillClick: (skill: T) => void;
  getColorScheme: (skill: T) => string;
  useAnimation?: boolean;
  useGrid?: boolean;
}

export function SkillCategoriesSection<T extends string>({
  categories,
  selectedSkills = [],
  expandedSkills = [],
  onSkillClick,
  getColorScheme,
  useAnimation = false,
  useGrid = false,
}: SkillCategoriesSectionProps<T>) {
  const content = useGrid ? (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
      {categories.map((skill) => (
        <SkillTag
          key={skill}
          skill={skill}
          isSelected={selectedSkills.includes(skill as T)}
          colorScheme={getColorScheme(skill as T)}
          size="lg"
          onClick={() => onSkillClick(skill as T)}
        />
      ))}
    </SimpleGrid>
  ) : (
    <Wrap gap={4} mb={8}>
      {categories.map((skill) => (
        <WrapItem key={skill}>
          <SkillTag
            skill={skill}
            isExpanded={expandedSkills.includes(skill)}
            colorScheme={getColorScheme(skill as T)}
            size="lg"
            onClick={() => onSkillClick(skill as T)}
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
}

export default SkillCategoriesSection; 