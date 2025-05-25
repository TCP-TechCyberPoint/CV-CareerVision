import { z } from "zod";

const experienceSchema = z
  .object({
    id: z.string(),
    jobTitle: z.string().min(1, "Job title is required"),
    company: z.string().min(1, "Company name is required"),
    startDate: z.string() as z.ZodType<string>,
    endDate: z.string().optional() as z.ZodType<string | undefined>,
    isCurrentJob: z.union([z.boolean(), z.string()]),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.isCurrentJob === true || data.isCurrentJob === "on") return true;
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
  experiences: z
    .array(experienceSchema)
    .min(1, "At least one experience is required"),
});

export type ExperienceFormData = z.infer<typeof experienceFormSchema>;
