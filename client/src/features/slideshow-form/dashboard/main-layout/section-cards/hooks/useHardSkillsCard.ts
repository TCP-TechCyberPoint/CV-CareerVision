import { useNavigate } from "react-router-dom";
import { useSlideshowFormStore } from "@slideshow-form/store";
import { getSectionStepPath } from "@slideshow-form/routes";

export const useHardSkillsCard = () => {
  const navigate = useNavigate();
  const { formData } = useSlideshowFormStore();
  const hardSkillsData = formData.hardSkills || {};

  const handleClick = () => {
    navigate(getSectionStepPath("hardSkills"));
  };

  const calculateCompletion = () => {
    const totalSkills = Object.values(hardSkillsData).flat().length;
    if (totalSkills >= 5) return 100;
    return Math.round((totalSkills / 5) * 100);
  };

  const allSkills = Object.values(hardSkillsData).flat();

  const processedData = {
    totalSkills: allSkills.length,
    topSkills: allSkills.slice(0, 3),
    skills: allSkills,
  };

  const completionPercentage = calculateCompletion();

  return {
    hardSkillsData,
    processedData,
    handleClick,
    completionPercentage,
  };
};
