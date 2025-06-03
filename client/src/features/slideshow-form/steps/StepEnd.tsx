import BaseButton from "@/components/ui/BaseButton";
import { Box, Text, Stack } from "@chakra-ui/react";
import { useSlideshowFormStore } from "@slideshow-form/store/store";
import ReturnDashboard from "../components/ReturnDashboard";

interface StepEndProps {
  nextStep: () => void;
  prevStep: () => void;
}

const StepEnd = ({ prevStep }: StepEndProps) => {
  const formData = useSlideshowFormStore((state) => state.formData);

  const handleGenerateCv = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cv/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to generate CV");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cv.pdf";
      document.body.appendChild(a); // required for Firefox
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("CV download failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Box position="relative" p={8}>
      <Box position="absolute" top={4} left={4}>
        <ReturnDashboard />
      </Box>
      
      <Box mt={12}>
        <Text>End</Text>
        <Stack direction="row" gap={4} mt={4}>
          <BaseButton onClick={prevStep}>Back</BaseButton>
          <BaseButton onClick={handleGenerateCv}>Generate CV</BaseButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default StepEnd;
