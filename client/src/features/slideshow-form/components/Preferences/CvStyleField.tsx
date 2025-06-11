import { RadioGroup, VStack, Text } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { type CvStyle, cvStyleCollection } from "@slideshow-form/schemas/preferencesSchema";

interface CvStyleFieldProps {
  error?: string;
  onValueChange: (value: CvStyle) => void;
  defaultValue?: CvStyle;
}

const CvStyleField = ({
  error,
  onValueChange,
  defaultValue = "minimal",
}: CvStyleFieldProps) => {
  return (
    <Field.Root invalid={!!error}>
      <Field.Label fontWeight="medium" fontSize="lg">
        CV Style
      </Field.Label>
      <Text fontSize="sm" color="gray.600" mb={3}>
        Choose the visual style that best represents you
      </Text>
      <RadioGroup.Root
        defaultValue={defaultValue}
        onValueChange={(details) => {
          onValueChange(details.value as CvStyle);
        }}
      >
        <VStack gap={3} py={2} align="start">
          {cvStyleCollection.items.map((styleItem) => (
            <RadioGroup.Item key={styleItem.value} value={styleItem.value}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText textTransform="capitalize" fontSize="md">
                {styleItem.label}
              </RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </VStack>
      </RadioGroup.Root>
      <Field.ErrorText>{error}</Field.ErrorText>
    </Field.Root>
  );
};

export default CvStyleField;
