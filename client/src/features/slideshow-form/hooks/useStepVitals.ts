import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSlideshowFormStore } from "../store";
import { Gender } from "../types/vitals.type";
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
      name: formData.vitals?.name ?? "",
      age: formData.vitals?.age ?? 0,
      gender: formData.vitals?.gender ?? Gender.Male,
      email: formData.vitals?.email ?? "",
    },
  });

  const onSubmit = (data: VitalsFormData) => {
    updateFormData({ vitals: data });
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