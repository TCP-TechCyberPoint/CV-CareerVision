import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useStepVitals } from "../hooks/useStepVitals";
import StepNavigationButtons from "../components/StepNavigationButtons";
import ReturnDashboard from "../components/ReturnDashboard";
import {
  PersonalDetailsSection,
  ContactInfoSection,
  AddressInfoSection,
} from "../components/vitals";

// Main Component
const StepVitals = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const {
    handleSubmit,
    onSubmit,
    errors,
    register,
    setValue,
    calculateAge,
    getValues,
  } = useStepVitals(nextStep);
  
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
      mt={8}
      p={4}
      maxW="1100px"
      mx="auto"
      borderWidth="1px"
      borderRadius="xl"
      boxShadow="xl"
      bg="white"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(34, 197, 94, 0.05) 50%, rgba(147, 51, 234, 0.05) 100%)",
        zIndex: 0,
      }}
    >
      {/* Return Dashboard Button */}
      <Box
        position="absolute"
        top={3}
        left={3}
        zIndex={2}
        transform="translateY(0)"
        transition="all 0.3s ease"
        _hover={{ transform: "translateY(-2px)" }}
      >
        <ReturnDashboard />
      </Box>

      <VStack gap={5} align="stretch" mt={6} position="relative" zIndex={1}>
        {/* Header Section */}
        <Box
          textAlign="center"
          transform="translateY(0)"
          opacity={1}
          transition="all 0.6s ease"
        >
          <Text fontSize="2xl" fontWeight="bold" color="blue.600" mb={1}>
            Personal Information
          </Text>
          <Text fontSize="sm" color="gray.600">
            Help us get to know you better by filling out your personal details
          </Text>
        </Box>

        {/* Form Sections Grid */}
        <Grid templateColumns="repeat(3, 1fr)" gap={5}>
          <GridItem>
            <PersonalDetailsSection
              register={register}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
              calculatedAge={calculatedAge}
              handleDateChange={handleDateChange}
            />
          </GridItem>

          <GridItem>
            <ContactInfoSection register={register} errors={errors} />
          </GridItem>

          <GridItem>
            <AddressInfoSection register={register} errors={errors} />
          </GridItem>
        </Grid>

        {/* Navigation Buttons */}
        <Box pt={3} transform="translateY(0)" transition="all 0.5s ease">
          <StepNavigationButtons
            onPrevStep={prevStep}
            onNextStep={handleSubmit(onSubmit)}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default StepVitals;
