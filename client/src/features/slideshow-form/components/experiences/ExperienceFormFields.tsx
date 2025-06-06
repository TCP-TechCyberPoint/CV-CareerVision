import {
  Input,
  Textarea,
  HStack,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import { Field, Checkbox } from "@chakra-ui/react";
import type {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type { Experience } from "@slideshow-form/types";

interface ExperienceFormFieldsProps {
  index: number;
  register: UseFormRegister<{ experiences: Experience[] }>;
  errors: FieldErrors<{ experiences: Experience[] }>;
  setValue: UseFormSetValue<{ experiences: Experience[] }>;
  watch: UseFormWatch<{ experiences: Experience[] }>;
}

const ExperienceFormFields = ({
  index,
  register,
  errors,
  setValue,
  watch,
}: ExperienceFormFieldsProps) => {
  const isCurrentJob = watch(`experiences.${index}.isCurrentJob`);

  const handleCurrentJobChange = (checked: boolean) => {
    setValue(`experiences.${index}.isCurrentJob`, checked);
    if (checked) {
      setValue(`experiences.${index}.endDate`, null);
    }
  };

  return (
    <VStack gap={4} align="stretch">
      {/* Job Title and Company */}
      <HStack gap={4}>
        <Field.Root invalid={!!errors.experiences?.[index]?.jobTitle} flex={1}>
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
              borderColor: "green.400",
              boxShadow: "0 0 0 1px green.400",
            }}
          />
          <Field.ErrorText>
            {errors.experiences?.[index]?.jobTitle?.message}
          </Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.experiences?.[index]?.company} flex={1}>
          <Field.Label fontWeight="medium" color="gray.700">
            Company
          </Field.Label>
          <Input
            {...register(`experiences.${index}.company`)}
            placeholder="Acme Corporation"
            size="lg"
            borderRadius="md"
            bg="white"
            _focus={{
              borderColor: "green.400",
              boxShadow: "0 0 0 1px green.400",
            }}
          />
          <Field.ErrorText>
            {errors.experiences?.[index]?.company?.message}
          </Field.ErrorText>
        </Field.Root>
      </HStack>

      {/* Start Date and End Date */}
      <HStack gap={4}>
        <Field.Root invalid={!!errors.experiences?.[index]?.startDate} flex={1}>
          <Field.Label fontWeight="medium" color="gray.700">
            Start Date
          </Field.Label>
          <Input
            {...register(`experiences.${index}.startDate`, {
              valueAsDate: true,
            })}
            type="date"
            size="lg"
            borderRadius="md"
            bg="white"
            _focus={{
              borderColor: "green.400",
              boxShadow: "0 0 0 1px green.400",
            }}
          />
          <Field.ErrorText>
            {errors.experiences?.[index]?.startDate?.message}
          </Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.experiences?.[index]?.endDate} flex={1}>
          <Field.Label fontWeight="medium" color="gray.700">
            End Date
          </Field.Label>
          <Input
            {...register(`experiences.${index}.endDate`, {
              valueAsDate: true,
            })}
            type="date"
            size="lg"
            borderRadius="md"
            bg="white"
            disabled={isCurrentJob}
            _focus={{
              borderColor: "green.400",
              boxShadow: "0 0 0 1px green.400",
            }}
            _disabled={{
              bg: "gray.100",
              cursor: "not-allowed",
            }}
          />
          <Field.ErrorText>
            {errors.experiences?.[index]?.endDate?.message}
          </Field.ErrorText>
        </Field.Root>
      </HStack>

      {/* Current Job Checkbox */}
      <Box>
        <Checkbox.Root
          {...register(`experiences.${index}.isCurrentJob`)}
          checked={isCurrentJob}
          onCheckedChange={(details) => handleCurrentJobChange(!!details.checked)}
          colorPalette="green"
        >
          <Checkbox.Indicator />
          <Checkbox.Label fontWeight="medium" color="gray.700">
            This is my current position
          </Checkbox.Label>
        </Checkbox.Root>
      </Box>

      {/* Description */}
      <Field.Root invalid={!!errors.experiences?.[index]?.description}>
        <Field.Label fontWeight="medium" color="gray.700">
          Description
          <Text as="span" color="gray.500" fontSize="sm" ml={1}>
            (Optional)
          </Text>
        </Field.Label>
        <Textarea
          {...register(`experiences.${index}.description`)}
          placeholder="Describe your role, responsibilities, and key achievements..."
          size="lg"
          borderRadius="md"
          bg="white"
          rows={4}
          _focus={{
            borderColor: "green.400",
            boxShadow: "0 0 0 1px green.400",
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