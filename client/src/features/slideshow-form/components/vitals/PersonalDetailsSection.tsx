import { RadioGroup, VStack } from "@chakra-ui/react";
import type {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import type { VitalsFormData } from "../../schemas/vitalsSchema";
import type { Gender } from "../../types/vitals.types";
import StyledInput from "@/components/shared/StyledInput";
import FormField from "@/components/shared/FormField";
import InfoCard from "@/components/shared/InfoCard";

interface PersonalDetailsSectionProps {
  register: UseFormRegister<VitalsFormData>;
  errors: FieldErrors<VitalsFormData>;
  setValue: UseFormSetValue<VitalsFormData>;
  getValues: UseFormGetValues<VitalsFormData>;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalDetailsSection = ({
  register,
  errors,
  setValue,
  getValues,
  handleDateChange,
}: PersonalDetailsSectionProps) => (
  <InfoCard title="From Birth to Resume" icon="🍼" color="blue">
    <FormField label="Full Name" error={errors.name?.message}>
      <StyledInput
        {...register("name")}
        placeholder="Enter your full name"
        hoverColor="blue"
        focusColor="blue"
      />
    </FormField>

    <FormField label="Date of Birth" error={errors.dateOfBirth?.message}>
      <StyledInput
        defaultValue={getValues("dateOfBirth").toISOString().split("T")[0]}
        type="date"
        onChange={handleDateChange}
        hoverColor="blue"
        focusColor="blue"
      />
    </FormField>

    <FormField label="Gender" error={errors.gender?.message}>
      <RadioGroup.Root
        defaultValue={"Male"}
        onValueChange={(details) => setValue("gender", details.value as Gender)}
      >
        <VStack gap={2} py={2} align="flex-start">
          {["Male", "Female", "Other"].map((gender) => (
            <RadioGroup.Item key={gender} value={gender}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText fontSize="sm" fontWeight="medium">
                {gender}
              </RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </VStack>
      </RadioGroup.Root>
    </FormField>
  </InfoCard>
);

export default PersonalDetailsSection;
