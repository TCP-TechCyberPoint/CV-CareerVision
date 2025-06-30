import { Input, Textarea } from "@chakra-ui/react";
import FormField from "@/components/shared/FormField";
import type { UseFormRegister } from "react-hook-form";
import type { MilitaryServiceFormData } from "../../schemas/militarySchema";

interface ServiceDetailsSectionProps {
  currentStatus?: string;
  register: UseFormRegister<MilitaryServiceFormData>;
}

export const ServiceDetailsSection = ({
  currentStatus,
  register,
}: ServiceDetailsSectionProps) => {
  const shouldShowServiceFields = 
    currentStatus === 'full_military' ||
    currentStatus === 'partial_military' ||
    currentStatus === 'national_service' ||
    currentStatus === 'civil_service';

  if (!shouldShowServiceFields) {
    return null;
  }

  return (
    <>
      <FormField label="Service Duration">
        <Input
          _placeholder={{ color: "whiteAlpha.600" }}
          placeholder="e.g., 3 years, 2.5 years"
          {...register("serviceDuration")}
        />
      </FormField>

      <FormField label="Service Details">
        <Textarea
          placeholder="Describe your role, responsibilities, achievements..."
          _placeholder={{ color: "whiteAlpha.600" }}
          rows={4}
          {...register("serviceDetails")}
        />
      </FormField>
    </>
  );
}; 