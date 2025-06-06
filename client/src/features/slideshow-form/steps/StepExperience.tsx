import { Box, Stack, Text, VStack, Button } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { useStepExperience } from "../hooks/useStepExperience";
import {
  ExperienceHeader,
  StepNavigationButtons,
  ExperienceStepForm,
} from "@slideshow-form/components";
import { DevTool } from "@hookform/devtools";
import ReturnDashboard from "../components/ReturnDashboard";

const MotionBox = motion.create(Box);

interface StepExperienceProps {
  nextStep: () => void;
  prevStep: () => void;
}

const StepExperience = ({ nextStep, prevStep }: StepExperienceProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    errors,
    fields,
    watchedExperiences,
    addExperience,
    removeExperience,
    control,
  } = useStepExperience(nextStep);

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
        maxW="900px"
        mx="auto"
        position="relative"
      >
        <Box position="absolute" top={4} left={4}>
          <ReturnDashboard />
        </Box>

        <VStack gap={8} align="stretch" mt={12}>
          {/* Header */}
          <ExperienceHeader />

          {/* Experience Cards */}
          <Stack gap={4}>
            <AnimatePresence mode="popLayout">
              {fields.map((field, index) => (
                <ExperienceStepForm
                  key={field.id}
                  field={field}
                  index={index}
                  totalFields={fields.length}
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  watchedExperiences={watchedExperiences}
                  onRemove={removeExperience}
                />
              ))}
            </AnimatePresence>

            {/* Add Experience Button */}
            <Box textAlign="center" mt={4}>
              <Button
                onClick={addExperience}
                variant="outline"
                colorScheme="purple"
                size="lg"
                _hover={{ bg: "purple.50" }}
              >
                <FiPlus style={{ marginRight: "0.5rem" }} />
                Add Experience
              </Button>
            </Box>
          </Stack>

          {/* Form Error */}
          {errors.experiences && (
            <Text color="red.500" textAlign="center" fontSize="sm">
              {errors.experiences.message ||
                "Please check your experience entries"}
            </Text>
          )}

          {/* Navigation Buttons */}
          <StepNavigationButtons
            onPrevStep={prevStep}
            onNextStep={handleSubmit(onSubmit)}
          />
        </VStack>
      </Box>
      {import.meta.env.DEV && <DevTool control={control} />}
    </MotionBox>
  );
};

export default StepExperience;