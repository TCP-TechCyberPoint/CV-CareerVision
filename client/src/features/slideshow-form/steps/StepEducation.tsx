import {
  Box,
  Stack,
  Text,
  Select,
  Field,
  Portal,
  Combobox,
  useListCollection,
  useFilter,
} from "@chakra-ui/react";
import { useStepEducation } from "../hooks/useStepEducation";
import BaseButton from "@/components/ui/BaseButton";
import { motion } from "framer-motion";
import {
  degreesCollection,
  fieldsOfStudyCollection,
  initialInstitutesCollection,
  initialYearsCollection,
} from "../schemas/educationSchema";

const MotionBox = motion.create(Box);

interface StepEducationProps {
  nextStep: () => void;
  prevStep: () => void;
}

const StepEducation = ({ nextStep, prevStep }: StepEducationProps) => {
  const { handleSubmit, onSubmit, errors, setValue } =
    useStepEducation(nextStep);

  const { contains } = useFilter({ sensitivity: "base" });

  const { collection: institutesCollection, filter: filterInstitutes } = useListCollection({
    initialItems: initialInstitutesCollection,
    filter: contains,
  });

  const { collection: yearsCollection, filter: filterYears } = useListCollection({
    initialItems: initialYearsCollection,
    filter: contains,
  });

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

          <Box
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gap={6}
            width="100%"
          >
            {/* Degree */}
            <Field.Root invalid={!!errors.degree}>
              <Select.Root
                invalid={!!errors.degree}
                collection={degreesCollection}
                width="100%"
                onValueChange={(details) => {
                  setValue("degree", details.value[0] as any);
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
                      {degreesCollection.items.map((degree: any) => (
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
            <Field.Root invalid={!!errors.fieldOfStudy}>
              <Select.Root
                invalid={!!errors.fieldOfStudy}
                collection={fieldsOfStudyCollection}
                width="100%"
                onValueChange={(details) => {
                  setValue("fieldOfStudy", details.value[0] as any);
                }}
              >
                <Select.HiddenSelect />
                <Select.Label>Field of Study:</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select a field of study" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {fieldsOfStudyCollection.items.map((field: any) => (
                        <Select.Item item={field.value} key={field.value}>
                          {field.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
              <Field.ErrorText>{errors.fieldOfStudy?.message}</Field.ErrorText>
            </Field.Root>

            {/* Institution */}
            <Field.Root invalid={!!errors.institution}>
              <Combobox.Root
                width="100%"
                invalid={!!errors.institution}
                collection={institutesCollection}
                onInputValueChange={(e) => {
                  filterInstitutes(e.inputValue);
                }}
                onValueChange={(selected) => {
                  setValue("institution", selected.value[0] || "");
                }}
              >
                <Combobox.Label>Institution</Combobox.Label>
                <Combobox.Control>
                  <Combobox.Input placeholder="Type to search" />
                  <Combobox.IndicatorGroup>
                    <Combobox.ClearTrigger />
                    <Combobox.Trigger />
                  </Combobox.IndicatorGroup>
                </Combobox.Control>
                <Portal>
                  <Combobox.Positioner>
                    <Combobox.Content maxHeight="200px">
                      <Combobox.Empty>No items found</Combobox.Empty>
                      {institutesCollection.items.map((item: any) => (
                        <Combobox.Item item={item} key={item.value}>
                          {item.label}
                          <Combobox.ItemIndicator />
                        </Combobox.Item>
                      ))}
                    </Combobox.Content>
                  </Combobox.Positioner>
                </Portal>
              </Combobox.Root>
              <Field.ErrorText>{errors.institution?.message}</Field.ErrorText>
            </Field.Root>

            {/* Graduation Year */}
            <Field.Root invalid={!!errors.graduationYear}>
              <Combobox.Root
                width="100%"
                invalid={!!errors.graduationYear}
                collection={yearsCollection}
                onInputValueChange={(e) => {
                  filterYears(e.inputValue);
                }}
                onValueChange={(selected) => {
                  setValue("graduationYear", selected.value[0] || "");
                }}
              >
                <Combobox.Label>Graduation Year</Combobox.Label>
                <Combobox.Control>
                  <Combobox.Input placeholder="Type to search" />
                  <Combobox.IndicatorGroup>
                    <Combobox.ClearTrigger />
                    <Combobox.Trigger />
                  </Combobox.IndicatorGroup>
                </Combobox.Control>
                <Portal>
                  <Combobox.Positioner>
                    <Combobox.Content maxHeight="200px">
                      <Combobox.Empty>No items found</Combobox.Empty>
                      {yearsCollection.items.map((item: any) => (
                        <Combobox.Item item={item} key={item.value}>
                          {item.label}
                          <Combobox.ItemIndicator />
                        </Combobox.Item>
                      ))}
                    </Combobox.Content>
                  </Combobox.Positioner>
                </Portal>
              </Combobox.Root>
              <Field.ErrorText>{errors.graduationYear?.message}</Field.ErrorText>
            </Field.Root>
          </Box>
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
