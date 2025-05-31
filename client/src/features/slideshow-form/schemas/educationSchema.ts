import { createListCollection } from "@chakra-ui/react";
import { z } from "zod";
import {
  DEGREES,
  FIELDS_OF_STUDY,
  INSTITUTIONS,
    GRADUATION_YEARS,
  
} from "@/features/slideshow-form/constants/education";
import type { Degree, FieldOfStudy, Year } from "../types/education.types";

export const degreesCollection = createListCollection({
  items: DEGREES.map((degree: Degree) => ({
    label: degree,
    value: degree,
  })),
});

export const fieldsOfStudyCollection = createListCollection({
  items: FIELDS_OF_STUDY.map((field: FieldOfStudy) => ({
    label: field,
    value: field,
  })),
});

export const initialInstitutesCollection = INSTITUTIONS.map(
  (institute: string) => ({
    label: institute,
    value: institute,
  })
);

export const initialYearsCollection = GRADUATION_YEARS.map((year: Year) => ({
  label: year,
  value: year,
}));

export const educationSchema = z.object({
  degree: z.enum(DEGREES, {
    required_error: "Please select a degree",
  }),
  fieldOfStudy: z.enum(FIELDS_OF_STUDY, {
    required_error: "Please select a field of study",
  }),
  institution: z.string().min(1, "Institution is required"),
  graduationYear: z
    .string()
    .min(4, "Graduation year must be 4 digits")
    .max(4, "Graduation year must be 4 digits")
    .refine((val) => {
      const year = parseInt(val);
      const currentYear = new Date().getFullYear();
      return year >= 1950 && year <= currentYear + 4;
    }, "Graduation year must be between 1950 and 4 years from now"),
});

export type EducationFormData = z.infer<typeof educationSchema>;
