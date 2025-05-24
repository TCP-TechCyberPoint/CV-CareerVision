import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type EducationFormData,
  educationSchema,
} from "../schemas/educationSchema";
import { useSlideshowFormStore } from "../store";

export const useStepEducation = (nextStep: () => void) => {
  const { formData, updateFormData } = useSlideshowFormStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: formData.degree as any,
      fieldOfStudy: formData.fieldOfStudy as any,
      institution: formData.institution || "",
      graduationYear: formData.graduationYear || "",
    },
  });

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
  };
};
