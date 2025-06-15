import { Box, VStack, Text, Grid, GridItem } from "@chakra-ui/react";
import { useStepVitals } from "../hooks/useStepVitals";
import StepNavigationButtons from "../components/StepNavigationButtons";
import ReturnDashboard from "../components/ReturnDashboard";
import {
  PersonalDetailsSection,
  ContactInfoSection,
  AddressInfoSection,
} from "../components/vitals";
import containerStyles from "../components/vitals/containerStyles";

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
    <Box {...containerStyles}>
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
