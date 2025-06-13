import { Box, Stack, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useStepExperience } from "../hooks/useStepExperience";
import {
  ExperienceHeader,
  StepNavigationButtons,
  ExperienceStepForm,
} from "@slideshow-form/components";
import AddExperienceButton from "../components/experience/AddExperienceButton";
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
    watchedExperience,
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
                onRemove={removeExperience}
                watchedExperience={watchedExperience}
              />
            ))}
          </Stack>

          {/* Add Experience Button */}
          <AddExperienceButton onAdd={addExperience} />

          {/* Form Error */}
          {errors.experience && (
            <Text color="red.500" textAlign="center" fontSize="sm">
              {JSON.stringify(errors.experience) ||
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
      { <DevTool control={control} />}
    </MotionBox>
  );
};

export default StepExperience;
