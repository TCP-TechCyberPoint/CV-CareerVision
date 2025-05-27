import {
  Box,
  Stack,
  Text,
  useListCollection,
  useFilter,
} from "@chakra-ui/react";
import { useStepEducation } from "../hooks/useStepEducation";
import { motion } from "framer-motion";
import {
  degreesCollection,
  fieldsOfStudyCollection,
  initialInstitutesCollection,
  initialYearsCollection,
} from "../schemas/educationSchema";
import FormSelectField from "../components/FormSelectField";
import FormComboboxField from "../components/FormComboboxField";
import type { Degree, FieldOfStudy, Year } from "../types/education.type";
import StepNavigationButtons from "../components/StepNavigationButtons";

const MotionBox = motion.create(Box);

interface StepEducationProps {
  nextStep: () => void;
  prevStep: () => void;
}

const StepEducation = ({ nextStep, prevStep }: StepEducationProps) => {
  const { handleSubmit, onSubmit, errors, setValue, currentValues } =
    useStepEducation(nextStep);

  const { contains } = useFilter({ sensitivity: "base" });

  const { collection: institutesCollection, filter: filterInstitutes } =
    useListCollection({
      initialItems: initialInstitutesCollection,
      filter: contains,
    });

  const { collection: yearsCollection, filter: filterYears } =
    useListCollection({
      initialItems: initialYearsCollection,
      filter: contains,
    });

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        p={8}
        borderRadius="xl"
        boxShadow="xl"
        bg="white"
        maxW="800px"
        mx="auto"
      >
        <Stack gap={6}>
          <Text fontSize="2xl" fontWeight="bold" color="blue.600">
            Education Information
          </Text>

          <Box
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gap={6}
            width="100%"
          >
            <FormSelectField
              label="Degree"
              placeholder="Select a degree"
              collection={degreesCollection}
              error={errors.degree?.message}
              invalid={!!errors.degree}
              value={currentValues.degree}
              onValueChange={(value) => setValue("degree", value as Degree)}
            />

            <FormSelectField
              label="Field of Study"
              placeholder="Select a field of study"
              collection={fieldsOfStudyCollection}
              error={errors.fieldOfStudy?.message}
              invalid={!!errors.fieldOfStudy}
              value={currentValues.fieldOfStudy}
              onValueChange={(value) =>
                setValue("fieldOfStudy", value as FieldOfStudy)
              }
            />

            <FormComboboxField
              label="Institution"
              placeholder="Type to search"
              collection={institutesCollection}
              error={errors.institution?.message}
              invalid={!!errors.institution}
              value={currentValues.institution}
              onInputValueChange={filterInstitutes}
              onValueChange={(value) =>
                setValue("institution", value as string)
              }
            />

            <FormComboboxField
              label="Graduation Year"
              placeholder="Type to search"
              collection={yearsCollection}
              error={errors.graduationYear?.message}
              invalid={!!errors.graduationYear}
              value={currentValues.graduationYear}
              onInputValueChange={filterYears}
              onValueChange={(value) =>
                setValue("graduationYear", value as Year)
              }
            />
          </Box>
        </Stack>

        <StepNavigationButtons
          onPrevStep={prevStep}
          onNextStep={handleSubmit(onSubmit)}
        />
      </Box>
    </MotionBox>
  );
};

export default StepEducation;
