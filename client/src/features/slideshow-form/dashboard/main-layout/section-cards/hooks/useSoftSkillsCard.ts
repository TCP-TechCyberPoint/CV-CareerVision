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

  const calculateCompletion = () => {
    if (!softSkillsData || softSkillsData.length === 0) return 0;

    const skillsCount = softSkillsData.length;

    if (skillsCount >= 5) return 100;
    return Math.round((skillsCount / 5) * 100);
  };

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
