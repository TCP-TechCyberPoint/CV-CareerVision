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
  vitals: Vitals;
  hardSkills: HardSkill[];
  softSkills: SoftSkill[];
  education: Education;
  experiences: Experience[];
  projects: Project[];
  preferences: Preferences;
}
