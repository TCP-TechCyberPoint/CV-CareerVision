import { Box, Input, RadioGroup, VStack, Text, Grid, GridItem } from "@chakra-ui/react";
import { HStack, Field } from "@chakra-ui/react";
import { useStepVitals } from "../hooks/useStepVitals";
import { Gender } from "../types/vitals.types";
import StepNavigationButtons from "../components/StepNavigationButtons";
import ReturnDashboard from "../components/ReturnDashboard";
import { useState, useEffect } from "react";

const StepVitals = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const { handleSubmit, onSubmit, errors, register, setValue, calculateAge } =
    useStepVitals(nextStep);
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null);

  useEffect(() => {
    if (selectedDate) {
      const age = calculateAge(selectedDate);
      setCalculatedAge(age);
    }
  }, [selectedDate, calculateAge]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      const date = new Date(dateValue);
      setSelectedDate(date);
      setValue("dateOfBirth", date);
    }
  };

  return (
    <Box
      mt={20}
      p={8}
      maxW="1000px"
      mx="auto"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
      position="relative"
    >
      <Box position="absolute" top={4} left={4}>
        <ReturnDashboard />
      </Box>

      <VStack gap={8} align="stretch" mt={12}>
        <Text fontSize="2xl" fontWeight="bold" color="blue.600" textAlign="center">
          Personal Information
        </Text>

        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {/* Left Column */}
          <GridItem>
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

              {/* Date of Birth input field */}
              <Field.Root invalid={!!errors.dateOfBirth}>
                <Field.Label fontWeight="medium">Date of Birth</Field.Label>
                <Input
                  type="date"
                  placeholder="Select your date of birth"
                  size="lg"
                  borderRadius="md"
                  onChange={handleDateChange}
                  _focus={{
                    borderColor: "teal.400",
                    boxShadow: "0 0 0 1px teal.400",
                  }}
                />
                {calculatedAge !== null && (
                  <Text fontSize="sm" color="gray.600" mt={1}>
                    Age: {calculatedAge} years old
                  </Text>
                )}
                <Field.ErrorText>{errors.dateOfBirth?.message}</Field.ErrorText>
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

              {/* Country input field */}
              <Field.Root invalid={!!errors.country}>
                <Field.Label fontWeight="medium">Country</Field.Label>
                <Input
                  {...register("country")}
                  placeholder="e.g., United States"
                  size="lg"
                  borderRadius="md"
                  _focus={{
                    borderColor: "teal.400",
                    boxShadow: "0 0 0 1px teal.400",
                  }}
                />
                <Field.ErrorText>{errors.country?.message}</Field.ErrorText>
              </Field.Root>
            </VStack>
          </GridItem>

          {/* Right Column */}
          <GridItem>
            <VStack gap={6} align="stretch">
              {/* Gender input field */}
              <Field.Root invalid={!!errors.gender}>
                <Field.Label fontWeight="medium">Gender</Field.Label>
                <RadioGroup.Root
                  defaultValue={Gender.Male}
                  onValueChange={(details) => {
                    setValue("gender", details.value as Gender);
                  }}
                >
                  <VStack gap={3} py={2} align="flex-start">
                    {Object.values(Gender).map((gender) => (
                      <RadioGroup.Item key={gender} value={gender}>
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>{gender}</RadioGroup.ItemText>
                      </RadioGroup.Item>
                    ))}
                  </VStack>
                </RadioGroup.Root>
                <Field.ErrorText>{errors.gender?.message}</Field.ErrorText>
              </Field.Root>

              {/* City input field */}
              <Field.Root invalid={!!errors.city}>
                <Field.Label fontWeight="medium">City</Field.Label>
                <Input
                  {...register("city")}
                  placeholder="e.g., San Francisco"
                  size="lg"
                  borderRadius="md"
                  _focus={{
                    borderColor: "teal.400",
                    boxShadow: "0 0 0 1px teal.400",
                  }}
                />
                <Field.ErrorText>{errors.city?.message}</Field.ErrorText>
              </Field.Root>

              {/* Street input field */}
              <Field.Root invalid={!!errors.street}>
                <Field.Label fontWeight="medium">Street Address</Field.Label>
                <Input
                  {...register("street")}
                  placeholder="e.g., 123 Main Street, Apt 4B"
                  size="lg"
                  borderRadius="md"
                  _focus={{
                    borderColor: "teal.400",
                    boxShadow: "0 0 0 1px teal.400",
                  }}
                />
                <Field.ErrorText>{errors.street?.message}</Field.ErrorText>
              </Field.Root>
            </VStack>
          </GridItem>
        </Grid>

        <StepNavigationButtons
          onPrevStep={prevStep}
          onNextStep={handleSubmit(onSubmit)}
        />
      </VStack>
    </Box>
  );
};

export default StepVitals;
