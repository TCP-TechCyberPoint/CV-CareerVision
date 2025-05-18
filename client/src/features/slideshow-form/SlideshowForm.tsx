import { Box } from "@chakra-ui/react";

import StepIntro from "./steps/StepIntro";
import { useSlideshowForm } from "./store/useSlideshowForm";
import StepVitals from "./steps/StepVitals";
import StepSkills from "./steps/StepSkills";

const SlideshowForm = () => {
  const currentStep = useSlideshowForm().currentStep;
  return (
    <Box>
      {currentStep === 0 && <StepIntro />}
      {currentStep === 1 && <StepVitals />}
      {currentStep === 2 && <StepSkills />}
    </Box>
  );
};

export default SlideshowForm;
