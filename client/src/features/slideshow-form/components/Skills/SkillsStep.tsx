import {
  SkillsContainer,
  SkillsSelectionCard,
  SkillCategoriesSection,
  SkillSubcategoriesSection,
  SelectedSkillsSection,
} from "@slideshow-form/components/skills";

import StepNavigationButtons from "@slideshow-form/components/StepNavigationButtons";

interface SkillsStepProps {
  subtitle: string;
  cardTitle: string;
  categories: string[];
  selectedSkills: string[];
  expandedSkills: string[];
  nextSkills: string[];
  onSkillClick: (skill: any) => void;
  onRemoveSkill: (skill: any) => void;
  getColorScheme: (skill: any) => string;
  nextStep: () => void;
  prevStep: () => void;
  useHardSkillsAnimation?: boolean;
}

const SkillsStep = ({
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
}: SkillsStepProps) => {
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
