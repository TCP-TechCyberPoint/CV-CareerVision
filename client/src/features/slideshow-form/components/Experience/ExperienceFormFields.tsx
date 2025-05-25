import {
  Input,
  Checkbox,
  Textarea,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import type { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import type { ExperienceFormData } from "../../schemas/experienceSchema";
import type { Experience } from "../../types/experience.type";

interface ExperienceFormFieldsProps {
  index: number;
  register: UseFormRegister<ExperienceFormData>;
  errors: FieldErrors<ExperienceFormData>;
  setValue: UseFormSetValue<ExperienceFormData>;
  watchedExperiences: Experience[];
}

const ExperienceFormFields = ({
  index,
  register,
  errors,
  setValue,
  watchedExperiences,
}: ExperienceFormFieldsProps) => {
  return (
    <VStack gap={4} align="stretch">
      {/* Job Title and Company */}
      <HStack gap={4}>
        <Field.Root
          invalid={!!errors.experiences?.[index]?.jobTitle}
          flex={1}
        >
          <Field.Label fontWeight="medium" color="gray.700">
            Job Title
          </Field.Label>
          <Input
            {...register(`experiences.${index}.jobTitle`)}
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
            {errors.experiences?.[index]?.jobTitle?.message}
          </Field.ErrorText>
        </Field.Root>

        <Field.Root
          invalid={!!errors.experiences?.[index]?.company}
          flex={1}
        >
          <Field.Label fontWeight="medium" color="gray.700">
            Company
          </Field.Label>
          <Input
            {...register(`experiences.${index}.company`)}
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
            {errors.experiences?.[index]?.company?.message}
          </Field.ErrorText>
        </Field.Root>
      </HStack>

      {/* Date Pickers */}
      <HStack gap={4}>
        <Field.Root
          invalid={!!errors.experiences?.[index]?.startDate}
          flex={1}
        >
          <Field.Label fontWeight="medium" color="gray.700">
            Start Date
          </Field.Label>
          <Input
            {...register(`experiences.${index}.startDate`)}
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
            {errors.experiences?.[index]?.startDate?.message}
          </Field.ErrorText>
        </Field.Root>

        <Field.Root
          invalid={!!errors.experiences?.[index]?.endDate}
          flex={1}
        >
          <Field.Label fontWeight="medium" color="gray.700">
            End Date
          </Field.Label>
          <Input
            {...register(`experiences.${index}.endDate`)}
            type="date"
            size="lg"
            borderRadius="md"
            bg="white"
            disabled={watchedExperiences?.[index]?.isCurrentJob}
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
            {errors.experiences?.[index]?.endDate?.message}
          </Field.ErrorText>
        </Field.Root>
      </HStack>

      {/* Current Job Checkbox */}
      <Checkbox.Root
        {...register(`experiences.${index}.isCurrentJob`)}
        colorPalette="purple"
        size="lg"
        onCheckedChange={(e) => {
          setValue(
            `experiences.${index}.isCurrentJob`,
            !!e.checked
          );
          if (e.checked) {
            setValue(`experiences.${index}.endDate`, "");
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
      <Field.Root invalid={!!errors.experiences?.[index]?.description}>
        <Field.Label fontWeight="medium" color="gray.700">
          Description (Optional)
        </Field.Label>
        <Textarea
          {...register(`experiences.${index}.description`)}
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
          {errors.experiences?.[index]?.description?.message}
        </Field.ErrorText>
      </Field.Root>
    </VStack>
  );
};

export default ExperienceFormFields; 