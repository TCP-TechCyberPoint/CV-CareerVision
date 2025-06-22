import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type MilitaryServiceFormData,
  militaryServiceSchema,
} from "../schemas/militarySchema";
import { useSlideshowFormStore } from "../store/store";
import type { MilitaryService } from "../types/index";
import { useEffect } from "react";

export const useStepMilitary = (nextStep: () => void) => {
  const militaryService = useSlideshowFormStore(
    (state) => state.formData.military
  );
  const updateFormData = useSlideshowFormStore((state) => state.updateFormData);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MilitaryServiceFormData>({
    resolver: zodResolver(militaryServiceSchema),
    defaultValues: {
      militaryServiceStatus:
        militaryService?.militaryServiceStatus ?? "not_served",
      serviceDuration: militaryService?.serviceDuration ?? "",
      serviceDetails: militaryService?.serviceDetails ?? "",
      otherServiceType: militaryService?.otherServiceType ?? "",
      degreeGroup: militaryService?.degreeGroup ?? undefined,
      degree: militaryService?.degree ?? "",
    },
  });

  const currentValues = watch();

  // Dependency logic: Clear fields when status is exempted or not_served
  useEffect(() => {
    const status = currentValues.militaryServiceStatus;
    if (status === "exempted" || status === "not_served") {
      // Clear degree-related fields
      setValue("degreeGroup", undefined);
      setValue("degree", "");

      // Clear service-related fields
      setValue("serviceDuration", "");
      setValue("serviceDetails", "");

      // Clear other service type
      setValue("otherServiceType", "");
    }
  }, [currentValues.militaryServiceStatus, setValue]);

  const onSubmit = (data: MilitaryServiceFormData) => {
    // Ensure fields are cleared if status is exempted or not_served
    const finalData = {
      ...data,
      ...(data.militaryServiceStatus === "exempted" ||
      data.militaryServiceStatus === "not_served"
        ? {
            degreeGroup: undefined,
            degree: "",
            serviceDuration: "",
            serviceDetails: "",
            otherServiceType: "",
          }
        : {}),
    };

    updateFormData({ military: finalData as MilitaryService });

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
