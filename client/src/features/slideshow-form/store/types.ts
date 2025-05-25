import type { HardSkill } from "../types/hard-skills.type";
import type { SoftSkill } from "../types/soft-skills.type";
import type { Gender } from "../types/vitals.type";
import type { Degree, FieldOfStudy, Year } from "../types/education.type";

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
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate?: string;
  isCurrentJob: boolean | string;
  description?: string;
}



export interface SlideshowFormData {
  vitals?: Vitals;
  education?: Education;
  experiences?: Experience[];
  hardSkills?: HardSkills;
  softSkills?: SoftSkills;
}
