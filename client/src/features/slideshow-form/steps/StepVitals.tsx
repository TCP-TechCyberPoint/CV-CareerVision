import { Box, VStack, Text, Grid, GridItem } from "@chakra-ui/react";
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
    getValues,
  } = useStepVitals(nextStep);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      const date = new Date(dateValue);
      setValue("dateOfBirth", date);
    }
  };
  const personalDetailsProps = {
    register,
    errors,
    setValue,
    getValues,
    handleDateChange,
  };

  return (
    <Box
      mt={{ base: 10, sm: 12, md: 14, lg: 16 }}
      mx="auto"
      maxW={{ base: "100%", md: "75%" }}
      p={{ base: 4, sm: 6, md: 8, lg: 10 }}
      position="relative"
    >
      {/* Return Dashboard Button */}
      <Box
        position="relative"
        top={{ base: 2, sm: 3, md: 4 }}
        left={{ base: 2, sm: 3, md: 4 }}
        zIndex={2}
        transform="translateY(0)"
        transition="all 0.3s ease"
        _hover={{ transform: "translateY(-2px)" }}
      >
        <ReturnDashboard />
      </Box>

      <VStack gap={{ base: 4, sm: 6, md: 8, lg: 10 }} align="stretch" mt={{ base: 8, sm: 10, md: 12, lg: 14 }} position="relative" zIndex={1}>
        {/* Header Section */}
        <Box
          textAlign="center"
          transform="translateY(0)"
          opacity={1}
          transition="all 0.6s ease"
        >
          <Text fontSize={{ base: "xl", sm: "2xl", md: "3xl" }} fontWeight="bold" color="blue.600" mb={1}>
            Personal Information
          </Text>
          <Text fontSize={{ base: "sm", sm: "md", md: "lg" }} color="white">
            Help us get to know you better by filling out your personal details
          </Text>
        </Box>

        {/* Form Sections Grid */}
        <Grid 
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} 
          gap={{ base: 4, sm: 6, md: 8, lg: 10 }}
        >
          <GridItem>
            <PersonalDetailsSection {...personalDetailsProps} />
          </GridItem>

          <GridItem>
            <ContactInfoSection register={register} errors={errors} />
          </GridItem>

          <GridItem>
            <AddressInfoSection register={register} errors={errors} />
          </GridItem>
        </Grid>

        {/* Navigation Buttons */}
        <Box pt={{ base: 3, sm: 4, md: 5, lg: 6 }} transform="translateY(0)" transition="all 0.5s ease">
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
