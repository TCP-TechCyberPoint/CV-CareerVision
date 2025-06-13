import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { VitalsFormData } from "../../schemas/vitalsSchema";
import StyledInput from "@/components/shared/StyledInput";
import FormField from "@/components/shared/FormField";
import InfoCard from "@/components/shared/InfoCard";

interface ContactInfoSectionProps {
  register: UseFormRegister<VitalsFormData>;
  errors: FieldErrors<VitalsFormData>;
}

const ContactInfoSection = ({ register, errors }: ContactInfoSectionProps) => (
  <InfoCard title="Stalk Me (Professionally)" icon="🔗" color="green">
    <FormField label="Email Address" error={errors.email?.message}>
      <StyledInput
        {...register("email")}
        type="email"
        placeholder="you@example.com"
        hoverColor="green"
        focusColor="green"
      />
    </FormField>

    <FormField label="Phone Number" error={errors.phone?.message}>
      <StyledInput
        {...register("phone")}
        type="tel"
        placeholder="+1 (555) 123-4567"
        hoverColor="green"
        focusColor="green"
      />
    </FormField>

    <FormField label="LinkedIn" error={errors.linkedin?.message} optional>
      <StyledInput
        {...register("linkedin")}
        type="url"
        placeholder="linkedin.com/in/yourprofile"
        hoverColor="green"
        focusColor="green"
      />
    </FormField>

    <FormField label="GitHub" error={errors.github?.message} optional>
      <StyledInput
        {...register("github")}
        type="url"
        placeholder="github.com/yourusername"
        hoverColor="green"
        focusColor="green"
      />
    </FormField>
  </InfoCard>
);

export default ContactInfoSection; 