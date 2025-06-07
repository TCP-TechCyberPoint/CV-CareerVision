import { useNavigate } from "react-router-dom";
import { useSlideshowFormStore } from "@slideshow-form/store";
import { getSectionStepPath } from "@slideshow-form/routes";

export const useSoftSkillsCard = () => {
  const navigate = useNavigate();
  const { formData } = useSlideshowFormStore();
  const softSkillsData = formData.softSkills;

  const handleClick = () => {
    navigate(getSectionStepPath("softSkills"));
  };

  // Calculate completion based on skills data
  const calculateCompletion = () => {
    if (!softSkillsData || softSkillsData.length === 0) return 0;

    const skillsCount = softSkillsData.length;

    // Consider complete if has at least 3 skills
    if (skillsCount >= 5) return 100;
    if (skillsCount >= 3) return 75;
    if (skillsCount >= 1) return 50;
    return 25;
  };

  // Process skills data for display
  const processedData = {
    totalSkills: softSkillsData?.length || 0,
    skills: softSkillsData || [],
    categories:
      (softSkillsData?.length || 0) > 0 ? ["Interpersonal Skills"] : [],
  };

  const completionPercentage = calculateCompletion();

  return {
    softSkillsData,
    processedData,
    handleClick,
    completionPercentage,
  };
};
