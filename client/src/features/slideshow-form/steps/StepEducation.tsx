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
  type EducationFormData,
} from "../schemas/educationSchema";
import { SelectField, ComboboxField } from "../components";
import StepNavigationButtons from "../components/StepNavigationButtons";
import ReturnDashboard from "../components/ReturnDashboard";

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
     
      mt={{ base: 10, sm: 12, md: 14, lg: 16 }}
      mx="auto"
      maxW={{ base: "100%", md: "75%" }}
      p={{ base: 4, sm: 6, md: 8, lg: 10 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      position="relative"
    >
      <Box position="relative" top={{ base: 2, sm: 3, md: 4 }} left={{ base: 2, sm: 3, md: 4 }}>
        <ReturnDashboard />
      </Box>

      <Stack gap={{ base: 4, sm: 6, md: 8, lg: 10 }} mt={{ base: 8, sm: 10, md: 12, lg: 14 }}>
        <Text fontSize={{ base: "xl", sm: "2xl", md: "3xl" }} fontWeight="bold" color="blue.600" textAlign="center">
          Education Information
        </Text>

        <Box
         bg="whiteAlpha.300"
         borderRadius="2xl"
         border="1px solid"
         borderColor="gray.600"
         p={{ base: 4, sm: 6, md: 8, lg: 10 }}
          display="grid"
          gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={{ base: 4, sm: 6, md: 8, lg: 10 }}
          width="100%"
        >
          <SelectField
            label="Degree"
            placeholder="Select a degree"
            collection={degreesCollection.items}
            error={errors.degree?.message}
            invalid={!!errors.degree}
            value={currentValues.degree}
            onValueChange={(value) => setValue("degree", value as EducationFormData["degree"])}
          />

          <SelectField
            label="Field of Study"
            placeholder="Select a field of study"
            collection={fieldsOfStudyCollection.items}
            error={errors.fieldOfStudy?.message}
            invalid={!!errors.fieldOfStudy}
            value={currentValues.fieldOfStudy}
            onValueChange={(value) => setValue("fieldOfStudy", value as EducationFormData["fieldOfStudy"])}
          />

          <ComboboxField
            label="Institution"
            placeholder="Type to search"
            collection={institutesCollection.items}
            error={errors.institution?.message}
            invalid={!!errors.institution}
            value={currentValues.institution}
            onInputValueChange={filterInstitutes}
            onValueChange={(value) => setValue("institution", value)}
          />

          <ComboboxField
            label="Graduation Year"
            placeholder="Type to search"
            collection={yearsCollection.items}
            error={errors.graduationYear?.message}
            invalid={!!errors.graduationYear}
            value={currentValues.graduationYear}
            onInputValueChange={filterYears}
            onValueChange={(value) => setValue("graduationYear", value as EducationFormData["graduationYear"])}
          />
        </Box>
      </Stack>

      <Box mt={{ base: 4, sm: 6, md: 8, lg: 10 }}>
        <StepNavigationButtons
          onPrevStep={prevStep}
          onNextStep={handleSubmit(onSubmit)}
        />
      </Box>
    </MotionBox>
  );
};

export default StepEducation;
