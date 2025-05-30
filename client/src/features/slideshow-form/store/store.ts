import { create } from "zustand";
import type { SlideshowFormData } from "./types";

interface SlideshowFormState {
  formData: Partial<SlideshowFormData>;
  updateFormData: (fields: Partial<SlideshowFormData>) => void;
  resetForm: () => void;
}

export const useSlideshowFormStore = create<SlideshowFormState>()((set) => ({
  formData: {},
  updateFormData: (fields) => {
    set((state) => ({ formData: { ...state.formData, ...fields } }));
  },
  resetForm: () => set({ formData: {} }),
}));
