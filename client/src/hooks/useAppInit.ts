import { useEffect, useRef, useState } from "react";
import { useSlideshowFormStore } from "@/features/slideshow-form/store/store";
import { useAuth0Integration } from "@/auth/useAuth0Integration";

const useAppInit = () => {
  const { isAuthenticated, isLoading: auth0IsLoading } = useAuth0Integration();
  
  const initializationRef = useRef(false);
  const [loadingStep, setLoadingStep] = useState<string>("Initializing...");
  const [auth0Timeout, setAuth0Timeout] = useState(false);
  
  const fetchInitialFormData = useSlideshowFormStore((state) => state.fetchInitialFormData);
  const formDataInitialized = useSlideshowFormStore((state) => state.initialized);

  // Add timeout for Auth0 loading to prevent unnecessary loading states
  useEffect(() => {
    if (auth0IsLoading && !auth0Timeout) {
      const timeout = setTimeout(() => {
        setAuth0Timeout(true);
      }, 1500); // Increased from 300ms to 1500ms to give Auth0 more time

      return () => clearTimeout(timeout);
    } else if (!auth0IsLoading) {
      setAuth0Timeout(false);
    }
  }, [auth0IsLoading, auth0Timeout]);

  useEffect(() => {
    // Don't initialize if Auth0 is still loading (with timeout)
    if (auth0IsLoading && !auth0Timeout) {
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
  }, [isAuthenticated, auth0IsLoading, auth0Timeout, formDataInitialized, fetchInitialFormData]);

  // Reset initialization flag when authentication state changes
  useEffect(() => {
    if (!isAuthenticated) {
      initializationRef.current = false;
      setLoadingStep("Initializing...");
    }
  }, [isAuthenticated]);

  // Calculate overall loading state - optimized for page refreshes
  const isLoading = (auth0IsLoading && !auth0Timeout) && !isAuthenticated;

  return {
    isAuthenticated,
    isLoading,
    loadingStep
  };
};

export default useAppInit;
