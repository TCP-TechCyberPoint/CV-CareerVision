import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSlideshowFormStore } from "../store";
import {
  experienceFormSchema,
  type ExperienceFormData,
} from "../schemas/experienceSchema";
import type { Experience } from "../types/index";

const createEmptyExperience = (): Experience => ({
  jobTitle: "",
  company: "",
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date().toISOString().split("T")[0],
  isCurrentJob: false,
  description: "",
  previousJobs: [],
});

export const useStepExperience = (nextStep: () => void) => {
  const { formData, updateFormData } = useSlideshowFormStore();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      experience: formData.experience ?? createEmptyExperience(),
    },
  });

  const onSubmit = (data: ExperienceFormData) => {
    const experience: Experience = {
      jobTitle: data.experience.jobTitle as string,
      company: data.experience.company as string,
      startDate: data.experience.startDate as string,
      endDate: data.experience.isCurrentJob ? undefined : (data.experience.endDate as string),
      isCurrentJob: data.experience.isCurrentJob === true,
      description: data.experience.description as string | undefined,
      previousJobs: data.experience.previousJobs || [],
    };
    updateFormData({ experience });
    nextStep();
  };

  return {
    register,
    handleSubmit,
    control,
    setValue,
    onSubmit,
    errors,
    watchedExperience: watch("experience"),
  };
};
