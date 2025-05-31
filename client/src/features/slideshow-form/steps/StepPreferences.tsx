import { Box, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useStepPreferences } from "../hooks/useStepPreferences";
import { 
  PreferencesHeader,
  PreferencesFormFields,
  StepNavigationButtons 
} from "../components";

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      mt={20}
      p={8}
      maxW="800px"
      mx="auto"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <VStack gap={8} align="stretch">
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