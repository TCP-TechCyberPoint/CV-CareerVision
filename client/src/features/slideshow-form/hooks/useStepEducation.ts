import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type EducationFormData,
  educationSchema,
} from "../schemas/educationSchema";
import { useSlideshowFormStore } from "../store/store";
import type { Education, Degree, FieldOfStudy, Year } from "../types/index";

export const useStepEducation = (nextStep: () => void) => {
  const education = useSlideshowFormStore((state) => state.formData.education);
  const updateFormData = useSlideshowFormStore((state) => state.updateFormData);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema), 
    defaultValues: {
      degree: education?.degree as Degree,
      fieldOfStudy: education?.fieldOfStudy as FieldOfStudy,
      institution: education?.institution as string,
      graduationYear: education?.graduationYear as Year,
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
