import { useCallback, useEffect, useRef } from "react";
import { useSlideshowFormStore } from "../store";
import { useAuth0Integration } from "@/hooks/useAuth0Integration";
import cvService from "../services/cvService";

export const useCvData = () => {
  const updateFormData = useSlideshowFormStore((state) => state.updateFormData);
  const { isAuthenticated, isLoading } = useAuth0Integration();
  const isFetchingRef = useRef(false);

  const fetchCvData = useCallback(async () => {
    // Prevent multiple simultaneous requests
    if (isFetchingRef.current) {
      return;
    }
    
    // Only fetch data if user is authenticated and not loading
    if (isLoading) {
      return;
    }
    
    // For API calls, we need Auth0 authentication specifically
    if (!isAuthenticated) {
      return;
    }

    try {
      isFetchingRef.current = true;
      console.log("Fetching CV data for authenticated user...");
      const cvData = await cvService.fetchCvData();
      if (cvData) {
        updateFormData(cvData);
      }
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch CV data");
      console.error("Error loading CV data:", error);
    } finally {
      isFetchingRef.current = false;
    }
  }, [updateFormData, isAuthenticated, isLoading]);

  useEffect(() => {
    fetchCvData();
  }, [fetchCvData]);
};
