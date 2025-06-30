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
  <Field.Root bg="whiteAlpha.300" borderRadius="2xl" border="1px solid" borderColor="gray.600" p={4} invalid={!!error} >
    <Field.Label userSelect="text"  fontWeight="bold" color="white" fontSize="sm">
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