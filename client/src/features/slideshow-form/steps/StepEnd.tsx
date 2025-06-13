import BaseButton from "@/components/ui/BaseButton";
import { Box, Text, Stack } from "@chakra-ui/react";
import { useSlideshowFormStore } from "@slideshow-form/store/store";
import ReturnDashboard from "../components/ReturnDashboard";
import axiosInstance from "@/api/axios-instance";

interface StepEndProps {
  nextStep: () => void;
  prevStep: () => void;
}

const StepEnd = ({ prevStep }: StepEndProps) => {
  const formData = useSlideshowFormStore((state) => state.formData);

  const handleGenerateCv = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/cv/generate",
        formData,
        { responseType: "blob" }
      );
  
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
  
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cv.docx";
      document.body.appendChild(a);
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
