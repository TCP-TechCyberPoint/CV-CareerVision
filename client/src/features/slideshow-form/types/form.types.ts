import type {
  Vitals,
  Education,
  Experience,
  Project,
  Preferences,
  HardSkill,
  SoftSkill,
} from "../types/index";

export interface SlideshowFormData {
  sectionName: keyof SlideshowFormData;
  sectionData: Vitals & HardSkill[] & SoftSkill[] & Education & Experience[] & Project[] & Preferences;
  vitals: Vitals;
  hardSkills: HardSkill[];
  softSkills: SoftSkill[];
  education: Education;
  experience: Experience[];
  projects: Project[];
  preferences: Preferences;
}
