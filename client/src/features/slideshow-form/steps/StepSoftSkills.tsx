import { SOFT_SKILLS_HIERARCHY } from "../constants/skills-hierarchy";
import { useSoftSkills } from "../hooks/useSoftSkills";
import { SkillsStep } from "../components";

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

  return (
    <SkillsStep
      subtitle="Select the soft skills that best represent your professional character"
      cardTitle="Choose your core competencies"
      categories={Object.keys(SOFT_SKILLS_HIERARCHY)}
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
