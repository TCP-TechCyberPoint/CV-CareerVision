import { VStack } from "@chakra-ui/react";
import { RadioGroup } from "@chakra-ui/react";
import FormField from "@/components/shared/FormField";

interface MilitaryServiceStatusSectionProps {
  currentStatus?: string;
  onStatusChange: (value: string) => void;
  error?: string;
}

export const MilitaryServiceStatusSection = ({
  currentStatus,
  onStatusChange,
  error,
}: MilitaryServiceStatusSectionProps) => {
  return (
    <FormField label="Military Service Status" error={error}>
      <RadioGroup.Root
        value={currentStatus ?? ""}
        onValueChange={(details) => onStatusChange(details.value ?? "")}
      >
        <VStack align="start" gap={3}>
          <RadioGroup.Item value="full_military">
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>Full Military Service</RadioGroup.ItemText>
          </RadioGroup.Item>
          <RadioGroup.Item value="partial_military">
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>Partial Military Service</RadioGroup.ItemText>
          </RadioGroup.Item>
          <RadioGroup.Item value="national_service">
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>National Service</RadioGroup.ItemText>
          </RadioGroup.Item>
          <RadioGroup.Item value="civil_service">
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>Civil Service</RadioGroup.ItemText>
          </RadioGroup.Item>
          <RadioGroup.Item value="exempted">
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>Exempted</RadioGroup.ItemText>
          </RadioGroup.Item>
          <RadioGroup.Item value="not_served">
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>Not Served</RadioGroup.ItemText>
          </RadioGroup.Item>
          <RadioGroup.Item value="other">
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>Other</RadioGroup.ItemText>
          </RadioGroup.Item>
        </VStack>
      </RadioGroup.Root>
    </FormField>
  );
}; 