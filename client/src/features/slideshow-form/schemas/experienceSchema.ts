import { z } from "zod";

const experienceSchema = z.object({
  id: z.string(),
  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  startDate: z.date({
    required_error: "Start date is required",
    invalid_type_error: "Please enter a valid date",
  }),
  endDate: z.date({
    invalid_type_error: "Please enter a valid date",
  }).optional().nullable(),
  isCurrentJob: z.boolean(),
  description: z.string().optional(),
});

export const experiencesFormSchema = z.object({
  experiences: z
    .array(experienceSchema)
    .min(1, "At least one experience is required"),
});

export type ExperiencesFormData = z.infer<typeof experiencesFormSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>; 