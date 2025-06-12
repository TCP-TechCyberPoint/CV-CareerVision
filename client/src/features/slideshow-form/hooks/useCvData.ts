import { useCallback, useEffect } from "react";
import { useSlideshowFormStore } from "../store";
import cvService from "../services/cvService";

export const useCvData = () => {
  const updateFormData = useSlideshowFormStore((state) => state.updateFormData);

  const fetchCvData = useCallback(async () => {
    try {
      const cvData = await cvService.fetchCvData();
      if (cvData) {
        updateFormData(cvData);
      }
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch CV data");
      console.error("Error loading CV data:", error);
    }
  }, [updateFormData]);

  useEffect(() => {
    fetchCvData();
  }, [fetchCvData]);
};
