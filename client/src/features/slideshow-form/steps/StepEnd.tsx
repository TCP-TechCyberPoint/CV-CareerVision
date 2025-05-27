import BaseButton from "@/components/ui/BaseButton";
import { Box, Text } from "@chakra-ui/react";

interface StepEndProps {
  nextStep: () => void;
  prevStep: () => void;
}

const StepEnd = ({  prevStep }: StepEndProps) => {
  // const { onSubmit } = useStepEnd(nextStep);
  return (
    <Box>
      <Text>End</Text>
      <BaseButton onClick={prevStep}>Back</BaseButton>
    </Box>
  );
};

export default StepEnd;
