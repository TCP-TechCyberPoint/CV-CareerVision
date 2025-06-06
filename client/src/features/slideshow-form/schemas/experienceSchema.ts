import { z } from "zod";

const experienceSchema = z
  .object({
    id: z.string().uuid(),
    jobTitle: z.string().min(1, "Job title is required"),
    company: z.string().min(1, "Company name is required"),
    startDate: z.string() as z.ZodType<string>,
    endDate: z.string().optional() as z.ZodType<string | undefined>,
    isCurrentJob: z.boolean(),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      // If it's a current job, no end date validation needed
      if (data.isCurrentJob === true) return true;

      // If not a current job, end date is required
      if (!data.endDate) return false;

      // Validate that end date is after start date
      return (
        new Date(data.endDate as string) > new Date(data.startDate as string)
      );
    },
    {
      message: "End date must be later than start date, or mark as current job",
      path: ["endDate"],
    }
  );

export const experienceFormSchema = z.object({
  experience: z
    .array(experienceSchema)
    .min(1, "At least one experience is required")
});

export type ExperienceFormData = z.infer<typeof experienceFormSchema>;
