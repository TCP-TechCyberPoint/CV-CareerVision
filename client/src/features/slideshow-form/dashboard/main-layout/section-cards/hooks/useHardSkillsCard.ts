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

  // Calculate completion based on skills data
  const calculateCompletion = () => {
    const totalSkills = Object.values(hardSkillsData).flat().length;
    if (totalSkills === 0) return 0;
    
    // Consider complete if has at least 3 skills
    if (totalSkills >= 5) return 100;
    if (totalSkills >= 3) return 75;
    if (totalSkills >= 1) return 50;
    return 25;
  };

  // Get all skills as a flat array
  const allSkills = Object.values(hardSkillsData).flat();

  // Process skills data for display
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