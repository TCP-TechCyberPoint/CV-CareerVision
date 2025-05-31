import { Box, Input, RadioGroup, VStack } from "@chakra-ui/react";
import { HStack, Field } from "@chakra-ui/react";
import { useStepVitals } from "../hooks/useStepVitals";
import { Gender } from "../types/vitals.types";
import StepNavigationButtons from "../components/StepNavigationButtons";

const StepVitals = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const { handleSubmit, onSubmit, errors, register, setValue } =
    useStepVitals(nextStep);

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
        <Field.Root invalid={!!errors.name}>
          <Field.Label fontWeight="medium">Name</Field.Label>
          <Input
            {...register("name")}
            placeholder="Your full name"
            size="lg"
            borderRadius="md"
            _focus={{
              borderColor: "teal.400",
              boxShadow: "0 0 0 1px teal.400",
            }}
          />
          <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
        </Field.Root>

        {/* Age input field */}
        <Field.Root invalid={!!errors.age}>
          <Field.Label fontWeight="medium">Age</Field.Label>
          <Input
            {...register("age", { valueAsNumber: true })}
            type="number"
            placeholder="Your age"
            size="lg"
            borderRadius="md"
            _focus={{
              borderColor: "teal.400",
              boxShadow: "0 0 0 1px teal.400",
            }}
          />
          <Field.ErrorText>{errors.age?.message}</Field.ErrorText>
        </Field.Root>

        {/* Gender input field */}
        <Field.Root invalid={!!errors.gender}>
          <Field.Label fontWeight="medium">Gender</Field.Label>
          <RadioGroup.Root
            defaultValue={Gender.Male}
            onValueChange={(details) => {
              setValue("gender", details.value as Gender);
            }}
          >
            <HStack gap={8} py={2}>
              {Object.values(Gender).map((gender) => (
                <RadioGroup.Item key={gender} value={gender}>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>{gender}</RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </HStack>
          </RadioGroup.Root>
          <Field.ErrorText>{errors.gender?.message}</Field.ErrorText>
        </Field.Root>

        {/* Email input field */}
        <Field.Root invalid={!!errors.email}>
          <Field.Label fontWeight="medium">Email</Field.Label>
          <Input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            size="lg"
            borderRadius="md"
            _focus={{
              borderColor: "teal.400",
              boxShadow: "0 0 0 1px teal.400",
            }}
          />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <StepNavigationButtons
          onPrevStep={prevStep}
          onNextStep={handleSubmit(onSubmit)}
        />
      </VStack>
    </Box>
  );
};

export default StepVitals;
