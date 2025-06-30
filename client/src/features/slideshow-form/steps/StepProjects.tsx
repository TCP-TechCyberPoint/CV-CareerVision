import { Box, Stack, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useStepProjects } from "../hooks/useStepProjects";
import ProjectsHeader from "../components/Projects/ProjectsHeader";
import ProjectStepForm from "../components/Projects/ProjectStepForm";
import AddProjectButton from "../components/Projects/AddProjectButton";
import StepNavigationButtons from "../components/StepNavigationButtons";
import { DevTool } from "@hookform/devtools";
import ReturnDashboard from "../components/ReturnDashboard";
import type { Project } from "../types";

const MotionBox = motion.create(Box);

interface StepProjectsProps {
  nextStep: () => void;
  prevStep: () => void;
}

const StepProjects = ({ nextStep, prevStep }: StepProjectsProps) => {
  const {
    register,
    handleSubmit,
    fields,
    addNewProject,
    removeProject,
    setValue,
    onSubmit,
    errors,
    watchedProjects,
    control,
  } = useStepProjects(nextStep);

  return (
    <MotionBox
      mt={{ base: 4, sm :0}}
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

      <VStack gap={{ base: 6 }} align="stretch" mt={{ base: 8, sm: 10, md: 12, lg: 14 }}>
        {/* Header */}
        <ProjectsHeader />

        {/* Dynamic Project Fields */}
        <Stack gap={{ base: 4, sm: 6, md: 8, lg: 10 }}>
          {fields.map((field, index) => (
            <ProjectStepForm
              key={field.id}
              field={field}
              index={index}
              totalFields={fields.length}
              register={register}
              errors={errors}
              setValue={setValue}
              watchedProjects={watchedProjects as Project[]}
              onRemove={removeProject}
            />
          ))}
        </Stack>

        {/* Add New Project Button */}
        <AddProjectButton onAdd={addNewProject} />

        {/* Form Error */}
        {errors.projects && (
          <Text color="red.500" textAlign="center" fontSize="sm">
            {errors.projects.message}
          </Text>
        )}

        {/* Navigation Buttons */}
        <StepNavigationButtons
          onPrevStep={prevStep}
          onNextStep={handleSubmit(onSubmit)}
        />
      </VStack>
      {import.meta.env.DEV && <DevTool control={control} />}
    </MotionBox>
  );
};

export default StepProjects; 