import { Box, Stack, Text, Select, Field, Portal, Input, Combobox } from "@chakra-ui/react";
import { useStepEducation } from "../hooks/useStepEducation";
import BaseButton from "@/components/ui/BaseButton";
import { motion } from "framer-motion";
import { degreesCollection } from "../schemas/educationSchema";

const MotionBox = motion.create(Box);

interface StepEducationProps {
  nextStep: () => void;
  prevStep: () => void;
}

const StepEducation = ({ nextStep, prevStep }: StepEducationProps) => {
  const { register, handleSubmit, onSubmit, errors, setValue } =
    useStepEducation(nextStep);

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
        maxW="800px"
        mx="auto"
      >
        <Stack gap={6}>
          <Text fontSize="2xl" fontWeight="bold" color="blue.600">
            Education Information
          </Text>
          {/* Degree */}
          <Field.Root invalid={!!errors.degree}>
            <Select.Root
              invalid={!!errors.degree}
              collection={degreesCollection}
              width="320px"             
              onValueChange={(details) => {
                setValue("degree", details.value[0] as "Bachelor" | "Master" | "PhD" | "Associate" | "Diploma" | "Other");
              }}
            >
              <Select.HiddenSelect />
              <Select.Label>Degree:</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select a degree" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {degreesCollection.items.map((degree) => (
                      <Select.Item item={degree.value} key={degree.value}>
                        {degree.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
            <Field.ErrorText>{errors.degree?.message}</Field.ErrorText>
          </Field.Root>

          {/* Field of Study */}
          <Combobox.Root
            collection={degreesCollection}
           invalid={!!errors.fieldOfStudy}>
            


            
            <Field.ErrorText>{errors.fieldOfStudy?.message}</Field.ErrorText>
          </Combobox.Root>

          {/* Institution */}
        </Stack>

        <Box display="flex" justifyContent="space-between" mt={8} gap={4}>
          <BaseButton
            onClick={prevStep}
            colorScheme="red"
            variant="outline"
            size="lg"
            minW="140px"
          >
            Back
          </BaseButton>
          <BaseButton
            onClick={handleSubmit(onSubmit)}
            size="lg"
            variant="subtle"
            colorScheme="green"
            minW="120px"
          >
            Next
          </BaseButton>
        </Box>
      </Box>
    </MotionBox>
  );
};

export default StepEducation;
