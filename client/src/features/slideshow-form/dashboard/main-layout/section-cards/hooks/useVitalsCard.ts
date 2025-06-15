import { useNavigate } from "react-router-dom";
import { useSlideshowFormStore } from "@slideshow-form/store";
import { getSectionStepPath } from "@slideshow-form/routes";

export const useVitalsCard = () => {
  const navigate = useNavigate();
  const { formData } = useSlideshowFormStore();
  const vitalsData = formData.vitals;

  const handleClick = () => {
    navigate(getSectionStepPath("vitals"));
  };

   // Function to calculate completion percentage based on filled fields
  const calculateCompletion = () => {
    if (!vitalsData) return 0;

    const requiredFields = [
      vitalsData.name,
      vitalsData.dateOfBirth,
      vitalsData.email,
      vitalsData.phone,
      vitalsData.country,
      vitalsData.city,
      vitalsData.street,
    ];

    const filledFields = requiredFields.filter(field => 
      field !== undefined && field !== null && field !== ""
    ).length;

    return Math.round((filledFields / requiredFields.length) * 100);
  };

  // Format full address
  const formatAddress = () => {
    if (!vitalsData) return "Not provided";
    
    const parts = [
      vitalsData.street,
      vitalsData.city,
      vitalsData.country
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : "Not provided";
  };

  const completionPercentage = calculateCompletion();

  return {
    vitalsData,
    handleClick,
    
      formatAddress,
    completionPercentage,
    
  };
}; 