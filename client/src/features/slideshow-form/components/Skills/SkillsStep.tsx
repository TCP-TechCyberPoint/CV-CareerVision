import {
  SkillsContainer,
  SkillsSelectionCard,
  SkillCategoriesSection,
  SkillSubcategoriesSection,
  SelectedSkillsSection,
} from "@slideshow-form/components/Skills";
import type { HardSkill } from "@slideshow-form/types/skills";
import StepNavigationButtons from "@slideshow-form/components/StepNavigationButtons";

interface SkillsStepProps<T extends string> {
  subtitle: string;
  cardTitle: string;
  categories: string[];
  selectedSkills: string[] | { [key: string]: HardSkill[] };
  expandedSkills: string[];
  nextSkills: string[];
  onSkillClick: (skill: T) => void;
  onRemoveSkill: (skill: T) => void;
  getColorScheme: (skill: T) => string;
  nextStep: () => void;
  prevStep: () => void;
  useHardSkillsAnimation?: boolean;
}

const SkillsStep = <T extends string>({
  subtitle,
  cardTitle,
  categories,
  selectedSkills,
  expandedSkills,
  nextSkills,
  onSkillClick,
  onRemoveSkill,
  getColorScheme,
  nextStep,
  prevStep,
  useHardSkillsAnimation = false,
}: SkillsStepProps<T>) => {
  return (
    <SkillsContainer subtitle={subtitle}>
      <SkillsSelectionCard title={cardTitle}>
        <SkillCategoriesSection
          categories={categories}
          expandedSkills={expandedSkills}
          onSkillClick={onSkillClick}
          getColorScheme={getColorScheme}
          useAnimation={!useHardSkillsAnimation}
        />

        <SkillSubcategoriesSection
          skills={nextSkills}
          selectedSkills={selectedSkills}
          onSkillClick={onSkillClick}
          getColorScheme={getColorScheme}
          useAnimation={useHardSkillsAnimation}
        />

        <SelectedSkillsSection
          selectedSkills={selectedSkills}
          onRemoveSkill={onRemoveSkill}
          getColorScheme={getColorScheme}
          useAnimation={useHardSkillsAnimation}
        />
      </SkillsSelectionCard>

      <StepNavigationButtons onPrevStep={prevStep} onNextStep={nextStep} />
    </SkillsContainer>
  );
};

export default SkillsStep;
