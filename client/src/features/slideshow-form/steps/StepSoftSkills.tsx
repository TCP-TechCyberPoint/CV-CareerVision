import { SOFT_SKILLS_HIERARCHY } from "../constants/skills-hierarchy";
import { useSoftSkills } from "../hooks/useSoftSkills";
import { SkillsStep } from "../components";
import type { SoftSkillCategory } from "../types/skills";

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

  const categories = Object.keys(SOFT_SKILLS_HIERARCHY) as SoftSkillCategory[];

  return (
    <SkillsStep
      subtitle="Select the soft skills that best represent your professional character"
      cardTitle="Choose your core competencies"
      categories={categories}
      selectedSkills={selectedSkills}
      expandedSkills={expandedSkills}
      nextSkills={getNextSkills()}
      onSkillClick={handleSkillClick}
      onRemoveSkill={handleRemoveSkill}
      getColorScheme={getColorScheme}
      nextStep={nextStep}
      prevStep={prevStep}
      useHardSkillsAnimation={false}
    />
  );
};

export default StepSoftSkills;
