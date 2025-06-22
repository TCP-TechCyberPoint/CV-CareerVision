import type { SlideshowFormData } from "../types";
// shared.types.ts or constants.types.ts
export type CompletionStatus = "complete" | "incomplete" | "in-progress";

export type SectionStatusMap = {
  [K in keyof SlideshowFormData]?: CompletionStatus;
};

// For typing section progress logic
export type SectionKey = keyof SlideshowFormData;
export type SectionStatus = SectionStatusMap[SectionKey];

// Zustand store interface
export interface SlideshowFormState {
  formData: SlideshowFormData;
  initialized: boolean;
  isLoading: boolean;
  error: string | null;
  updateFormData: (fields: Partial<SlideshowFormData>) => void;
  setInitialized: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchInitialFormData: () => Promise<void>;
}
