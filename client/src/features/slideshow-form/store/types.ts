import type { Degree, FieldOfStudy, Year } from "../types/education.type";
import type { HardSkill } from "../types/hard-skills.type";
import type { SoftSkill } from "../types/soft-skills.type";
import type { Gender } from "../types/vitals.type";
import type { Experience } from "../types/experience.type";

export interface SlideshowFormData {
  // Vitals fields
  name: string;
  age?: number;
  gender?: Gender;
  email?: string;
  // Skills fields
  description?: string;
  softSkills?: SoftSkill[];
  hardSkills?: HardSkill[];
  // Education fields
  degree?: Degree;
  fieldOfStudy?: FieldOfStudy;
  institution?: string;
  graduationYear?: Year;
  // Experience fields
  experiences?: Experience[];
}
