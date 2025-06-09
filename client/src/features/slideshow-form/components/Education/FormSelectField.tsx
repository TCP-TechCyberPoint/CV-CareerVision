import { Field, Select, Portal } from "@chakra-ui/react";

import type { CollectionItem } from "@ark-ui/react";
import { createListCollection } from "@ark-ui/react";

interface FormSelectFieldProps {
  label: string;
  placeholder: string;
  collection: CollectionItem[];
  error?: string;
  onValueChange: (value: string) => void;
  invalid?: boolean;
  value?: string;
}

const FormSelectField = ({
  label,
  placeholder,
  collection,
  error,
  onValueChange,
  invalid = false,
  value,
}: FormSelectFieldProps) => {
  const listCollection = createListCollection({
    items: collection,
  });

  return (
    <Field.Root invalid={invalid}>
      <Select.Root
        invalid={invalid}
        collection={listCollection}
        width="100%"
        value={value ? [value] : []}
        onValueChange={(details) => {
          onValueChange(details.value[0] as string);
        }}
      >
        <Select.HiddenSelect />
        <Select.Label>{label}</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder={placeholder} />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {listCollection.items.map((item: CollectionItem) => (
                <Select.Item item={item.value} key={item.value}>
                  {item.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      <Field.ErrorText>{error}</Field.ErrorText>
    </Field.Root>
  );
};

export default FormSelectField;
