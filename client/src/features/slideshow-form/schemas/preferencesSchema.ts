import { z } from "zod";
import { createListCollection } from "@chakra-ui/react";
import { 
  CvStyle, 
  CvPurpose, 
  ProfessionalPreference, 
  ExperienceLevel, 
  Industry, 
  SalaryRange 
} from "../types/preferences.type";

export const preferencesSchema = z.object({
  cvStyle: z.nativeEnum(CvStyle, {
    required_error: "Please select a CV style",
  }),
  cvPurpose: z.nativeEnum(CvPurpose, {
    required_error: "Please select a CV purpose",
  }),
  professionalPreference: z.nativeEnum(ProfessionalPreference, {
    required_error: "Please select your professional preference",
  }),
  experienceLevel: z.nativeEnum(ExperienceLevel, {
    required_error: "Please select your experience level",
  }),
  industryPreference: z.nativeEnum(Industry, {
    required_error: "Please select your preferred industry",
  }),
  targetSalaryRange: z.nativeEnum(SalaryRange, {
    required_error: "Please select your target salary range",
  }),
});

// Collections for select fields
export const cvPurposeCollection = createListCollection({
  items: Object.values(CvPurpose).map((purpose) => ({
    label: purpose,
    value: purpose,
  })),
});

export const professionalPreferenceCollection = createListCollection({
  items: Object.values(ProfessionalPreference).map((preference) => ({
    label: preference,
    value: preference,
  })),
});

export const experienceLevelCollection = createListCollection({
  items: Object.values(ExperienceLevel).map((level) => ({
    label: level,
    value: level,
  })),
});

export const industryCollection = createListCollection({
  items: Object.values(Industry).map((industry) => ({
    label: industry,
    value: industry,
  })),
});

export const salaryRangeCollection = createListCollection({
  items: Object.values(SalaryRange).map((range) => ({
    label: range,
    value: range,
  })),
});

export type PreferencesFormData = z.infer<typeof preferencesSchema>; 