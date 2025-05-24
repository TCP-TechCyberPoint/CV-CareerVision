import { israelEducationInstitutes } from "@/data/israelEducationInstitutes";

export const DEGREES = [
  "Bachelor",
  "Master",
  "PhD",
  "Associate",
  "Diploma",
  "Other",
] as const;

export const FIELDS_OF_STUDY = [
  "Computer Science",
  "Software Engineering",
  "Information Technology",
  "Data Science",
  "Artificial Intelligence",
  "Computer Engineering",
  "Information Systems",
  "Other",
] as const;

// Generate graduation years from 1950 to current year + 4
const currentYear = new Date().getFullYear();
export const GRADUATION_YEARS = Array.from(
  { length: currentYear + 4 - 1950 + 1 },
  (_, i) => (1950 + i).toString()
).reverse(); // Most recent years first

// Extract institutions from the main data source
export const INSTITUTIONS = israelEducationInstitutes.map((institute) => 
  institute.englishName || institute.hebrewName
);

export type DegreeType = typeof DEGREES[number];
export type FieldOfStudyType = typeof FIELDS_OF_STUDY[number]; 