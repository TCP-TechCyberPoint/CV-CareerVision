import { Text } from "@chakra-ui/react";
import { SelectField } from "@slideshow-form/components";

interface PreferenceSelectFieldProps {
  label: string;
  placeholder: string;
  collection: any;
  error?: string;
  value?: string;
  onValueChange: (value: any) => void;
  description?: string;
}

const PreferenceSelectField = ({
  label,
  placeholder,
  collection,
  error,
  value,
  onValueChange,
  description,
}: PreferenceSelectFieldProps) => {
  return (
    <div>
      {description && (
        <Text fontSize="sm" color="gray.500" mb={2} fontWeight="medium" as="p">
          {description}
        </Text>
      )}
      <SelectField
        label={label}
        placeholder={placeholder}
        collection={collection}
        error={error}
        invalid={!!error}
        value={value}
        onValueChange={onValueChange}
      />
    </div>
  );
};

export default PreferenceSelectField;
