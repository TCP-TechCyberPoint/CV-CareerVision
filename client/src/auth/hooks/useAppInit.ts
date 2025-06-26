import { useEffect, useRef, useState } from "react";
import { useSlideshowFormStore } from "@/features/slideshow-form/store/store";
import { useAuth0Integration } from "./useAuth0Integration";
import { AUTH_CONSTANTS } from "../constants";

const useAppInit = () => {
  const { isAuthenticated, isLoading: auth0IsLoading } = useAuth0Integration();
  
  const initializationRef = useRef(false);
  const [loadingStep, setLoadingStep] = useState<string>(AUTH_CONSTANTS.LOADING_STEPS.INITIALIZING);
  
  const fetchInitialFormData = useSlideshowFormStore((state) => state.fetchInitialFormData);
  const formDataInitialized = useSlideshowFormStore((state) => state.initialized);

  useEffect(() => {
    if (auth0IsLoading) {
      setLoadingStep(AUTH_CONSTANTS.LOADING_STEPS.AUTHENTICATING);
      return;
    }

    if (initializationRef.current) {
      return;
    }

    if (isAuthenticated && !formDataInitialized) {
      initializationRef.current = true;
      setLoadingStep(AUTH_CONSTANTS.LOADING_STEPS.LOADING_DATA);
      fetchInitialFormData();
    } else {
      setLoadingStep(AUTH_CONSTANTS.LOADING_STEPS.READY);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, auth0IsLoading, formDataInitialized]);

  // Reset initialization flag when authentication state changes
  useEffect(() => {
    if (!isAuthenticated) {
      initializationRef.current = false;
      setLoadingStep(AUTH_CONSTANTS.LOADING_STEPS.INITIALIZING);
    }
  }, [isAuthenticated]);

  // Calculate overall loading state
  const isLoading = auth0IsLoading && !isAuthenticated;

  return {
    isAuthenticated,
    isLoading,
    loadingStep
  };
};

export default useAppInit; 