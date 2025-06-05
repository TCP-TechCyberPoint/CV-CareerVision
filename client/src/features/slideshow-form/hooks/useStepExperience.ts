import { useForm, useFieldArray } from "react-hook-form";
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
  endDate: "",
  isCurrentJob: false,
  description: "",
});

export const useStepExperience = (nextStep: () => void) => {
  const { formData, updateFormData } = useSlideshowFormStore();

  // Handle both old format (single object) and new format (array)
  const getDefaultExperiences = () => {
    const experience = formData.experience;
    if (!experience) return [createEmptyExperience()];
    if (Array.isArray(experience)) return experience.length ? experience : [createEmptyExperience()];
    // Convert old single object format to array
    return [experience];
  };

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
      experiences: getDefaultExperiences(),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const watchedExperiences = watch("experiences");

  const addExperience = () => {
    append(createEmptyExperience());
  };

  const removeExperience = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const getCurrentJobsCount = () => {
    return watchedExperiences?.filter(exp => exp?.isCurrentJob === true).length || 0;
  };

  const hasMultipleCurrentJobs = () => {
    return getCurrentJobsCount() > 1;
  };

  const onSubmit = (data: ExperienceFormData) => {
      updateFormData({ experience: data.experiences });
    nextStep();
  };

  return {
    register,
    handleSubmit,
    control,
    setValue,
    onSubmit,
    errors,
    fields,
    watchedExperiences,
    addExperience,
    removeExperience,
    getCurrentJobsCount,
    hasMultipleCurrentJobs,
  };
};
