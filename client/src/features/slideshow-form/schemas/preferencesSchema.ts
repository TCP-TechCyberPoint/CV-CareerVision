import { z } from "zod";
import { createListCollection } from "@chakra-ui/react";

// Define string union types with const assertions
const CV_STYLES = ["minimal", "creative", "corporate"] as const;
const CV_PURPOSES = [
  "job hunt",
  "freelance", 
  "portfolio",
  "career change",
  "networking",
  "academic application"
] as const;

const PROFESSIONAL_PREFERENCES = [
  "fullstack developer",
  "frontend developer",
  "backend developer",
  "mobile developer",
  "DevOps engineer",
  "data scientist",
  "data analyst",
  "machine learning engineer",
  "product manager",
  "project manager",
  "UI/UX designer",
  "QA engineer",
  "security engineer",
  "CISO",
  "IT system administrator",
  "cloud architect",
  "software architect",
  "technical lead",
  "engineering manager"
] as const;

const EXPERIENCE_LEVELS = [
  "entry level (0-2 years)",
  "junior (2-4 years)",
  "mid-level (4-7 years)",
  "senior (7-10 years)",
  "lead/principal (10+ years)",
  "executive/C-level"
] as const;

const INDUSTRIES = [
  "all industries",
  "technology",
  "finance",
  "healthcare",
  "education",
  "e-commerce",
  "gaming",
  "fintech",
  "startup",
  "enterprise",
  "government",
  "non-profit",
  "consulting",
  "media",
  "automotive",
  "other"
] as const;

const SALARY_RANGES = [
  "prefer not to specify",
  "under $50,000",
  "$50,000 - $70,000",
  "$70,000 - $100,000",
  "$100,000 - $150,000",
  "$150,000 - $200,000",
  "over $200,000"
] as const;

// Export types for better type inference
export type CvStyle = typeof CV_STYLES[number];
export type CvPurpose = typeof CV_PURPOSES[number];
export type ProfessionalPreference = typeof PROFESSIONAL_PREFERENCES[number];
export type ExperienceLevel = typeof EXPERIENCE_LEVELS[number];
export type Industry = typeof INDUSTRIES[number];
export type SalaryRange = typeof SALARY_RANGES[number];

export const preferencesSchema = z.object({
  cvStyle: z.enum(CV_STYLES, {
    required_error: "Please select a CV style",
  }),
  cvPurpose: z.enum(CV_PURPOSES, {
    required_error: "Please select a CV purpose",
  }),
  professionalPreference: z.enum(PROFESSIONAL_PREFERENCES, {
    required_error: "Please select your professional preference",
  }),
  experienceLevel: z.enum(EXPERIENCE_LEVELS, {
    required_error: "Please select your experience level",
  }),
  industryPreference: z.enum(INDUSTRIES, {
    required_error: "Please select your preferred industry",
  }),
  targetSalaryRange: z.enum(SALARY_RANGES, {
    required_error: "Please select your target salary range",
  }),
});

// Collections for select fields - now using the same source of truth
export const cvStyleCollection = createListCollection({
  items: CV_STYLES.map((style) => ({
    label: style,
    value: style,
  })),
});

export const cvPurposeCollection = createListCollection({
  items: CV_PURPOSES.map((purpose) => ({
    label: purpose,
    value: purpose,
  })),
});

export const professionalPreferenceCollection = createListCollection({
  items: PROFESSIONAL_PREFERENCES.map((preference) => ({
    label: preference,
    value: preference,
  })),
});

export const experienceLevelCollection = createListCollection({
  items: EXPERIENCE_LEVELS.map((level) => ({
    label: level,
    value: level,
  })),
});

export const industryCollection = createListCollection({
  items: INDUSTRIES.map((industry) => ({
    label: industry,
    value: industry,
  })),
});

export const salaryRangeCollection = createListCollection({
  items: SALARY_RANGES.map((range) => ({
    label: range,
    value: range,
  })),
});

export type PreferencesFormData = z.infer<typeof preferencesSchema>; 