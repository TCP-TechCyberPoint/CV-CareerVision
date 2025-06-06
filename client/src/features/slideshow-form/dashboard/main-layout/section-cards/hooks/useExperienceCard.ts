import { useNavigate } from "react-router-dom";
import { useSlideshowFormStore } from "@slideshow-form/store";
import { getSectionStepPath } from "@slideshow-form/routes";

export const useExperienceStepForm = () => {
  const navigate = useNavigate();
  const { formData } = useSlideshowFormStore();

  // Handle both old format (single object) and new format (array)
  const experienceData = (() => {
    const experiences = formData.experience;
    if (!experiences) return [];
    if (Array.isArray(experiences)) return experiences;
    // Convert old single object format to array
    return [experiences];
  })();

  const handleClick = () => {
    navigate(getSectionStepPath("experience"));
  };

  // Calculate completion based on experience data
  const calculateCompletion = () => {
    if (!experienceData.length) return 0;

    let totalFields = 0;
    let filledFields = 0;

    experienceData.forEach((experience) => {
      const requiredFields = [
        experience.jobTitle,
        experience.company,
        experience.startDate,
        experience.description,
      ];

      totalFields += requiredFields.length;
      filledFields += requiredFields.filter(
        (field) => field !== undefined && field !== null && field !== ""
      ).length;
    });

    return totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
  };

  // Get completion color based on percentage
  const getCompletionColor = (percentage: number) => {
    if (percentage >= 75) return "green";
    if (percentage >= 50) return "blue";
    if (percentage >= 25) return "orange";
    return "red";
  };

  // Calculate total experience in years
  const calculateTotalExperience = () => {
    if (!experienceData.length) return "0 years";

    let totalMonths = 0;

    experienceData.forEach((experience) => {
      const startDate = new Date(experience.startDate);
      const endDate = experience.isCurrentJob
        ? new Date()
        : new Date(experience.endDate || experience.startDate);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
      totalMonths += diffMonths;
    });

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years === 0) return `${months} months`;
    if (months === 0) return `${years} years`;
    return `${years} years ${months} months`;
  };

  // Find current job
  const currentJob = experienceData.find((exp) => exp.isCurrentJob);

  // Process experience data for display
  const processedData = {
    currentRole:
      currentJob?.jobTitle || experienceData[0]?.jobTitle || "Not provided",
    currentCompany:
      currentJob?.company || experienceData[0]?.company || "Not provided",
    totalExperience: calculateTotalExperience(),
    totalJobs: experienceData.length,
    recentCompanies: experienceData
      .map((exp) => exp.company)
      .filter(Boolean)
      .slice(0, 3),
  };

  const completionPercentage = calculateCompletion();

  return {
    experienceData,
    processedData,
    handleClick,
    getCompletionColor,
    completionPercentage,
  };
};
