import { useNavigate } from "react-router-dom";
import { useSlideshowFormStore } from "@slideshow-form/store";
import { getSectionStepPath } from "@slideshow-form/routes";

export const useHardSkillsCard = () => {
  const navigate = useNavigate();
  const { formData } = useSlideshowFormStore();
  const hardSkillsData = formData.hardSkills;

  const handleClick = () => {
    navigate(getSectionStepPath("hardSkills"));
  };

  // Calculate completion based on skills data
  const calculateCompletion = () => {
    if (!hardSkillsData || hardSkillsData.length === 0) return 0;
    
    const skillsCount = hardSkillsData.length;
    
    // Consider complete if has at least 3 skills
    if (skillsCount >= 5) return 100;
    if (skillsCount >= 3) return 75;
    if (skillsCount >= 1) return 50;
    return 25;
  };

  // Process skills data for display
  const processedData = {
    totalSkills: hardSkillsData?.length || 0,
    topSkills: hardSkillsData?.slice(0, 3) || [],
    skills: hardSkillsData || [],
  };

  const completionPercentage = calculateCompletion();

  return {
    hardSkillsData,
    processedData,
    handleClick,
    completionPercentage,
  };
}; 