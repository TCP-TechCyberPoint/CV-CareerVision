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
      mt={8}
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
        position="relative"
      >
        <Box position="absolute" top={4} left={4}>
          <ReturnDashboard />
        </Box>

        <Stack gap={6} mt={12}>
          <Text fontSize="2xl" fontWeight="bold" color="blue.600">
            Military Service Information
          </Text>

          <VStack gap={6} align="stretch">
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

        <StepNavigationButtons
          onPrevStep={prevStep}
          onNextStep={handleSubmit(onSubmit)}
        />
      </Box>
    </MotionBox>
  );
};

export default StepMilitary; 