import { Box } from "@chakra-ui/react";
import type { UseFormSetValue, FieldErrors } from "react-hook-form";
import {
  cvPurposeCollection,
  professionalPreferenceCollection,
  experienceLevelCollection,
  industryCollection,
  salaryRangeCollection,
  type PreferencesFormData,
} from "@slideshow-form/schemas/preferencesSchema";
import CvStyleField from "./CvStyleField";
import PreferenceSelectField from "./PreferenceSelectField";

interface PreferencesFormFieldsProps {
  errors: FieldErrors<PreferencesFormData>;
  currentValues: PreferencesFormData;
  setValue: UseFormSetValue<PreferencesFormData>;
}

const PreferencesFormFields = ({
  errors,
  currentValues,
  setValue,
}: PreferencesFormFieldsProps) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(2, 1fr)"
      gap={6}
      width="100%"
    >
      {/* CV Style field - Radio buttons */}
      <CvStyleField
        error={errors.cvStyle?.message}
        onValueChange={(value) => setValue("cvStyle", value)}
        defaultValue="minimal"
      />

      {/* CV Purpose field */}
      <PreferenceSelectField
        label="CV Purpose"
        placeholder="Select your CV purpose"
        collection={cvPurposeCollection.items}
        error={errors.cvPurpose?.message}
        value={currentValues.cvPurpose}
        onValueChange={(value) => setValue("cvPurpose", value as PreferencesFormData["cvPurpose"])}
        description="What's the main goal for your CV?"
      />

      {/* Professional Preference field */}
      <PreferenceSelectField
        label="Target Role"
        placeholder="Select your target role"
        collection={professionalPreferenceCollection.items}
        error={errors.professionalPreference?.message}
        value={currentValues.professionalPreference}
        onValueChange={(value) => setValue("professionalPreference", value as PreferencesFormData["professionalPreference"])}
        description="What position are you aiming for?"
      />

      {/* Experience Level field */}
      <PreferenceSelectField
        label="Experience Level"
        placeholder="Select your experience level"
        collection={experienceLevelCollection.items}
        error={errors.experienceLevel?.message}
        value={currentValues.experienceLevel}
        onValueChange={(value) => setValue("experienceLevel", value as PreferencesFormData["experienceLevel"])}
        description="How many years of experience do you have?"
      />

      {/* Industry Preference field */}
      <PreferenceSelectField
        label="Preferred Industry"
        placeholder="Select your preferred industry"
        collection={industryCollection.items}
        error={errors.industryPreference?.message}
        value={currentValues.industryPreference}
        onValueChange={(value) => setValue("industryPreference", value as PreferencesFormData["industryPreference"])}
        description="Which industry interests you most?"
      />

      {/* Target Salary Range field */}
      <PreferenceSelectField
        label="Target Salary Range"
        placeholder="Select your target salary range"
        collection={salaryRangeCollection.items}
        error={errors.targetSalaryRange?.message}
        value={currentValues.targetSalaryRange}
        onValueChange={(value) => setValue("targetSalaryRange", value as PreferencesFormData["targetSalaryRange"])}
        description="What's your expected salary range?"
      />
    </Box>
  );
};

export default PreferencesFormFields;
