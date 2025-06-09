import { Field, Combobox, Portal } from "@chakra-ui/react";
import type { CollectionItem } from "@ark-ui/react";
import { createListCollection } from "@ark-ui/react";

interface ComboboxFieldProps {  
  label: string;
  placeholder: string;
  collection: CollectionItem[];
  error?: string;
  onInputValueChange: (inputValue: string) => void;
  onValueChange: (value: string) => void;
  invalid?: boolean;
  value?: string;
}

const ComboboxField = ({
  label,
  placeholder,
  collection,
  error,
  onInputValueChange,
  onValueChange,
  invalid = false,
  value,
}: ComboboxFieldProps) => {
  const listCollection = createListCollection({
    items: collection,
  });

  return (
    <Field.Root invalid={invalid}>
      <Combobox.Root
        width="100%"
        invalid={invalid}
        collection={listCollection}
        defaultValue={[value?.toString() || ""]}
        onInputValueChange={(e) => {
          onInputValueChange(e.inputValue);
        }}
        onValueChange={(selected) => {
          onValueChange(selected.value[0] || "");
        }}
      >
        <Combobox.Label>{label}</Combobox.Label>
        <Combobox.Control>
          <Combobox.Input placeholder={placeholder} />
          <Combobox.IndicatorGroup>
            <Combobox.ClearTrigger />
            <Combobox.Trigger />
          </Combobox.IndicatorGroup>
        </Combobox.Control>
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content maxHeight="200px">
              <Combobox.Empty>No items found</Combobox.Empty>
              {listCollection.items.map((item: CollectionItem) => (
                <Combobox.Item item={item} key={item.value}>
                  {item.label}
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>
      <Field.ErrorText>{error}</Field.ErrorText>
    </Field.Root>
  );
};

export default ComboboxField;
