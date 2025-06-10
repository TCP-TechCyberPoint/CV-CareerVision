import { useState, useEffect } from "react";
import {
  Box,
  Input,
  RadioGroup,
  VStack,
  Text,
  Grid,
  GridItem,
  Card,
  Field,
} from "@chakra-ui/react";
import { useStepVitals } from "../hooks/useStepVitals";
import StepNavigationButtons from "../components/StepNavigationButtons";
import ReturnDashboard from "../components/ReturnDashboard";
import type { Gender } from "../types";

// Reusable styled input component
const StyledInput = ({ 
  hoverColor, 
  focusColor, 
  ...props 
}: any) => (
  <Input
    size="md"
    borderRadius="md"
    bg="gray.50"
    border="2px solid"
    borderColor="gray.200"
    _hover={{ borderColor: `${hoverColor}.300` }}
    _focus={{
      borderColor: `${focusColor}.400`,
      boxShadow: `0 0 0 2px rgba(${focusColor === 'blue' ? '59, 130, 246' : focusColor === 'green' ? '34, 197, 94' : '147, 51, 234'}, 0.1)`,
      bg: "white",
    }}
    transition="all 0.2s ease"
    {...props}
  />
);

// Reusable form field component
const FormField = ({ 
  label, 
  error, 
  children, 
  optional = false 
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  optional?: boolean;
}) => (
  <Field.Root invalid={!!error}>
    <Field.Label fontWeight="semibold" color="gray.700" fontSize="sm">
      {label}
      {optional && (
        <Text as="span" color="gray.500" fontWeight="normal" fontSize="xs">
          {" "}(Optional)
        </Text>
      )}
    </Field.Label>
    {children}
    <Field.ErrorText color="red.500" fontSize="xs">
      {error}
    </Field.ErrorText>
  </Field.Root>
);

// Reusable card section component
const InfoCard = ({ 
  title, 
  icon, 
  color, 
  children 
}: {
  title: string;
  icon: string;
  color: string;
  children: React.ReactNode;
}) => (
  <Box
    transform="translateY(0)"
    transition="all 0.3s ease"
    _hover={{
      transform: "translateY(-5px)",
      filter: `drop-shadow(0 10px 20px rgba(${
        color === 'blue' ? '59, 130, 246' : 
        color === 'green' ? '34, 197, 94' : 
        '147, 51, 234'
      }, 0.1))`,
    }}
  >
    <Card.Root
      bg="white"
      borderRadius="lg"
      boxShadow="lg"
      p={4}
      border="1px solid"
      borderColor={`${color}.100`}
      _hover={{
        borderColor: `${color}.200`,
        boxShadow: "xl",
      }}
      transition="all 0.3s ease"
    >
      <Card.Header pb={2}>
        <Text fontSize="lg" fontWeight="semibold" color={`${color}.600`}>
          {icon} {title}
        </Text>
      </Card.Header>
      <Card.Body>
        <VStack gap={3} align="stretch">
          {children}
        </VStack>
      </Card.Body>
    </Card.Root>
  </Box>
);

// Personal Details Section Component
const PersonalDetailsSection = ({ 
  register, 
  errors, 
  setValue, 
  getValues, 
  calculatedAge, 
  handleDateChange 
}: any) => (
  <InfoCard title="Personal Details" icon="👤" color="blue">
    <FormField label="Full Name" error={errors.name?.message}>
      <StyledInput
        {...register("name")}
        placeholder="Enter your full name"
        hoverColor="blue"
        focusColor="blue"
      />
    </FormField>

    <FormField label="Date of Birth" error={errors.dateOfBirth?.message}>
      <StyledInput
        defaultValue={getValues("dateOfBirth")?.toISOString().split("T")[0]}
        type="date"
        onChange={handleDateChange}
        hoverColor="blue"
        focusColor="blue"
      />
      {calculatedAge !== null && (
        <Text fontSize="xs" color="blue.600" mt={1} fontWeight="medium">
          🎂 Age: {calculatedAge} years old
        </Text>
      )}
    </FormField>

    <FormField label="Gender" error={errors.gender?.message}>
      <RadioGroup.Root
        defaultValue={"Male"}
        onValueChange={(details) => setValue("gender", details.value as Gender)}
      >
        <VStack gap={2} py={2} align="flex-start">
          {["Male", "Female", "Other"].map((gender) => (
            <RadioGroup.Item key={gender} value={gender}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText fontSize="sm" fontWeight="medium">
                {gender}
              </RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </VStack>
      </RadioGroup.Root>
    </FormField>
  </InfoCard>
);

// Contact Information Section Component
const ContactInfoSection = ({ register, errors }: any) => (
  <InfoCard title="Contact Info" icon="📞" color="green">
    <FormField label="Email Address" error={errors.email?.message}>
      <StyledInput
        {...register("email")}
        type="email"
        placeholder="you@example.com"
        hoverColor="green"
        focusColor="green"
      />
    </FormField>

    <FormField label="Phone Number" error={errors.phone?.message}>
      <StyledInput
        {...register("phone")}
        type="tel"
        placeholder="+1 (555) 123-4567"
        hoverColor="green"
        focusColor="green"
      />
    </FormField>

    <FormField label="LinkedIn" error={errors.linkedin?.message} optional>
      <StyledInput
        {...register("linkedin")}
        type="url"
        placeholder="linkedin.com/in/yourprofile"
        hoverColor="green"
        focusColor="green"
      />
    </FormField>
  </InfoCard>
);

// Address Information Section Component
const AddressInfoSection = ({ register, errors }: any) => (
  <InfoCard title="Address Info" icon="📍" color="purple">
    <FormField label="Country" error={errors.country?.message}>
      <StyledInput
        {...register("country")}
        placeholder="United States"
        hoverColor="purple"
        focusColor="purple"
      />
    </FormField>

    <FormField label="City" error={errors.city?.message}>
      <StyledInput
        {...register("city")}
        placeholder="San Francisco"
        hoverColor="purple"
        focusColor="purple"
      />
    </FormField>

    <FormField label="Street Address" error={errors.street?.message}>
      <StyledInput
        {...register("street")}
        placeholder="123 Main Street, Apt 4B"
        hoverColor="purple"
        focusColor="purple"
      />
    </FormField>
  </InfoCard>
);

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
