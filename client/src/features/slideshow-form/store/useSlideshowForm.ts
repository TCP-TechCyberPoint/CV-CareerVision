import { create } from 'zustand';

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
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
}

export const useSlideshowForm = create<SlideshowFormState>((set) => ({
  currentStep: 0,
  formData: {
    name: '',
    age: '',
    gender: '',
    email: '',
    skills: [],
  },
  setFormData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 10), // adjust max step later
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),
  resetForm: () =>
    set(() => ({
      currentStep: 0,
      formData: {
        name: '',
        age: '',
        gender: '',
        email: '',
        skills: [],
      },
    })),
}));
