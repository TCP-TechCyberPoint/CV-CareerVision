import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSlideshowFormStore } from "../store";
import { type Vitals } from "../types/vitals.types";
import { vitalsSchema, type VitalsFormData } from "../schemas/vitalsSchema";

export const useStepVitals = (nextStep: () => void) => {
  const vitals = useSlideshowFormStore((state) => state.formData.vitals);
  const updateFormData = useSlideshowFormStore((state) => state.updateFormData);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<VitalsFormData>({
    resolver: zodResolver(vitalsSchema),
    defaultValues: {
      name: vitals?.name ?? "",
      dateOfBirth: vitals?.dateOfBirth ?? new Date(2000, 0, 1),
      gender: vitals?.gender ?? "Male",
      email: vitals?.email ?? "",
      country: vitals?.country ?? "",
      city: vitals?.city ?? "",
      street: vitals?.street ?? "",
      phone: vitals?.phone ?? "",
      linkedin: vitals?.linkedin ?? "",
      github: vitals?.github ?? "",
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
