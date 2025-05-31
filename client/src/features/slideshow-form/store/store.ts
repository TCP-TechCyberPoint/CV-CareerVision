import { create } from "zustand";
import type {
  SlideshowFormState,
  SectionKey,
  SectionStatus,
} from "./store.types";



export const useSlideshowFormStore = create<SlideshowFormState>()((set) => ({
  formData: {},
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
