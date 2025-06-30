import { Box, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useStepPreferences } from "../hooks/useStepPreferences";
import { 
  PreferencesHeader,
  PreferencesFormFields,
  StepNavigationButtons 
} from "../components";
import ReturnDashboard from "../components/ReturnDashboard";

const MotionBox = motion.create(Box);

const StepPreferences = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const { handleSubmit, onSubmit, errors, setValue, currentValues } = useStepPreferences(nextStep);

  return (
    <MotionBox
      mt={{ base: 4, sm: 0 }}
      mx="auto"
      maxW={{ base: "100%", md: "75%" }}
      p={{ base: 4, md: 8, lg: 10 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      position="relative"
    >
      <Box mt={{ base: 2, sm: 3, md: 4 }} position="relative" top={{ base: 2, sm: 3, md: 4 }} left={{ base: 2, sm: 3, md: 4 }}>
        <ReturnDashboard />
      </Box>

      <VStack gap={{ base: 6 }} align="stretch" mt={{ base: 8, sm: 10, md: 12, lg: 14 }}>
        <PreferencesHeader />
        
        <PreferencesFormFields
          errors={errors}
          currentValues={currentValues}
          setValue={setValue}
        />

        <StepNavigationButtons
          onPrevStep={prevStep}
          onNextStep={handleSubmit(onSubmit)}
        />
      </VStack>
    </MotionBox>
  );
};

export default StepPreferences; 