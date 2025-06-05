import type { HardSkill } from "../types/skills/hard-skills.types";
import type { SoftSkill } from "../types/skills/soft-skills.types";
import type { Gender } from "../types/vitals.types";
import type { Degree, FieldOfStudy, Year } from "../types/education.types";
import type { Project } from "../types/projects.types";
import type { Preferences } from "../types/preferences.types";

export interface Vitals {
  name: string;
  age: number;
  gender: Gender;
  email: string;
}

export interface SoftSkills {
  [key: string]: SoftSkill[];
}

export interface HardSkills {
  [key: string]: HardSkill[];
}

export interface Education {
  degree: Degree;
  fieldOfStudy: FieldOfStudy;
  institution: string;
  graduationYear: Year;
}

export interface Experience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate?: string;
  isCurrentJob: boolean;
  description?: string;
}

export interface PreviousJob {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface SlideshowFormData {
  vitals?: Vitals;
  education?: Education;
  experience?: Experience[];
  projects?: Project[];
  hardSkills?: HardSkills;
  softSkills?: SoftSkills;
  preferences?: Preferences;
}
