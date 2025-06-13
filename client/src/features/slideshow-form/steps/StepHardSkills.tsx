import { HARD_SKILLS_HIERARCHY } from "../constants/skills-hierarchy";
import { useHardSkills } from "../hooks/useHardSkills";
import { SkillsStep } from "../components";
import type { HardSkillCategory } from "../types/skills";

const StepHardSkills = ({
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
  } = useHardSkills();

  const categories = Object.keys(HARD_SKILLS_HIERARCHY) as HardSkillCategory[];

  return (
    <SkillsStep
      subtitle="Select your technical skills and areas of expertise"
      cardTitle="Choose your technical competencies"
      categories={categories}
      selectedSkills={selectedSkills}
      expandedSkills={expandedSkills}
      nextSkills={getNextSkills()}
      onSkillClick={handleSkillClick}
      onRemoveSkill={handleRemoveSkill}
      getColorScheme={getColorScheme}
      nextStep={nextStep}
      prevStep={prevStep}
      useHardSkillsAnimation={true}
    />
  );
};

export default StepHardSkills;
