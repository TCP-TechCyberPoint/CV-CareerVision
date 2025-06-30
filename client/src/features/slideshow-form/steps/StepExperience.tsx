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

      <VStack gap={{ base: 6, sm: 8, md: 10, lg: 12 }} align="stretch" mt={{ base: 8, sm: 10, md: 12, lg: 14 }}>
        {/* Header */}
        <ExperienceHeader />

        {/* Experience Cards */}
        <Stack gap={{ base: 4, sm: 6, md: 8, lg: 10 }}>
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
      { <DevTool control={control} />}
    </MotionBox>
  );
};

export default StepExperience;
