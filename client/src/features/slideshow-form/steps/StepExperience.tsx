import { Box, Stack, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useStepExperience } from "../hooks/useStepExperience";
import ExperiencesHeader from "../components/experiences/ExperiencesHeader";
import ExperienceStepForm from "../components/experiences/ExperienceStepForm";
import AddExperienceButton from "../components/experiences/AddExperienceButton";
import StepNavigationButtons from "../components/StepNavigationButtons";
import { DevTool } from "@hookform/devtools";
import ReturnDashboard from "../components/ReturnDashboard";
import type { Experience } from "../types";

const MotionBox = motion.create(Box);

interface StepExperienceProps {
  nextStep: () => void;
  prevStep: () => void;
}

const StepExperience = ({ nextStep, prevStep }: StepExperienceProps) => {
  const {
    register,
    handleSubmit,
    fields,
    addNewExperience,
    removeExperience,
    setValue,
    watch,
    onSubmit,
    errors,
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
          <ExperiencesHeader />

          {/* Dynamic Experience Fields */}
          <Stack gap={6}>
            {fields.map((field, index) => (
              <ExperienceStepForm
                key={field.id}
                field={field}
                index={index}
                totalFields={fields.length}
                register={register}
                errors={errors}
                setValue={setValue}
                watch={watch}
                onRemove={removeExperience}
              />
            ))}
          </Stack>

          {/* Add New Experience Button */}
          <AddExperienceButton onAdd={addNewExperience} />

          {/* Form Error */}
          {errors.experiences && (
            <Text color="red.500" textAlign="center" fontSize="sm">
              {errors.experiences.message}
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
