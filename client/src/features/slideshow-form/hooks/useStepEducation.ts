import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type EducationFormData,
  educationSchema,
} from "../schemas/educationSchema";
import { useSlideshowFormStore } from "../store/store";
import type { Education, Degree, FieldOfStudy, Year } from "../types/index";

export const useStepEducation = (nextStep: () => void) => {
  const { formData, updateFormData } = useSlideshowFormStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: formData.education?.degree as Degree,
      fieldOfStudy: formData.education?.fieldOfStudy as FieldOfStudy,
      institution: formData.education?.institution as string,
      graduationYear: formData.education?.graduationYear as Year,
    },
  });

  const currentValues = watch();

  const onSubmit = (data: EducationFormData) => {
    updateFormData({ education: data as Education });
    nextStep();
  };

  return {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    errors,
    currentValues,
  };
};
