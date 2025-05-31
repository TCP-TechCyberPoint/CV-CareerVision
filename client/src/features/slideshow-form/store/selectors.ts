import { useSlideshowFormStore } from "./store";
import { Gender } from "../types/vitals.types";

// Individual field selectors
export const useName = () =>
  useSlideshowFormStore((state) => state.formData.vitals?.name ?? "");

export const useAge = () =>
  useSlideshowFormStore((state) => state.formData.vitals?.age ?? 0);

export const useSkills = () =>
  useSlideshowFormStore((state) => state.formData.hardSkills?.skills ?? []);

export const useSlides = () =>
  useSlideshowFormStore((state) => state.formData.softSkills?.slides ?? []);

export const useDescription = () =>
  useSlideshowFormStore((state) => state.formData.softSkills?.description ?? "");

// Step selectors (optional groups)
export const useStepVitalsFields = () =>
  useSlideshowFormStore((state) => ({
    name: state.formData.vitals?.name ?? "",
    age: state.formData.vitals?.age ?? 0,
    gender: state.formData.vitals?.gender ?? Gender.Male,
    email: state.formData.vitals?.email ?? "",
  }));

export const useStepSkillsFields = () =>
  useSlideshowFormStore((state) => ({
    skills: state.formData.hardSkills?.skills ?? [],
  }));

export const useStepEducationFields = () =>
  useSlideshowFormStore((state) => ({
    degree: state.formData.education?.degree ?? "",
    fieldOfStudy: state.formData.education?.fieldOfStudy ?? "",
    institution: state.formData.education?.institution ?? "",
    graduationYear: state.formData.education?.graduationYear ?? "",
  }));

export const useStepProjectsFields = () =>
  useSlideshowFormStore((state) => ({
    projects: state.formData.projects ?? [],
  }));

// Full form data
export const useFormPreview = () =>
  useSlideshowFormStore((state) => state.formData);
