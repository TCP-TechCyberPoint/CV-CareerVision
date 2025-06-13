export type FieldOfStudy =
  | "Computer Science"
  | "Software Engineering"
  | "Information Technology"
  | "Data Science"
  | "Artificial Intelligence"
  | "Computer Engineering"
  | "Information Systems"
  | "Other";

export type Degree =
  | "Bachelor"
  | "Master"
  | "PhD"
  | "Associate"
  | "Diploma"
  | "Other";

export type Year = string;

export interface Education {
  degree: Degree;
  fieldOfStudy: FieldOfStudy;
  institution: string;
  graduationYear: string;
  certifications?: string[];
}
