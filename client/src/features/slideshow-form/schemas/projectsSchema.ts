import { z } from "zod";

const projectSchema = z.object({
  id: z.string().uuid("Project ID must be a valid UUID"),
  projectName: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Project description is required"),
  projectTech: z.array(z.string()).min(1, "At least one technology is required"),
  projectLink: z.string().url("Please enter a valid URL").min(1, "Project link is required"),
});

export const projectsFormSchema = z.object({
  projects: z
    .array(projectSchema)
    .min(1, "At least one project is required"),
});

export type ProjectsFormData = z.infer<typeof projectsFormSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>; 