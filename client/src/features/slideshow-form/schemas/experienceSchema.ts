import { z } from "zod";

const experienceSchema = z.object({
  id: z.string(),
  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  isCurrentJob: z.boolean(),
  description: z.string().optional(),
});

export const experienceFormSchema = z.object({
  experiences: z.array(experienceSchema).min(1, "At least one experience is required"),
});

export type ExperienceFormData = z.infer<typeof experienceFormSchema>; 