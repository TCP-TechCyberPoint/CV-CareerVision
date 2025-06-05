import { Box, Input, RadioGroup, VStack, Text, Grid, GridItem, Card } from "@chakra-ui/react";
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
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(34, 197, 94, 0.05) 50%, rgba(147, 51, 234, 0.05) 100%)",
        zIndex: 0,
      }}
    >
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

        <Grid templateColumns="repeat(3, 1fr)" gap={5}>
          {/* Personal Details Section */}
          <GridItem>
            <Box
              transform="translateY(0)"
              transition="all 0.3s ease"
              _hover={{ 
                transform: "translateY(-5px)",
                filter: "drop-shadow(0 10px 20px rgba(59, 130, 246, 0.1))"
              }}
            >
              <Card.Root 
                bg="white" 
                borderRadius="lg" 
                boxShadow="lg" 
                p={4}
                border="1px solid"
                borderColor="blue.100"
                _hover={{
                  borderColor: "blue.200",
                  boxShadow: "xl",
                }}
                transition="all 0.3s ease"
              >
                <Card.Header pb={2}>
                  <Text fontSize="lg" fontWeight="semibold" color="blue.600">
                    👤 Personal Details
                  </Text>
                </Card.Header>
                <Card.Body>
                  <VStack gap={3} align="stretch">
                    {/* Name input field */}
                    <Field.Root invalid={!!errors.name}>
                      <Field.Label fontWeight="semibold" color="gray.700" fontSize="sm">Full Name</Field.Label>
                      <Input
                        {...register("name")}
                        placeholder="Enter your full name"
                        size="md"
                        borderRadius="md"
                        bg="gray.50"
                        border="2px solid"
                        borderColor="gray.200"
                        _hover={{ borderColor: "blue.300" }}
                        _focus={{
                          borderColor: "blue.400",
                          boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.1)",
                          bg: "white"
                        }}
                        transition="all 0.2s ease"
                      />
                      <Field.ErrorText color="red.500" fontSize="xs">{errors.name?.message}</Field.ErrorText>
                    </Field.Root>

                    {/* Date of Birth input field */}
                    <Field.Root invalid={!!errors.dateOfBirth}>
                      <Field.Label fontWeight="semibold" color="gray.700" fontSize="sm">Date of Birth</Field.Label>
                      <Input
                        type="date"
                        size="md"
                        borderRadius="md"
                        bg="gray.50"
                        border="2px solid"
                        borderColor="gray.200"
                        _hover={{ borderColor: "blue.300" }}
                        onChange={handleDateChange}
                        _focus={{
                          borderColor: "blue.400",
                          boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.1)",
                          bg: "white"
                        }}
                        transition="all 0.2s ease"
                      />
                      {calculatedAge !== null && (
                        <Text fontSize="xs" color="blue.600" mt={1} fontWeight="medium">
                          🎂 Age: {calculatedAge} years old
                        </Text>
                      )}
                      <Field.ErrorText color="red.500" fontSize="xs">{errors.dateOfBirth?.message}</Field.ErrorText>
                    </Field.Root>

                    {/* Gender input field */}
                    <Field.Root invalid={!!errors.gender}>
                      <Field.Label fontWeight="semibold" color="gray.700" fontSize="sm">Gender</Field.Label>
                      <RadioGroup.Root
                        defaultValue={Gender.Male}
                        onValueChange={(details) => {
                          setValue("gender", details.value as Gender);
                        }}
                      >
                        <VStack gap={2} py={2} align="flex-start">
                          {Object.values(Gender).map((gender) => (
                            <RadioGroup.Item key={gender} value={gender}>
                              <RadioGroup.ItemHiddenInput />
                              <RadioGroup.ItemIndicator />
                              <RadioGroup.ItemText fontSize="sm" fontWeight="medium">{gender}</RadioGroup.ItemText>
                            </RadioGroup.Item>
                          ))}
                        </VStack>
                      </RadioGroup.Root>
                      <Field.ErrorText color="red.500" fontSize="xs">{errors.gender?.message}</Field.ErrorText>
                    </Field.Root>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </Box>
          </GridItem>

          {/* Contact Information Section */}
          <GridItem>
            <Box
              transform="translateY(0)"
              transition="all 0.3s ease"
              _hover={{ 
                transform: "translateY(-5px)",
                filter: "drop-shadow(0 10px 20px rgba(34, 197, 94, 0.1))"
              }}
            >
              <Card.Root 
                bg="white" 
                borderRadius="lg" 
                boxShadow="lg" 
                p={4}
                border="1px solid"
                borderColor="green.100"
                _hover={{
                  borderColor: "green.200",
                  boxShadow: "xl",
                }}
                transition="all 0.3s ease"
              >
                <Card.Header pb={2}>
                  <Text fontSize="lg" fontWeight="semibold" color="green.600">
                    📞 Contact Info
                  </Text>
                </Card.Header>
                <Card.Body>
                  <VStack gap={3} align="stretch">
                    {/* Email input field */}
                    <Field.Root invalid={!!errors.email}>
                      <Field.Label fontWeight="semibold" color="gray.700" fontSize="sm">Email Address</Field.Label>
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="you@example.com"
                        size="md"
                        borderRadius="md"
                        bg="gray.50"
                        border="2px solid"
                        borderColor="gray.200"
                        _hover={{ borderColor: "green.300" }}
                        _focus={{
                          borderColor: "green.400",
                          boxShadow: "0 0 0 2px rgba(34, 197, 94, 0.1)",
                          bg: "white"
                        }}
                        transition="all 0.2s ease"
                      />
                      <Field.ErrorText color="red.500" fontSize="xs">{errors.email?.message}</Field.ErrorText>
                    </Field.Root>

                    {/* Phone input field */}
                    <Field.Root invalid={!!errors.phone}>
                      <Field.Label fontWeight="semibold" color="gray.700" fontSize="sm">Phone Number</Field.Label>
                      <Input
                        {...register("phone")}
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        size="md"
                        borderRadius="md"
                        bg="gray.50"
                        border="2px solid"
                        borderColor="gray.200"
                        _hover={{ borderColor: "green.300" }}
                        _focus={{
                          borderColor: "green.400",
                          boxShadow: "0 0 0 2px rgba(34, 197, 94, 0.1)",
                          bg: "white"
                        }}
                        transition="all 0.2s ease"
                      />
                      <Field.ErrorText color="red.500" fontSize="xs">{errors.phone?.message}</Field.ErrorText>
                    </Field.Root>

                    {/* LinkedIn input field */}
                    <Field.Root invalid={!!errors.linkedin}>
                      <Field.Label fontWeight="semibold" color="gray.700" fontSize="sm">
                        LinkedIn 
                        <Text as="span" color="gray.500" fontWeight="normal" fontSize="xs"> (Optional)</Text>
                      </Field.Label>
                      <Input
                        {...register("linkedin")}
                        type="url"
                        placeholder="linkedin.com/in/yourprofile"
                        size="md"
                        borderRadius="md"
                        bg="gray.50"
                        border="2px solid"
                        borderColor="gray.200"
                        _hover={{ borderColor: "green.300" }}
                        _focus={{
                          borderColor: "green.400",
                          boxShadow: "0 0 0 2px rgba(34, 197, 94, 0.1)",
                          bg: "white"
                        }}
                        transition="all 0.2s ease"
                      />
                      <Field.ErrorText color="red.500" fontSize="xs">{errors.linkedin?.message}</Field.ErrorText>
                    </Field.Root>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </Box>
          </GridItem>

          {/* Address Information Section */}
          <GridItem>
            <Box
              transform="translateY(0)"
              transition="all 0.3s ease"
              _hover={{ 
                transform: "translateY(-5px)",
                filter: "drop-shadow(0 10px 20px rgba(147, 51, 234, 0.1))"
              }}
            >
              <Card.Root 
                bg="white" 
                borderRadius="lg" 
                boxShadow="lg" 
                p={4}
                border="1px solid"
                borderColor="purple.100"
                _hover={{
                  borderColor: "purple.200",
                  boxShadow: "xl",
                }}
                transition="all 0.3s ease"
              >
                <Card.Header pb={2}>
                  <Text fontSize="lg" fontWeight="semibold" color="purple.600">
                    📍 Address Info
                  </Text>
                </Card.Header>
                <Card.Body>
                  <VStack gap={3} align="stretch">
                    {/* Country input field */}
                    <Field.Root invalid={!!errors.country}>
                      <Field.Label fontWeight="semibold" color="gray.700" fontSize="sm">Country</Field.Label>
                      <Input
                        {...register("country")}
                        placeholder="United States"
                        size="md"
                        borderRadius="md"
                        bg="gray.50"
                        border="2px solid"
                        borderColor="gray.200"
                        _hover={{ borderColor: "purple.300" }}
                        _focus={{
                          borderColor: "purple.400",
                          boxShadow: "0 0 0 2px rgba(147, 51, 234, 0.1)",
                          bg: "white"
                        }}
                        transition="all 0.2s ease"
                      />
                      <Field.ErrorText color="red.500" fontSize="xs">{errors.country?.message}</Field.ErrorText>
                    </Field.Root>

                    {/* City input field */}
                    <Field.Root invalid={!!errors.city}>
                      <Field.Label fontWeight="semibold" color="gray.700" fontSize="sm">City</Field.Label>
                      <Input
                        {...register("city")}
                        placeholder="San Francisco"
                        size="md"
                        borderRadius="md"
                        bg="gray.50"
                        border="2px solid"
                        borderColor="gray.200"
                        _hover={{ borderColor: "purple.300" }}
                        _focus={{
                          borderColor: "purple.400",
                          boxShadow: "0 0 0 2px rgba(147, 51, 234, 0.1)",
                          bg: "white"
                        }}
                        transition="all 0.2s ease"
                      />
                      <Field.ErrorText color="red.500" fontSize="xs">{errors.city?.message}</Field.ErrorText>
                    </Field.Root>

                    {/* Street input field */}
                    <Field.Root invalid={!!errors.street}>
                      <Field.Label fontWeight="semibold" color="gray.700" fontSize="sm">Street Address</Field.Label>
                      <Input
                        {...register("street")}
                        placeholder="123 Main Street, Apt 4B"
                        size="md"
                        borderRadius="md"
                        bg="gray.50"
                        border="2px solid"
                        borderColor="gray.200"
                        _hover={{ borderColor: "purple.300" }}
                        _focus={{
                          borderColor: "purple.400",
                          boxShadow: "0 0 0 2px rgba(147, 51, 234, 0.1)",
                          bg: "white"
                        }}
                        transition="all 0.2s ease"
                      />
                      <Field.ErrorText color="red.500" fontSize="xs">{errors.street?.message}</Field.ErrorText>
                    </Field.Root>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </Box>
          </GridItem>
        </Grid>

        <Box 
          pt={3}
          transform="translateY(0)"
          transition="all 0.5s ease"
        >
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
