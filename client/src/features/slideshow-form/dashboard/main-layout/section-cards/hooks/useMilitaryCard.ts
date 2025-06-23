import { useNavigate } from "react-router-dom";
import { useSlideshowFormStore } from "@slideshow-form/store/store";
import type { MilitaryService } from "@slideshow-form/types";

// Calculate completion percentage for military service section
const calculateMilitaryServiceCompletion = (militaryService: MilitaryService | undefined): number => {
  if (!militaryService || !militaryService.militaryServiceStatus) return 0;
  
  const status = militaryService.militaryServiceStatus;
  
  // For exempted or not_served status, only the status field is required
  if (status === 'exempted' || status === 'not_served') {
    return 100; // Complete since status is selected
  }
  
  const requiredFields = [
    militaryService.militaryServiceStatus,
  ];
  
  const optionalFields = [
    militaryService.serviceDuration,
    militaryService.serviceDetails,
    militaryService.degreeGroup,
    militaryService.degree,
  ];
  
  const filledRequiredFields = requiredFields.filter(field => 
    field && field.trim() !== ""
  ).length;
  
  const filledOptionalFields = optionalFields.filter(field => 
    field && field.trim() !== ""
  ).length;
  
  // Base completion from required fields (60%)
  const requiredCompletion = (filledRequiredFields / requiredFields.length) * 60;
  
  // Additional completion from optional fields (40%)
  const optionalCompletion = (filledOptionalFields / optionalFields.length) * 40;
  
  return Math.round(requiredCompletion + optionalCompletion);
};

export const useMilitaryCard = () => {
  const navigate = useNavigate();
  const militaryService = useSlideshowFormStore((state) => state.formData.military);

  const completionPercentage = calculateMilitaryServiceCompletion(militaryService);

  const isComplete = militaryService && militaryService.militaryServiceStatus;

  const handleClick = () => {
    navigate("/create-cv/military");
  };

  return {
    militaryService,
    completionPercentage,
    isComplete,
    handleClick,
  };
}; 