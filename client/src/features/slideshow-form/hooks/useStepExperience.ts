import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSlideshowFormStore } from "../store";
import { experienceFormSchema } from "../schemas/experienceSchema";
import type { ExperienceFormData } from "../schemas/experienceSchema";
import type { Experience } from "../types/index";

const createEmptyExperience = (): Experience => ({
  id: crypto.randomUUID(),
  jobTitle: "",
  company: "",
  startDate: new Date().toISOString().split("T")[0],
  endDate: "",
  isCurrentJob: false,
  description: "",
});

export const useStepExperience = (nextStep: () => void) => {
  const experience = useSlideshowFormStore(
    (state) => state.formData.experience
  );
  const updateFormData = useSlideshowFormStore((state) => state.updateFormData);

  // Handle both old format (single object) and new format (array)
  const getDefaultExperience = () => {
    if (!experience) return [] as Experience[];
    return experience;
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
      experience: getDefaultExperience() as Experience[],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const watchedExperience = watch("experience");

  const addExperience = () => {
    append(createEmptyExperience());
  };

  const removeExperience = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const getCurrentJobsCount = () => {
    return (
      watchedExperience?.filter((exp) => exp?.isCurrentJob === true).length ||
      0
    );
  };

  const hasMultipleCurrentJobs = () => {
    return getCurrentJobsCount() > 1;
  };

  const onSubmit = (data: ExperienceFormData) => {
    updateFormData({ experience: data.experience });
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
    watchedExperience,
    addExperience,
    removeExperience,
    getCurrentJobsCount,
    hasMultipleCurrentJobs,
  };
};
