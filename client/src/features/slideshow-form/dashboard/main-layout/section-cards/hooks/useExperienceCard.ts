import { useNavigate } from "react-router-dom";
import { useSlideshowFormStore } from "@slideshow-form/store";
import { getSectionStepPath } from "@slideshow-form/routes";

export const useExperienceCard = () => {
  const navigate = useNavigate();
  const { formData } = useSlideshowFormStore();
  const experienceData = formData.experience;

  const handleClick = () => {
    navigate(getSectionStepPath("experience"));
  };

  // Calculate completion based on experience data
  const calculateCompletion = () => {
    if (!experienceData) return 0;
    
    // Check current job completion
    let totalFields = 4; // jobTitle, company, startDate, description
    let filledFields = 0;

    const currentJobFields = [
      experienceData.jobTitle, 
      experienceData.company, 
      experienceData.startDate, 
      experienceData.description
    ];
    
    filledFields += currentJobFields.filter(field => 
      field !== undefined && field !== null && field !== ""
    ).length;

    // Check previous jobs completion
    if (experienceData.previousJobs) {
      experienceData.previousJobs.forEach(job => {
        const requiredFields = [job.jobTitle, job.company, job.startDate, job.description];
        totalFields += requiredFields.length;
        filledFields += requiredFields.filter(field => 
          field !== undefined && field !== null && field !== ""
        ).length;
      });
    }

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
    if (!experienceData) return "0 years";
    
    let totalMonths = 0;
    
    // Calculate current job experience
    const currentStartDate = new Date(experienceData.startDate);
    const currentEndDate = experienceData.isCurrentJob ? new Date() : new Date(experienceData.endDate || experienceData.startDate);
    const currentDiffTime = Math.abs(currentEndDate.getTime() - currentStartDate.getTime());
    const currentDiffMonths = Math.ceil(currentDiffTime / (1000 * 60 * 60 * 24 * 30));
    totalMonths += currentDiffMonths;

    // Calculate previous jobs experience
    if (experienceData.previousJobs) {
      experienceData.previousJobs.forEach(job => {
        const startDate = new Date(job.startDate);
        const endDate = new Date(job.endDate || job.startDate);
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
        totalMonths += diffMonths;
      });
    }

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    if (years === 0) return `${months} months`;
    if (months === 0) return `${years} years`;
    return `${years} years ${months} months`;
  };

  // Process experience data for display
  const processedData = {
    currentRole: experienceData?.jobTitle || "Not provided",
    currentCompany: experienceData?.company || "Not provided",
    totalExperience: calculateTotalExperience(),
    totalJobs: 1 + (experienceData?.previousJobs?.length || 0),
    recentCompanies: [
      experienceData?.company,
      ...(experienceData?.previousJobs?.map(job => job.company) || [])
    ].filter(Boolean).slice(0, 3),
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