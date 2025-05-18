import { useSlideshowFormStore } from './store';
import { Gender } from './types';

// Individual field selectors
export const useName = () =>
  useSlideshowFormStore((state) => state.formData.name ?? '');

export const useAge = () =>
  useSlideshowFormStore((state) => state.formData.age ?? 0);

export const useSkills = () =>
  useSlideshowFormStore((state) => state.formData.skills ?? []);

export const useSlides = () =>
  useSlideshowFormStore((state) => state.formData.slides ?? []);

export const useDescription = () =>
  useSlideshowFormStore((state) => state.formData.description ?? '');

// Step selectors (optional groups)
export const useStepVitalsFields = () =>
  useSlideshowFormStore((state) => ({
    name: state.formData.name ?? '',
    age: state.formData.age ?? 0,
    gender: state.formData.gender ?? Gender.Male,
    email: state.formData.email ?? '',
  }));

export const useStepSkillsFields = () =>
  useSlideshowFormStore((state) => ({
    skills: state.formData.skills ?? [],
  }));


// Full form data
export const useFormPreview = () =>
  useSlideshowFormStore((state) => state.formData);
