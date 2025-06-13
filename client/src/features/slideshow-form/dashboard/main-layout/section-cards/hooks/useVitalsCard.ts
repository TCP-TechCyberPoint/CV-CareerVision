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

  // Function to calculate age from date of birth
  const calculateAge = (dateOfBirth: Date | string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    
    // Check if the date is valid
    if (isNaN(birthDate.getTime())) {
      return 0;
    }
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Format date for display
  const formatDate = (date: Date | string): string => {
    const dateObj = new Date(date);
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return "Invalid date";
    }
    
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Check if date is valid
  const isValidDate = (date: Date | string): boolean => {
    const dateObj = new Date(date);
    return !isNaN(dateObj.getTime());
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
    calculateAge,
    formatDate,
    formatAddress,
    completionPercentage,
    isValidDate,
  };
}; 