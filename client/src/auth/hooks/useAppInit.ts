import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/useAuth';
import type { AuthContextType } from '../types';
import { useSlideshowFormStore } from '@/features/slideshow-form/store/store';

export enum LoadingStep {
  INITIALIZING = 'Initializing...',
  AUTHENTICATING = 'Authenticating...',
  LOADING_DATA = 'Loading data...',
  READY = 'Ready',
}

const useAppInit = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth() as AuthContextType;
  const [loadingStep, setLoadingStep] = useState<LoadingStep>(LoadingStep.INITIALIZING);
  const initializationRef = useRef(false);

  const fetchInitialFormData = useSlideshowFormStore((state) => state.fetchInitialFormData);
  const formDataInitialized = useSlideshowFormStore((state) => state.initialized);

  useEffect(() => {
    // Reset initialization when authentication changes
    if (!isAuthenticated) {
      initializationRef.current = false;
      setLoadingStep(LoadingStep.INITIALIZING);
      return;
    }

    // Set loading step based on auth state
    if (authLoading) {
      setLoadingStep(LoadingStep.AUTHENTICATING);
      return;
    }

    // Initialize app data once authenticated
    if (isAuthenticated && !initializationRef.current && !formDataInitialized) {
      initializationRef.current = true;
      setLoadingStep(LoadingStep.LOADING_DATA);
      fetchInitialFormData();
    } else if (isAuthenticated && (initializationRef.current || formDataInitialized)) {
      setLoadingStep(LoadingStep.READY);
    }
  }, [isAuthenticated, authLoading, formDataInitialized, fetchInitialFormData]);

  const isLoading = loadingStep !== LoadingStep.READY;

  return {
    isAuthenticated,
    isLoading,
    loadingStep,
  };
};

export default useAppInit;