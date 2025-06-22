import { VStack } from "@chakra-ui/react";
import { RadioGroup } from "@chakra-ui/react";
import FormField from "@/components/shared/FormField";
import type { MilitaryDegreeGroup } from "../../types/military.types";

interface MilitaryDegreeSectionProps {
  currentStatus?: string;
  currentDegreeGroup?: string;
  currentDegree?: string;
  onDegreeGroupChange: (value: string) => void;
  onDegreeChange: (value: string) => void;
  degreeGroupError?: string;
  degreeError?: string;
}

export const MilitaryDegreeSection = ({
  currentStatus,
  currentDegreeGroup,
  currentDegree,
  onDegreeGroupChange,
  onDegreeChange,
  degreeGroupError,
  degreeError,
}: MilitaryDegreeSectionProps) => {
  const getDegreeOptions = (group: MilitaryDegreeGroup) => {
    switch (group) {
      case 'enlisted':
        return [
          { value: 'private', label: 'טוראי', english: 'Private' },
          { value: 'corporal', label: 'רב-טוראי', english: 'Corporal' },
          { value: 'sergeant', label: 'סמל', english: 'Sergeant' },
          { value: 'staff_sergeant', label: 'סמל ראשון', english: 'Staff Sergeant' },
        ];
      case 'senior_ncos':
        return [
          { value: 'sergeant_first_class', label: 'רב-סמל (רס"ל)', english: 'Sergeant First Class' },
          { value: 'master_sergeant', label: 'רב-סמל ראשון (רס"ר)', english: 'Master Sergeant' },
          { value: 'sergeant_major', label: 'רב-סמל מתקדם (רס"מ)', english: 'Sergeant Major' },
          { value: 'senior_sergeant_major', label: 'רב-סמל בכיר (רס"ב)', english: 'Senior Sergeant Major' },
          { value: 'command_chief_warrant_officer', label: 'רב-נגד (רנ"ג)', english: 'Command Chief Warrant Officer' },
        ];
      case 'officers':
        return [
          { value: 'second_lieutenant', label: 'סגן משנה (סג"מ)', english: 'Second Lieutenant' },
          { value: 'lieutenant', label: 'סגן (סגן)', english: 'Lieutenant' },
          { value: 'captain', label: 'סרן (סרן)', english: 'Captain' },
          { value: 'major', label: 'רב-סרן (רס"ן)', english: 'Major' },
        ];
      default:
        return [];
    }
  };

  if (currentStatus !== 'full_military') {
    return null;
  }

  return (
    <>
      <FormField label="Military Degree Group" error={degreeGroupError}>
        <RadioGroup.Root
          value={currentDegreeGroup ?? ""}
          onValueChange={(details) => onDegreeGroupChange(details.value ?? "")}
        >
          <VStack align="start" gap={3}>
            <RadioGroup.Item value="enlisted">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>חיילים (Enlisted Soldiers)</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="senior_ncos">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>נגדים (Senior NCOs)</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="officers">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>קצינים (Officers)</RadioGroup.ItemText>
            </RadioGroup.Item>
          </VStack>
        </RadioGroup.Root>
      </FormField>

      {currentDegreeGroup && (
        <FormField label="Military Degree" error={degreeError}>
          <RadioGroup.Root
            value={currentDegree ?? ""}
            onValueChange={(details) => onDegreeChange(details.value ?? "")}
          >
            <VStack align="start" gap={3}>
              {getDegreeOptions(currentDegreeGroup as MilitaryDegreeGroup).map((option) => (
                <RadioGroup.Item key={option.value} value={option.value}>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>
                    {option.label} – {option.english}
                  </RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </VStack>
          </RadioGroup.Root>
        </FormField>
      )}
    </>
  );
}; 