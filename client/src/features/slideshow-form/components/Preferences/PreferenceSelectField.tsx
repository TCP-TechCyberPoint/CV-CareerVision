import { Text } from "@chakra-ui/react";
import { SelectField } from "@slideshow-form/components";

import type { CollectionItem } from "@ark-ui/react";
import { createListCollection } from "@ark-ui/react";

interface PreferenceSelectFieldProps {
  label: string;
  placeholder: string;
  collection: CollectionItem[];
  error?: string;
  value?: string;
  onValueChange: (value: string) => void;
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
  const listCollection = createListCollection({
    items: collection,
  });

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
        collection={listCollection.items}
        error={error}
        invalid={!!error}
        value={value}
        onValueChange={onValueChange}
      />
    </div>
  );
};

export default PreferenceSelectField;
