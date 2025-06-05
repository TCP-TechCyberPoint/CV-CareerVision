import { z } from "zod";

const previousJobSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  startDate: z.string() as z.ZodType<string>,
  endDate: z.string().optional() as z.ZodType<string | undefined>,
  description: z.string().optional(),
});

const experienceSchema = z
  .object({
    jobTitle: z.string().min(1, "Job title is required"),
    company: z.string().min(1, "Company name is required"),
    startDate: z.string() as z.ZodType<string>,
    endDate: z.string().optional() as z.ZodType<string | undefined>,
    isCurrentJob: z.boolean(),
    description: z.string().optional(),
    previousJobs: z.array(previousJobSchema).optional(),
  })
  .refine(
    (data) => {
      if (data.isCurrentJob === true) return true;
      if (!data.endDate) return false;
      return (
        new Date(data.endDate as string) > new Date(data.startDate as string)
      );
    },
    {
      message: "End date must be later than start date",
      path: ["endDate"],
    }
  );

export const experienceFormSchema = z.object({
  experience: experienceSchema,
});

export type ExperienceFormData = z.infer<typeof experienceFormSchema>;
