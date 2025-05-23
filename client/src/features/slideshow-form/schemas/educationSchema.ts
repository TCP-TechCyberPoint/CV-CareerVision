import { createListCollection } from "@chakra-ui/react";
import { z } from "zod";
export const DEGREES = [
  "Bachelor",
  "Master",
  "PhD",
  "Associate",
  "Diploma",
  "Other",
] as const;

export const degreesCollection = createListCollection({
  items: [
    { label: "Bachelor", value: "Bachelor" },
    { label: "Master", value: "Master" },
    { label: "PhD", value: "PhD" },
    { label: "Associate", value: "Associate" },
    { label: "Diploma", value: "Diploma" },
    { label: "Other", value: "Other" },
  ],
});

export const educationSchema = z.object({
  degree: z.enum(DEGREES, {
    required_error: "Please select a degree",
  }),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
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
