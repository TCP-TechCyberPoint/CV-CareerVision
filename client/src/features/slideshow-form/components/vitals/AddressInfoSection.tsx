import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { VitalsFormData } from "../../schemas/vitalsSchema";
import StyledInput from "@/components/shared/StyledInput";
import FormField from "@/components/shared/FormField";
import InfoCard from "@/components/shared/InfoCard";

interface AddressInfoSectionProps {
  register: UseFormRegister<VitalsFormData>;
  errors: FieldErrors<VitalsFormData>;
}

const AddressInfoSection = ({ register, errors }: AddressInfoSectionProps) => (
  <InfoCard title="Address Info" icon="📍" color="purple">
    <FormField label="Country" error={errors.country?.message}>
      <StyledInput
        {...register("country")}
        placeholder="United States"
        hoverColor="purple"
        focusColor="purple"
      />
    </FormField>

    <FormField label="City" error={errors.city?.message}>
      <StyledInput
        {...register("city")}
        placeholder="San Francisco"
        hoverColor="purple"
        focusColor="purple"
      />
    </FormField>

    <FormField label="Street Address" error={errors.street?.message}>
      <StyledInput
        {...register("street")}
        placeholder="123 Main Street, Apt 4B"
        hoverColor="purple"
        focusColor="purple"
      />
    </FormField>
  </InfoCard>
);

export default AddressInfoSection; 