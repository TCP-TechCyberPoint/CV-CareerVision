import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSlideshowFormStore } from "../store";
import {
  experienceFormSchema,
  type ExperienceFormData,
} from "../schemas/experienceSchema";
import type { Experience } from "../types/index";

const createEmptyExperience = (): Experience => ({
  id: crypto.randomUUID(),
  jobTitle: "",
  company: "",
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date().toISOString().split("T")[0],
  isCurrentJob: false,
  description: "",
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
      experience: (formData.experience as Experience[]) ?? [
        createEmptyExperience(),
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const addNewExperience = () => append(createEmptyExperience());

  const removeExperience = (index: number) => {
    if (fields.length > 1) remove(index);
  };

  const onSubmit = (data: ExperienceFormData) => {
    const experience: Experience[] = data.experience.map(
      (exp): Experience => ({
        id: exp.id as string,
        jobTitle: exp.jobTitle as string,
        company: exp.company as string,
        startDate: exp.startDate as string,
        endDate: exp.isCurrentJob ? undefined : (exp.endDate as string),
        isCurrentJob: exp.isCurrentJob === true || exp.isCurrentJob === "on",
        description: exp.description as string | undefined,
      })
    );
    updateFormData({ experience });
    nextStep();
  };

  return {
    register,
    handleSubmit,
    control,
    fields,
    addNewExperience,
    removeExperience,
    setValue,
    onSubmit,
    errors,
    watchedExperiences: watch("experience"),
  };
};
