import { Box, Input, RadioGroup, VStack } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
// import { useSlideshowForm } from "../store/useSlideshowForm";
import BaseButton from "@/components/ui/BaseButton";
import { useSlideshowFormStore } from "../store";
import { Gender, type StepVitalsFields } from "../store/types";
import { useState } from "react";

const StepVitals = () => {
  const { formData, updateFormData } = useSlideshowFormStore();

  /** TODO: Add next step and prev step logic here */
  // const { nextStep, prevStep } = createSlideshowActions();

  const [localData, setLocalData] = useState<StepVitalsFields>({
    name: formData.name ?? "",
    age: formData.age ?? 0,
    gender: formData.gender ?? Gender.Male,
    email: formData.email ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    updateFormData(localData); // Save all data to store at once
    /** TODO: Add next step logic here */
    // nextStep(); // Move to next step
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
          <Input
            name="name"
            value={localData.name}
            onChange={handleChange}
            placeholder="Your full name"
            size="lg"
            borderRadius="md"
            _focus={{
              borderColor: "teal.400",
              boxShadow: "0 0 0 1px teal.400",
            }}
          />
        </FormControl>

        {/* Age input field */}
        <FormControl>
          <FormLabel fontWeight="medium">Age</FormLabel>
          <Input
            name="age"
            value={localData.age}
            onChange={handleChange}
            type="number"
            placeholder="Your age"
            size="lg"
            borderRadius="md"
            _focus={{
              borderColor: "teal.400",
              boxShadow: "0 0 0 1px teal.400",
            }}
          />
        </FormControl>

        {/* Gender input field */}
        <FormControl>
          <FormLabel fontWeight="medium">Gender</FormLabel>
          <RadioGroup.Root defaultValue="1">
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
        </FormControl>
        
        {/* Email input field */}
        <FormControl>
          <FormLabel fontWeight="medium">Email</FormLabel>
          <Input
            name="email"
            value={localData.email}
            onChange={handleChange}
            type="email"
            placeholder="you@example.com"
            size="lg"
            borderRadius="md"
            _focus={{
              borderColor: "teal.400",
              boxShadow: "0 0 0 1px teal.400",
            }}
          />
        </FormControl>

        <Box display="flex" justifyContent="space-between" pt={6}>
          <BaseButton
            /** TODO: Add prev step logic here
             *  onClick={()=>{}}
             */

            colorScheme="red"
            variant="subtle"
            size="lg"
            minW="120px"
          >
            Back
          </BaseButton>
          <BaseButton
            onClick={handleNext}
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
