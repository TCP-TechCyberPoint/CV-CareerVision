import { Box, Input, VStack } from "@chakra-ui/react";
import { HStack, RadioGroup } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useSlideshowForm } from "../store/useSlideshowForm";
import BaseButton from "@/components/ui/BaseButton";

const StepVitals = () => {
  const { formData, setFormData, nextStep, prevStep } = useSlideshowForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ [e.target.name]: e.target.value });
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
        <FormControl>
          <FormLabel fontWeight="medium">Name</FormLabel>
          <Input
            name="name"
            value={formData.name}
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

        <FormControl>
          <FormLabel fontWeight="medium">Age</FormLabel>
          <Input
            name="age"
            value={formData.age}
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

        <FormControl>
          <FormLabel fontWeight="medium">Gender</FormLabel>
          <RadioGroup.Root
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <HStack gap={8} py={2}>
              {["Male", "Female", "Other"].map((gender) => (
                <RadioGroup.Item
                  key={gender}
                  value={gender}
                  _checked={{ bg: "teal.50", borderColor: "teal.500" }}
                >
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText fontWeight="medium">
                    {gender}
                  </RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </HStack>
          </RadioGroup.Root>
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="medium">Email</FormLabel>
          <Input
            name="email"
            value={formData.email}
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
            onClick={prevStep}
            colorScheme="red"
            variant="subtle"
            size="lg"
            minW="120px"
          >
            Back
          </BaseButton>
          <BaseButton
            onClick={nextStep}
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
