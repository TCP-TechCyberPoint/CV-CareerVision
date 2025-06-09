import { useCallback } from 'react';
import { useSlideshowFormStore } from '../store';

export const useLoadCvData = () => {
  const updateFormData = useSlideshowFormStore((state) => state.updateFormData);

  const loadCvData = useCallback(async (email: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cv/load/${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',      
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to load CV data:', errorData);
        return false;
      }

      const result = await response.json();
      console.log('CV data loaded successfully:', result);

      // Reconstruct form data from saved sections
      const formData: any = {};
      result.cv.forEach((section: any) => {
        formData[section.sectionName] = section.sectionData;
      });

      // Update the store with loaded data
      updateFormData(formData);

      return true;

    } catch (error) {
      console.error('Error loading CV data:', error);
      return false;
    }
  }, [updateFormData]);

  return { loadCvData };
}; 