import { useEffect, useRef, useState } from "react";
import { useSlideshowFormStore } from "@/features/slideshow-form/store/store";
import { useAuth0Integration } from "@/hooks/useAuth0Integration";

const useAppInit = () => {
  const { isAuthenticated, isLoading: auth0IsLoading } = useAuth0Integration();
  
  const initializationRef = useRef(false);
  const [loadingStep, setLoadingStep] = useState<string>("Initializing...");

  // Get the function separately to avoid recreation on every render
  const fetchInitialFormData = useSlideshowFormStore((state) => state.fetchInitialFormData);
  
  // Get state values separately
  const formDataIsLoading = useSlideshowFormStore((state) => state.isLoading);
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
    } else if (isAuthenticated && formDataInitialized) {
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

  // Calculate overall loading state
  const isLoading = auth0IsLoading || (isAuthenticated && formDataIsLoading && !formDataInitialized);

  return {
    isAuthenticated,
    isLoading,
    loadingStep,
    formDataIsLoading,
    auth0IsLoading
  };
};

export default useAppInit;
