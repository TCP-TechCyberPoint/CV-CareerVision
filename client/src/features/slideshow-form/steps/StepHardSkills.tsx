import { HARD_SKILLS_HIERARCHY } from "../constants/skills-hierarchy";
import { useHardSkills } from "../hooks/useHardSkills";
import { SkillsStep } from "../components";

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

  return (
    <SkillsStep
      subtitle="Select your technical skills and areas of expertise"
      cardTitle="Choose your technical competencies"
      categories={Object.keys(HARD_SKILLS_HIERARCHY)}
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
