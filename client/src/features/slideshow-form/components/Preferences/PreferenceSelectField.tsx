import { SelectField } from "@slideshow-form/components";
import { createListCollection } from "@ark-ui/react";
import type { CollectionItem } from "@ark-ui/react";

interface PreferenceSelectFieldProps {
  
  placeholder: string;
  collection: CollectionItem[];
  error?: string;
  value?: string;
  onValueChange: (value: string) => void;
  description: string;
}

const PreferenceSelectField = ({
  
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
 
      <SelectField
        label={description}
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
