import { Box } from "@chakra-ui/react";
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
  prevButtonText = "Back",
  nextButtonText = "Next",
  isLoading = false,
  isPrevDisabled = false,
  isNextDisabled = false,
}: StepNavigationButtonsProps) => {
  return (
    <Box display="flex" justifyContent="space-between" pt={6}>
      <BaseButton
        onClick={onPrevStep}
        colorScheme="red"
        variant="outline"
        size="lg"
        minW="140px"
        // disabled={isPrevDisabled}
      >
        {prevButtonText}
      </BaseButton>
      <BaseButton
        onClick={onNextStep}
        size="lg"
        variant="subtle"
        colorScheme="green"
        minW="120px"
        // disabled={isNextDisabled || isLoading}
      >
        {nextButtonText}
      </BaseButton>
    </Box>
  );
};

export default StepNavigationButtons; 