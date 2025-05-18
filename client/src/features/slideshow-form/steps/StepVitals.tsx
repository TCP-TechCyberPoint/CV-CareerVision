import { Box, Input, RadioGroup, VStack } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
// import { useSlideshowForm } from "../store/useSlideshowForm";
import BaseButton from "@/components/ui/BaseButton";
import { useSlideshowFormStore } from "../store";
import { Gender, type StepVitalsFields } from "../store/types";
import { useForm, Controller } from "react-hook-form";

const StepVitals = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const { formData, updateFormData } = useSlideshowFormStore();

  const { control, handleSubmit } = useForm<StepVitalsFields>({
    defaultValues: {
      name: formData.name ?? "",
      age: formData.age ?? 0,
      gender: formData.gender ?? Gender.Male,
      email: formData.email ?? "",
    },
  });

  const onSubmit = (data: StepVitalsFields) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <Box
      mt={20}
      p={8}
      maxW="600px"
      mx="auto"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <VStack gap={6} align="stretch">
        {/* Name input field */}

        <FormControl>
          <FormLabel fontWeight="medium">Name</FormLabel>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Your full name"
                size="lg"
                borderRadius="md"
                _focus={{
                  borderColor: "teal.400",
                  boxShadow: "0 0 0 1px teal.400",
                }}
              />
            )}
          />
        </FormControl>

        {/* Age input field */}
        <FormControl>
          <FormLabel fontWeight="medium">Age</FormLabel>
          <Controller
            control={control}
            name="age"
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                placeholder="Your age"
                size="lg"
                borderRadius="md"
                _focus={{
                  borderColor: "teal.400",
                  boxShadow: "0 0 0 1px teal.400",
                }}
              />
            )}
          />
        </FormControl>

        {/* Gender input field */}
        <FormControl>
          <FormLabel fontWeight="medium">Gender</FormLabel>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <RadioGroup.Root
                defaultValue={field.value}
                onValueChange={field.onChange}
              >
                <HStack gap={8} py={2}>
                  {["Male", "Female", "Other"].map((gender) => (
                    <RadioGroup.Item key={gender} value={gender}>
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>{gender}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  ))}
                </HStack>
              </RadioGroup.Root>
            )}
          />
        </FormControl>

        {/* Email input field */}
        <FormControl>
          <FormLabel fontWeight="medium">Email</FormLabel>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder="you@example.com"
                size="lg"
                borderRadius="md"
                _focus={{
                  borderColor: "teal.400",
                  boxShadow: "0 0 0 1px teal.400",
                }}
              />
            )}
          />
        </FormControl>

        <Box display="flex" justifyContent="space-between" pt={6}>
          <BaseButton
            onClick={prevStep}
            colorScheme="red"
            variant="subtle"
            size="lg"
            minW="120px"
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
      </VStack>
    </Box>
  );
};

export default StepVitals;
