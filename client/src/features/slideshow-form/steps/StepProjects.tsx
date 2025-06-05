import { Box, Stack, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useStepProjects } from "../hooks/useStepProjects";
import ProjectsHeader from "../components/projects/ProjectsHeader";
import ProjectStepForm from "../components/projects/ProjectStepForm";
import AddProjectButton from "../components/projects/AddProjectButton";
import StepNavigationButtons from "../components/StepNavigationButtons";
import { DevTool } from "@hookform/devtools";
import ReturnDashboard from "../components/ReturnDashboard";

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
          <ProjectsHeader />

          {/* Dynamic Project Fields */}
          <Stack gap={6}>
            {fields.map((field, index) => (
              <ProjectStepForm
                key={field.id}
                field={field}
                index={index}
                totalFields={fields.length}
                register={register}
                errors={errors}
                setValue={setValue}
                watchedProjects={watchedProjects}
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
      </Box>
      {import.meta.env.DEV && <DevTool control={control} />}
    </MotionBox>
  );
};

export default StepProjects; 