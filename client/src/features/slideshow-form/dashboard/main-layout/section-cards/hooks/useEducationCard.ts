import { useNavigate } from "react-router-dom";
import { useSlideshowFormStore } from "@slideshow-form/store";
import { getSectionStepPath } from "@slideshow-form/routes";

export const useEducationCard = () => {
  const navigate = useNavigate();
  const { formData } = useSlideshowFormStore();
  const educationData = formData.education;

  const handleClick = () => {
    navigate(getSectionStepPath("education"));
  };

  // Calculate completion based on education data
  const calculateCompletion = () => {
    if (!educationData) return 0;

    const requiredFields = [
      educationData.degree,
      educationData.fieldOfStudy,
      educationData.institution,
      educationData.graduationYear,
    ];

    const filledFields = requiredFields.filter(
      (field) => field !== undefined && field !== null && field !== ""
    ).length;

    return Math.round((filledFields / requiredFields.length) * 100);
  };

  // Get completion color based on percentage
  const getCompletionColor = (percentage: number) => {
    if (percentage >= 75) return "green";
    if (percentage >= 50) return "blue";
    if (percentage >= 25) return "orange";
    return "red";
  };

  // Process education data for display
  const processedData = {
    latestDegree:
      educationData?.degree && educationData?.fieldOfStudy
        ? `${educationData.degree} in ${educationData.fieldOfStudy}`
        : "Not provided",
    institution: educationData?.institution || "Not provided",
    graduationYear: educationData?.graduationYear || "N/A",
    certifications: educationData?.certifications || [],
  };

  const completionPercentage = calculateCompletion();

  return {
    educationData,
    processedData,
    handleClick,
    getCompletionColor,
    completionPercentage,
  };
};
