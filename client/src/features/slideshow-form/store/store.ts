import { create } from "zustand";
import type { SlideshowFormState, SectionKey, SectionStatus } from "./types";
import type { SlideshowFormData } from "../types";

export const useSlideshowFormStore = create<SlideshowFormState>()((set) => ({
  formData: {} as SlideshowFormData,

  sectionStatus: {},
  updateFormData: (fields) => {
    set((state) => ({ formData: { ...state.formData, ...fields } }));
  },

  updateSectionStatus: (section: SectionKey, status: SectionStatus) => {
    set((state) => ({
      sectionStatus: { ...state.sectionStatus, [section]: status },
    }));
  },
}));
