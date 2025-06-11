import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSlideshowFormStore } from "../store";
import {
  preferencesSchema,
  type PreferencesFormData,
} from "../schemas/preferencesSchema"; 

export const useStepPreferences = (nextStep: () => void) => {
  const preferences = useSlideshowFormStore((state) => state.formData.preferences);
  const updateFormData = useSlideshowFormStore((state) => state.updateFormData);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      cvStyle: preferences?.cvStyle ?? "minimal",
      cvPurpose: preferences?.cvPurpose ?? "job hunt",
      professionalPreference:
        preferences?.professionalPreference ?? "fullstack developer",
      experienceLevel:
        preferences?.experienceLevel ?? "entry level (0-2 years)",
      industryPreference:
        preferences?.industryPreference ?? "technology",
      targetSalaryRange:
        preferences?.targetSalaryRange ?? "prefer not to specify",
    },
  });

  const currentValues = watch();

  const onSubmit = (data: PreferencesFormData) => {
    updateFormData({ preferences: data });
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
