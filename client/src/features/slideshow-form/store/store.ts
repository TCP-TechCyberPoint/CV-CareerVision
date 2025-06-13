import { create } from "zustand";
import type { SlideshowFormState } from "./types";
import type { SlideshowFormData } from "../types";
import { persist } from "zustand/middleware";
import cvService from "../services/cvService";

export const useSlideshowFormStore = create<SlideshowFormState>()(
  persist(
    (set, get) => ({
      formData: {} as SlideshowFormData,
      initialized: false,

      updateFormData: (fields) => {
        set((state) => ({ formData: { ...state.formData, ...fields } }));
      },
      setInitialized: () => set({ initialized: true }),
      fetchInitialFormData: async () => {
        if (get().initialized) return;

        try {
          const data = await cvService.fetchCvData();
          set({ formData: data, initialized: true });
        } catch (err) {
          console.error("CV Fetch Error:", err);
        }
      },
    }),
    {
      name: "slideshow-form-storage",
      partialize: (state) => ({
        formData: state.formData,
        initialized: state.initialized,
      }),
    }
  )
);
