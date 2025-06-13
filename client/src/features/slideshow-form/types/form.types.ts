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
  hardSkills: { [key: string]: HardSkill[] };
  softSkills: SoftSkill[];
  education: Education;
  experience: Experience[];
  projects: Project[];
  preferences: Preferences;
}
