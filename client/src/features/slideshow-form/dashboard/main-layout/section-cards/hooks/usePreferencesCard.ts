import { useNavigate } from "react-router-dom";
import { useSlideshowFormStore } from "@slideshow-form/store";
import { getSectionStepPath } from "@slideshow-form/routes";

export const usePreferencesCard = () => {
  const navigate = useNavigate();
  const { formData } = useSlideshowFormStore();
  const preferencesData = formData.preferences;

  const handleClick = () => {
    navigate(getSectionStepPath("preferences"));
  };

  const calculateCompletion = () => {
    if (!preferencesData) return 0;

    const requiredFields = [
      preferencesData.cvStyle,
      preferencesData.cvPurpose,
      preferencesData.professionalPreference,
      preferencesData.experienceLevel,
      preferencesData.industryPreference,
      preferencesData.targetSalaryRange,
    ];

    const filledFields = requiredFields.filter(
      (field) => field !== undefined && field !== null
    ).length;

    return Math.round((filledFields / requiredFields.length) * 100);
  };



  // Process preferences data for display
  const processedData = {
    preferredRole: preferencesData?.professionalPreference || "Not specified",
    workType: preferencesData?.experienceLevel || "Not specified",
    location: "Remote", // Mock data - could be added to store later
    salaryRange: preferencesData?.targetSalaryRange || "Not specified",
    industries: preferencesData?.industryPreference
      ? [preferencesData.industryPreference]
      : [],
    jobType: preferencesData?.cvPurpose || "Not specified",
  };

  const completionPercentage = calculateCompletion();

  return {
    preferencesData,
    processedData,
    handleClick,
    completionPercentage,
  };
};
