import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSlideshowFormStore } from "../store";
import {
  experienceFormSchema,
  type ExperienceFormData,
} from "../schemas/experienceSchema";

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
      experiences: formData.experiences ?? [
        {
          id: crypto.randomUUID(),
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          isCurrentJob: false,
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const addNewExperience = () => {
    append({
      id: crypto.randomUUID(),
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      isCurrentJob: false,
      description: "",
    });
  };

  const removeExperience = (index: number) => {
    console.log("clicked");
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onSubmit = (data: ExperienceFormData) => {
    updateFormData(data as any);
    nextStep();
  };

  const watchedExperiences = watch("experiences");

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
    watchedExperiences,
  };
};
