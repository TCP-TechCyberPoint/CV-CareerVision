import { create } from "zustand";

interface FormData {
  name: string;
  age: string;
  gender: string;
  email: string;
  skills: string[];
}

interface SlideshowFormState {
  currentStep: number;
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;

  resetForm: () => void;
}

export const useSlideshowForm = create<SlideshowFormState>((set) => ({
  currentStep: 0,
  formData: {
    name: "",
    age: "",
    gender: "",
    email: "",
    skills: [],
  },
  setFormData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),

  resetForm: () =>
    set(() => ({
      currentStep: 0,
      formData: {
        name: "",
        age: "",
        gender: "",
        email: "",
        skills: [],
      },
    })),
}));
