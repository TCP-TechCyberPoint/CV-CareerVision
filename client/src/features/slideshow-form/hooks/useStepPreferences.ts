import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSlideshowFormStore } from "../store";
import {
  CvStyle,
  CvPurpose,
  ProfessionalPreference,
  ExperienceLevel,
  Industry,
  SalaryRange,
} from "../types";
import {
  preferencesSchema,
  type PreferencesFormData,
} from "../schemas/preferencesSchema";

export const useStepPreferences = (nextStep: () => void) => {
  const { formData, updateFormData } = useSlideshowFormStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      cvStyle: formData.preferences?.cvStyle ?? CvStyle.Minimal,
      cvPurpose: formData.preferences?.cvPurpose ?? CvPurpose.JobHunt,
      professionalPreference:
        formData.preferences?.professionalPreference ??
        ProfessionalPreference.FullstackDeveloper,
      experienceLevel:
        formData.preferences?.experienceLevel ?? ExperienceLevel.Entry,
      industryPreference:
        formData.preferences?.industryPreference ?? Industry.Technology,
      targetSalaryRange:
        formData.preferences?.targetSalaryRange ?? SalaryRange.NotSpecified,
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
