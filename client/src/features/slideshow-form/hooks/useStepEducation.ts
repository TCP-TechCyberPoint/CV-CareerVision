import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type EducationFormData,
  educationSchema,
} from "../schemas/educationSchema";
import { useSlideshowFormStore } from "../store";
import type { Degree, FieldOfStudy, Year } from "../types/education.type";

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
      degree: formData.degree as Degree,
      fieldOfStudy: formData.fieldOfStudy as FieldOfStudy,
      institution: formData.institution as string,
      graduationYear: formData.graduationYear as Year,
    },
  });

  const currentValues = watch();

  const onSubmit = (data: EducationFormData) => {
    updateFormData(data as any);
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
