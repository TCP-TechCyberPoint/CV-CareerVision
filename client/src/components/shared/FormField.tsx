import { Field, Text } from "@chakra-ui/react";

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  optional?: boolean;
}

const FormField = ({ 
  label, 
  error, 
  children, 
  optional = false 
}: FormFieldProps) => (
  <Field.Root invalid={!!error}>
    <Field.Label fontWeight="semibold" color="gray.700" fontSize="sm">
      {label}
      {optional && (
        <Text as="span" color="gray.500" fontWeight="normal" fontSize="xs">
          {" "}(Optional)
        </Text>
      )}
    </Field.Label>
    {children}
    <Field.ErrorText color="red.500" fontSize="xs">
      {error}
    </Field.ErrorText>
  </Field.Root>
);

export default FormField; 