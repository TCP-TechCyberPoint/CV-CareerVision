import type { Degree, FieldOfStudy, Year } from "../types/education.type";
import type { Gender } from "../types/vitals.type";

export interface Slide {
  id: number;
  imageUrl: string;
  name: string;
  age: number;
  skills: string[];
  caption?: string;
}


export interface SlideshowFormData {
  // Vitals fields
  name: string;
  age?: number;
  gender?: Gender;
  email?: string;
  // Skills fields
  skills?: string[];
  description?: string;
  slides?: Slide[];
  softSkills?: string[];
  hardSkills?: string[];
  // Education fields
  degree?: Degree;
  fieldOfStudy?: FieldOfStudy;
  institution?: string;
  graduationYear?: Year;
}

