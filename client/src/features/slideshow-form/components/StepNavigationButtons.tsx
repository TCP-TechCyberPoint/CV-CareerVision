import { Box, Flex } from "@chakra-ui/react";
import BaseButton from "@/components/ui/BaseButton";

interface StepNavigationButtonsProps {
  onPrevStep: () => void;
  onNextStep: () => void;
  prevButtonText?: string;
  nextButtonText?: string;
  isLoading?: boolean;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
}

const StepNavigationButtons = ({
  onPrevStep,
  onNextStep,
  
}: StepNavigationButtonsProps) => {
  return (
    <Flex justify="space-between" pt={8} gap={4}>
    <BaseButton
      onClick={onPrevStep}
      colorPalette="red"
      variant="outline"
      size="lg"
      minW="140px"
    >
      Back
    </BaseButton>
    <BaseButton
      onClick={onNextStep}
      size="lg"
      colorPalette="blue"
      minW="140px"
    >
      Next
    </BaseButton>
  </Flex>
  );
};

export default StepNavigationButtons; 