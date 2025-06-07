import { Field, Select, Portal } from "@chakra-ui/react";

interface SelectFieldProps {
  label: string;
  placeholder: string;
  collection: any;
  error?: string;
  onValueChange: (value: string) => void;
  invalid?: boolean;
  value?: string;
}

const SelectField = ({
  label,
  placeholder,
  collection,
  error,
  onValueChange,
  invalid = false,
  value,
}: SelectFieldProps) => {
  return (
    <Field.Root invalid={invalid}>
      <Select.Root
        invalid={invalid}
        collection={collection}
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
              {collection.items.map((item: any) => (
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

export default SelectField;
