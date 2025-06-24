import { useEffect, useRef, useState } from "react";
import { useSlideshowFormStore } from "@/features/slideshow-form/store/store";
import { useAuth0Integration } from "@/auth/useAuth0Integration";

const useAppInit = () => {
  const { isAuthenticated, isLoading: auth0IsLoading } = useAuth0Integration();
  
  const initializationRef = useRef(false);
  const [loadingStep, setLoadingStep] = useState<string>("Initializing...");
  
  const fetchInitialFormData = useSlideshowFormStore((state) => state.fetchInitialFormData);
  const formDataInitialized = useSlideshowFormStore((state) => state.initialized);

  useEffect(() => {
    // Don't initialize if Auth0 is still loading
    if (auth0IsLoading) {
      setLoadingStep("Authenticating...");
      return;
    }

    // Don't initialize if already done
    if (initializationRef.current) {
      return;
    }

    // Only initialize if authenticated and form data hasn't been initialized
    if (isAuthenticated && !formDataInitialized) {
      initializationRef.current = true;
      setLoadingStep("Loading your data...");
      fetchInitialFormData();
    } else {
      setLoadingStep("Ready!");
    }
  }, [isAuthenticated, auth0IsLoading, formDataInitialized, fetchInitialFormData]);

  // Reset initialization flag when authentication state changes
  useEffect(() => {
    if (!isAuthenticated) {
      initializationRef.current = false;
      setLoadingStep("Initializing...");
    }
  }, [isAuthenticated]);

  // Calculate overall loading state - only show loading if Auth0 is loading AND user is not authenticated
  const isLoading = auth0IsLoading && !isAuthenticated;

  return {
    isAuthenticated,
    isLoading,
    loadingStep
  };
};

export default useAppInit;
