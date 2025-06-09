import { useCallback } from 'react';
import { useSlideshowFormStore } from '../store';

export const useSaveCvData = () => {
  const formData = useSlideshowFormStore((state) => state.formData);

  const saveSectionData = useCallback(async (sectionName: string, sectionData: any) => {
    try {
      const email = formData.vitals?.email;
      
      if (!email) {
        console.error('No email found in form data');
        return false;
      }

      const response = await fetch('http://localhost:5000/api/cv/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          sectionName,
          sectionData
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to save CV data:', errorData);
        return false;
      }

      const result = await response.json();
      console.log('CV data saved successfully:', result);
      return true;

    } catch (error) {
      console.error('Error saving CV data:', error);
      return false;
    }
  }, [formData.vitals?.email]);

  return { saveSectionData };
}; 