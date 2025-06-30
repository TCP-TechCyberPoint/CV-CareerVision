import { Input } from "@chakra-ui/react";
import FormField from "@/components/shared/FormField";
import type { UseFormRegister } from "react-hook-form";
import type { MilitaryServiceFormData } from "../../schemas/militarySchema";

interface OtherServiceTypeSectionProps {
  currentStatus?: string;
  register: UseFormRegister<MilitaryServiceFormData>;
  error?: string;
}

export const OtherServiceTypeSection = ({
  currentStatus,
  register,
  error,
}: OtherServiceTypeSectionProps) => {
  if (currentStatus !== 'other') {
    return null;
  }

  return (
    <FormField label="Specify Service Type" error={error}>
      <Input 
        _placeholder={{ color: "whiteAlpha.600" }}
        placeholder="Please specify your service type"
        {...register("otherServiceType")}
      />
    </FormField>
  );
}; 