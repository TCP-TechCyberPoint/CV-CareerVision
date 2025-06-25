import { useCallback, useEffect, useRef } from "react";
import { useSlideshowFormStore } from "../store";
import { useAuth0Integration } from "@/auth/useAuth0Integration";
import cvService from "../services/cvService";

export const useCvData = () => {
  const updateFormData = useSlideshowFormStore((state) => state.updateFormData);
  const { isAuthenticated, isLoading, user } = useAuth0Integration();
  const isFetchingRef = useRef(false);
  const retryCountRef = useRef(0);
  const maxRetries = 3;

  const fetchCvData = useCallback(async () => {
    if (isFetchingRef.current) {
      console.log("CV data fetch already in progress, skipping...");
      return;
    }
   
    if (isLoading) {
      console.log("Auth still loading, skipping CV data fetch...");
      return;
    }
    
    if (!isAuthenticated) {
      console.log("User not authenticated, skipping CV data fetch...");
      retryCountRef.current = 0; // Reset retry count when not authenticated
      return;
    }

    // SECURITY CHECK: Ensure we have a valid user before fetching
    if (!user?.email) {
      console.error("No user email available, cannot fetch CV data");
      if (retryCountRef.current < maxRetries) {
        retryCountRef.current++;
        console.log(`Retrying CV data fetch (${retryCountRef.current}/${maxRetries})...`);
        setTimeout(() => fetchCvData(), 1000); // Retry after 1 second
      }
      return;
    }

    try {
      isFetchingRef.current = true;
      retryCountRef.current = 0; // Reset retry count on successful attempt
      console.log(`Fetching CV data for user: ${user.email}`);
      
      const cvData = await cvService.fetchCvData();
      console.log("cvData received:", cvData ? "Data present" : "No data");
      
      if (cvData) {
        console.log(`Updating form data for user: ${user.email}`);
        updateFormData(cvData);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to fetch CV data");
      console.error("Error loading CV data:", error);
      
      // Retry on authentication errors
      if (error.message.includes("Authentication") && retryCountRef.current < maxRetries) {
        retryCountRef.current++;
        console.log(`Authentication error, retrying CV data fetch (${retryCountRef.current}/${maxRetries})...`);
        setTimeout(() => fetchCvData(), 2000); // Retry after 2 seconds
      }
    } finally {
      isFetchingRef.current = false;
    }
  }, [updateFormData, isAuthenticated, isLoading, user]);

  useEffect(() => {
    fetchCvData();
  }, [fetchCvData]);
};
