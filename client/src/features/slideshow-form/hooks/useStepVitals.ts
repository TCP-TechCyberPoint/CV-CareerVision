import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSlideshowFormStore } from "../store";
import { Gender, type Vitals } from "../types/index";
import { vitalsSchema, type VitalsFormData } from "../schemas/vitalsSchema";

export const useStepVitals = (nextStep: () => void) => {
  const { formData, updateFormData } = useSlideshowFormStore();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<VitalsFormData>({
    resolver: zodResolver(vitalsSchema),
    defaultValues: {
      name: formData.vitals?.name ?? "",
      dateOfBirth: formData.vitals?.dateOfBirth ?? new Date(2000, 0, 1),
      gender: formData.vitals?.gender ?? Gender.Male,
      email: formData.vitals?.email ?? "",
      country: formData.vitals?.country ?? "",
      city: formData.vitals?.city ?? "",
      street: formData.vitals?.street ?? "",
      phone: formData.vitals?.phone ?? "",
      linkedin: formData.vitals?.linkedin ?? "",
    },
  });

  const onSubmit = (data: VitalsFormData) => {
    updateFormData({ vitals: data as Vitals });
    nextStep();
  };

  // Helper function to calculate age from date of birth
  const calculateAge = (dateOfBirth: Date): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    errors,
    calculateAge,
    getValues,
  };
};
