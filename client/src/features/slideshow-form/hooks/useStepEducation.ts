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
      degree: formData.degree as "Bachelor" | "Master" | "PhD" | "Associate" | "Diploma" | "Other" | undefined,
    
      fieldOfStudy: formData.fieldOfStudy ?? "" ,
      institution: formData.institution ?? "",
      graduationYear: formData.graduationYear ?? "",
    },
  });

  const onSubmit = (data:any) => {
    console.log("Education data:", data);
    updateFormData(data);
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
