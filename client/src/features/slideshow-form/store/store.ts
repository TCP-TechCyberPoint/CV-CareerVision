import { create } from "zustand";
import type { SlideshowFormState } from "./types";
import type { SlideshowFormData } from "../types";
import { createJSONStorage, persist } from "zustand/middleware";
import cvService from "../services/cvService";

// Retry logic with exponential backoff
const retryWithBackoff = async <T>(
  operation: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // If this is the last attempt, don't wait
      if (attempt === maxAttempts) {
        break;
      }
      
      // Calculate delay with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt - 1);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
};

export const useSlideshowFormStore = create<SlideshowFormState>()(
  persist(
    (set, get) => ({
      formData: {} as SlideshowFormData,
      initialized: false,
      isLoading: false,
      error: null,

      updateFormData: (fields) => {
        set((state) => ({ formData: { ...state.formData, ...fields } }));
      },
      setInitialized: () => set({ initialized: true }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),
      fetchInitialFormData: async () => {
        if (get().initialized) {
          return;
        }

        set({ isLoading: true, error: null });
        
        try {
          const data = await retryWithBackoff(
            () => cvService.fetchCvData(),
            3, // max attempts
            1000 // base delay
          );
          set({ formData: data, initialized: true, isLoading: false });
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : "Failed to fetch CV data";
          console.error("CV Fetch Error:", err);
          set({ error: errorMessage, isLoading: false });
        }
      },
    }),
    {
      name: "slideshow-form-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ formData: state.formData }),
    }
  )
);
