import { RadioGroup, HStack, Text } from "@chakra-ui/react";
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
      <Field.Label fontWeight="medium" fontSize="lg" color="white">
        CV Style
      </Field.Label>
      <Text fontSize="sm" color="white" mb={3}>
        Choose the visual style that best represents you
      </Text>
      <RadioGroup.Root
        defaultValue={defaultValue}
        onValueChange={(details) => {
          onValueChange(details.value as CvStyle);
        }}
      >
        <HStack gap={{ base: 2, sm: 4, md: 6 }} py={2} align="start" flexWrap="wrap">
          {cvStyleCollection.items.map((styleItem) => (
            <RadioGroup.Item key={styleItem.value} value={styleItem.value}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText textTransform="capitalize" fontSize="md" color="white">
                {styleItem.label}
              </RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </HStack>
      </RadioGroup.Root>
      <Field.ErrorText>{error}</Field.ErrorText>
    </Field.Root>
  );
};

export default CvStyleField;
