import {
  Box,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useStepMilitary } from "../hooks/useStepMilitary";
import { motion } from "framer-motion";
import type { MilitaryServiceFormData } from "../schemas/militarySchema";
import type { MilitaryDegreeGroup, MilitaryDegree } from "../types/military.types";
import {
  MilitaryServiceStatusSection,
  MilitaryDegreeSection,
  OtherServiceTypeSection,
  ServiceDetailsSection,
  StepNavigationButtons,
  ReturnDashboard,
} from "@slideshow-form/components";

const MotionBox = motion.create(Box);

interface StepMilitaryProps {
  nextStep: () => void;
  prevStep: () => void;
}

const StepMilitary = ({ nextStep, prevStep }: StepMilitaryProps) => {
  const { handleSubmit, onSubmit, errors, setValue, currentValues, register } =
    useStepMilitary(nextStep);

  const handleMilitaryServiceStatusChange = (value: string) => {
    setValue("militaryServiceStatus", value as MilitaryServiceFormData["militaryServiceStatus"]);
    // Clear degree selections when status changes
    setValue("degreeGroup", undefined);
    setValue("degree", undefined);
  };

  const handleDegreeGroupChange = (value: string) => {
    setValue("degreeGroup", value as MilitaryDegreeGroup);
    setValue("degree", undefined); // Clear degree when group changes
  };

  const handleDegreeChange = (value: string) => {
    setValue("degree", value as MilitaryDegree);
  };

  return (
    <MotionBox
      mt={{ base: 4, sm: 0 }}
      mx="auto"
      maxW={{ base: "100%", md: "75%" }}
      p={{ base: 4, md: 8, lg: 10 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      position="relative"
    >
      <Box mt={{ base: 2, sm: 3, md: 4 }} position="relative" top={{ base: 2, sm: 3, md: 4 }} left={{ base: 2, sm: 3, md: 4 }}>
        <ReturnDashboard />
      </Box>

      <Stack gap={{ base: 6 }} mt={{ base: 8, sm: 10, md: 12, lg: 14 }}>
        <Text fontSize={{ base: "xl", sm: "2xl", md: "3xl" }} fontWeight="bold" color="blue.600" textAlign="center">
          Military Service Information
        </Text>

        <VStack gap={{ base: 4, sm: 6, md: 8, lg: 10 }} align="stretch">
          <MilitaryServiceStatusSection
            currentStatus={currentValues.militaryServiceStatus}
            onStatusChange={handleMilitaryServiceStatusChange}
            error={errors.militaryServiceStatus?.message}
          />

          <MilitaryDegreeSection
            currentStatus={currentValues.militaryServiceStatus}
            currentDegreeGroup={currentValues.degreeGroup}
            currentDegree={currentValues.degree}
            onDegreeGroupChange={handleDegreeGroupChange}
            onDegreeChange={handleDegreeChange}
            degreeGroupError={errors.degreeGroup?.message}
            degreeError={errors.degree?.message}
          />

          <OtherServiceTypeSection
            currentStatus={currentValues.militaryServiceStatus}
            register={register}
            error={errors.otherServiceType?.message}
          />

          <ServiceDetailsSection
            currentStatus={currentValues.militaryServiceStatus}
            register={register}
          />
        </VStack>
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

export default StepMilitary; 