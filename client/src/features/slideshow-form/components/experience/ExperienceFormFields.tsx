import {
  Input,
  Checkbox,
  Textarea,
  HStack,
  VStack,
  Text,
  Field,
} from "@chakra-ui/react";

import type {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import type { Experience } from "@slideshow-form/types";
import type { ExperienceFormData } from "../../schemas/experienceSchema";

interface ExperienceFormFieldsProps {
  index: number;
  register: UseFormRegister<ExperienceFormData>;
  errors: FieldErrors<ExperienceFormData>;
  setValue: UseFormSetValue<ExperienceFormData>;
  watchedExperience: Experience[];
}

const ExperienceFormFields = ({
  index,
  register,
  errors,
  setValue,
  watchedExperience,
}: ExperienceFormFieldsProps) => {
  const currentExperience = watchedExperience[index];
  const isCurrentJob = currentExperience?.isCurrentJob;

  return (
    <VStack gap={4} align="stretch">
      {/* Job Title and Company */}
      <HStack gap={4}>
        <Field.Root invalid={!!errors.experience?.[index]?.jobTitle} flex={1}>
          <Field.Label fontWeight="medium" color="gray.700">
            Job Title
          </Field.Label>
          <Input
            {...register(`experience.${index}.jobTitle`)}
            placeholder="Software Engineer"
            size="lg"
            borderRadius="md"
            bg="white"
            _focus={{
              borderColor: "purple.400",
              boxShadow: "0 0 0 1px purple.400",
            }}
          />
          <Field.ErrorText>
            {errors.experience?.[index]?.jobTitle?.message}
          </Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.experience?.[index]?.company} flex={1}>
          <Field.Label fontWeight="medium" color="gray.700">
            Company
          </Field.Label>
          <Input
          
            {...register(`experience.${index}.company`)}
            
            placeholder="Google Inc."
            size="lg"
            borderRadius="md"
            bg="white"
            _focus={{
              borderColor: "purple.400",
              boxShadow: "0 0 0 1px purple.400",
            }}
          />
          <Field.ErrorText>
            {errors.experience?.[index]?.company?.message}
          </Field.ErrorText>
        </Field.Root>
      </HStack>

      {/* Date Pickers */}
      <HStack gap={4}>
        <Field.Root invalid={!!errors.experience?.[index]?.startDate} flex={1}>
          <Field.Label fontWeight="medium" color="gray.700">
            Start Date
          </Field.Label>
          <Input
            {...register(`experience.${index}.startDate`)}
            type="date"
            size="lg"
            borderRadius="md"
            bg="white"
            _focus={{
              borderColor: "purple.400",
              boxShadow: "0 0 0 1px purple.400",
            }}
          />
          <Field.ErrorText>
            {errors.experience?.[index]?.startDate?.message}
          </Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.experience?.[index]?.endDate} flex={1}>
          <Field.Label fontWeight="medium" color="gray.700">
            End Date
          </Field.Label>
          <Input
            {...register(`experience.${index}.endDate`)}
            type="date"
            size="lg"
            borderRadius="md"
            bg="white"
            disabled={Boolean(isCurrentJob)}
            _focus={{
              borderColor: "purple.400",
              boxShadow: "0 0 0 1px purple.400",
            }}
            _disabled={{
              opacity: 0.6,
              cursor: "not-allowed",
            }}
          />
          <Field.ErrorText>
            {errors.experience?.[index]?.endDate?.message}
          </Field.ErrorText>
        </Field.Root>
      </HStack>

      {/* Current Job Checkbox */}
      <Checkbox.Root
        checked={Boolean(isCurrentJob)}
        colorPalette="purple"
        size="lg"
        onCheckedChange={(e) => {
          const isChecked = Boolean(e.checked);
          setValue(`experience.${index}.isCurrentJob`, isChecked);
          if (isChecked) {
            setValue(`experience.${index}.endDate`, undefined);
            // Uncheck other current job checkboxes (only one current job allowed)
            watchedExperience.forEach((_, idx) => {
              if (idx !== index) {
                setValue(`experience.${idx}.isCurrentJob`, false);
              }
            });
          }
        }}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>
          <Text color="gray.700" fontWeight="medium">
            I currently work here
          </Text>
        </Checkbox.Label>
      </Checkbox.Root>

      {/* Description */}
      <Field.Root invalid={!!errors.experience?.[index]?.description}>
        <Field.Label fontWeight="medium" color="gray.700">
          Description (Optional)
        </Field.Label>
        <Textarea
          {...register(`experience.${index}.description`)}
          placeholder="Describe your role and achievements..."
          size="lg"
          borderRadius="md"
          bg="white"
          rows={3}
          _focus={{
            borderColor: "purple.400",
            boxShadow: "0 0 0 1px purple.400",
          }}
        />
        <Field.ErrorText>
          {errors.experience?.[index]?.description?.message}
        </Field.ErrorText>
      </Field.Root>
    </VStack>
  );
};

export default ExperienceFormFields;