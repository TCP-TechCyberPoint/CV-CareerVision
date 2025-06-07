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
} from "@slideshow-form/types";
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
      cvStyle: preferences?.cvStyle ?? CvStyle.Minimal,
      cvPurpose: preferences?.cvPurpose ?? CvPurpose.JobHunt,
      professionalPreference:
        preferences?.professionalPreference ??
        ProfessionalPreference.FullstackDeveloper,
      experienceLevel:
        preferences?.experienceLevel ?? ExperienceLevel.Entry,
      industryPreference:
        preferences?.industryPreference ?? Industry.Technology,
      targetSalaryRange:
        preferences?.targetSalaryRange ?? SalaryRange.NotSpecified,
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
