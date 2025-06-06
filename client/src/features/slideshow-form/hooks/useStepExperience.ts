import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ExperiencesFormData,
  experiencesFormSchema,
} from "../schemas/experienceSchema";
import { useSlideshowFormStore } from "../store";
import type { Experience } from "../types/index";

const createEmptyExperience = (): Experience => ({  
  id: crypto.randomUUID(),
  jobTitle: "",
  company: "",
  startDate: new Date(),
  endDate: null,
  isCurrentJob: false,
  description: "",
});

export const useStepExperience = (nextStep: () => void) => {
  const experiences = useSlideshowFormStore((state) => state.formData.experiences);
  const updateFormData = useSlideshowFormStore((state) => state.updateFormData);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ExperiencesFormData>({
    resolver: zodResolver(experiencesFormSchema),
    defaultValues: {
      experiences: experiences ?? [createEmptyExperience()],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const addNewExperience = () => append(createEmptyExperience());

  const removeExperience = (index: number) => {
    if (fields.length > 1) remove(index);
  };

  const onSubmit = (data: ExperiencesFormData) => {
    const experiences: Experience[] = data.experiences.map((experience): Experience => ({
      id: experience.id as string,
      jobTitle: experience.jobTitle as string,
      company: experience.company as string,
      startDate: experience.startDate as Date,
      endDate: experience.endDate as Date | null,
      isCurrentJob: experience.isCurrentJob as boolean,
      description: experience.description as string,
    }));
    updateFormData({ experiences });
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
    watch,
    onSubmit,
    errors,
  };
};

