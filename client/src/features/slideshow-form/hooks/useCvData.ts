import { useCallback, useEffect, useRef } from "react";
import { useSlideshowFormStore } from "../store";
import { useAuth } from "@/auth/AuthProvider";
import cvService from "../services/cvService";

export const useCvData = () => {
  const updateFormData = useSlideshowFormStore((state) => state.updateFormData);
  const { authenticated, ready } = useAuth();
  const isFetchingRef = useRef(false);
  const retryCountRef = useRef(0);
  const maxRetries = 3;

  // Use refs to track the latest values without causing re-renders
  const authRef = useRef({ authenticated, ready });
  const updateFormDataRef = useRef(updateFormData);

  // Update refs when values change
  useEffect(() => {
    authRef.current = { authenticated, ready };
  }, [authenticated, ready]);

  useEffect(() => {
    updateFormDataRef.current = updateFormData;
  }, [updateFormData]);

  const fetchCvData = useCallback(async () => {
    if (isFetchingRef.current) {
      return;
    }
   
    if (!authRef.current.ready) {
      return;
    }
    
    if (!authRef.current.authenticated) {
      retryCountRef.current = 0; // Reset retry count when not authenticated
      return;
    }

    try {
      isFetchingRef.current = true;
      retryCountRef.current = 0; // Reset retry count on successful attempt
      
      const cvData = await cvService.fetchCvData();
      
      if (cvData) {
        updateFormDataRef.current(cvData);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to fetch CV data");
      console.error("Error loading CV data:", error);
      
      // Retry on authentication errors
      if (error.message.includes("Authentication") && retryCountRef.current < maxRetries) {
        retryCountRef.current++;
        setTimeout(() => fetchCvData(), 2000); // Retry after 2 seconds
      }
    } finally {
      isFetchingRef.current = false;
    }
  }, []); // Empty dependency array since we use refs

  useEffect(() => {
    fetchCvData();
  }, [authenticated, ready]); // Direct dependencies instead of fetchCvData
};
