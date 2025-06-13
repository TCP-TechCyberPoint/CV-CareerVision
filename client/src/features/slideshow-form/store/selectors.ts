import { useSlideshowFormStore } from "./store";

// Individual field selectors
export const useName = () =>
  useSlideshowFormStore((state) => state.formData.vitals?.name ?? "");

export const useDateOfBirth = () =>
  useSlideshowFormStore((state) => state.formData.vitals?.dateOfBirth ?? new Date(2000, 0, 1));

export const useSkills = () =>
  useSlideshowFormStore((state) => state.formData.hardSkills ?? {});

export const useSoftSkills = () =>
  useSlideshowFormStore((state) => state.formData.softSkills ?? []);

// Step selectors (optional groups)
export const useStepVitalsFields = () =>
  useSlideshowFormStore((state) => ({
    name: state.formData.vitals?.name ?? "",
    dateOfBirth: state.formData.vitals?.dateOfBirth ?? new Date(2000, 0, 1),
    gender: state.formData.vitals?.gender ?? "Male",
    email: state.formData.vitals?.email ?? "",
    country: state.formData.vitals?.country ?? "",
    city: state.formData.vitals?.city ?? "",
    street: state.formData.vitals?.street ?? "",
    phone: state.formData.vitals?.phone ?? "",
    linkedin: state.formData.vitals?.linkedin ?? "",
    github: state.formData.vitals?.github ?? "",
  }));

export const useStepSkillsFields = () =>
  useSlideshowFormStore((state) => ({
    skills: state.formData.hardSkills ?? {},
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
