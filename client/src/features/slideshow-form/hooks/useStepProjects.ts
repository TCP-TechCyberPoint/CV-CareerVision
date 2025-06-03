import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ProjectsFormData,
  projectsFormSchema,
} from "../schemas/projectsSchema";
import { useSlideshowFormStore } from "../store";
import type { Project } from "../types/index";

const createEmptyProject = (): Project => ({  
  id: crypto.randomUUID(),
  projectName: "",
  description: "",
  projectTech: [],
  projectLink: "",
});

export const useStepProjects = (nextStep: () => void) => {
  const { formData, updateFormData } = useSlideshowFormStore();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectsFormData>({
    resolver: zodResolver(projectsFormSchema),
    defaultValues: {
      projects: (formData.projects as Project[]) ?? [createEmptyProject()],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const addNewProject = () => append(createEmptyProject());

  const removeProject = (index: number) => {
    if (fields.length > 1) remove(index);
  };

  const onSubmit = (data: ProjectsFormData) => {
    const projects: Project[] = data.projects.map((project): Project => ({
      id: project.id as string,
      projectName: project.projectName as string,
      description: project.description as string,
      projectTech: project.projectTech as string[],
      projectLink: project.projectLink as string,
    }));
    updateFormData({ projects });
    nextStep();
  };

  return {
    register,
    handleSubmit,
    control,
    fields,
    addNewProject,
    removeProject,
    setValue,
    onSubmit,
    errors,
    watchedProjects: watch("projects"),
  };
}; 