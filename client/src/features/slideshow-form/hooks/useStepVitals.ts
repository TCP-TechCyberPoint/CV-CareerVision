import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSlideshowFormStore } from "../store";
import { Gender } from "../store/types";
import { vitalsSchema, type VitalsFormData } from "../schemas/vitalsSchema";

export const useStepVitals = (nextStep: () => void) => {
  const { formData, updateFormData } = useSlideshowFormStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VitalsFormData>({
    resolver: zodResolver(vitalsSchema),
    defaultValues: {
      name: formData.name ?? "",
      age: formData.age ?? 0,
      gender: formData.gender ?? Gender.Male,
      email: formData.email ?? "",
    },
  });

  const onSubmit = (data: VitalsFormData) => {
    console.log(data);
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