import BaseButton from "@/components/shared/BaseButton";
import { Box, Text, Stack } from "@chakra-ui/react";
import { useSlideshowFormStore } from "../store";
import ReturnDashboard from "../components/ReturnDashboard";
import axiosInstance from "@/auth/api";
import { useState } from "react";

interface StepEndProps {
  nextStep: () => void;
  prevStep: () => void;
}

const StepEnd = ({ prevStep }: StepEndProps) => {
  const formData = useSlideshowFormStore((state) => state.formData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cvGenerated, setCvGenerated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [cvGenerated, setCvGenerated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);


  const handleGenerateCv = async () => {
    setIsGenerating(true);
    setCvGenerated(false);

    try {
      const response = await axiosInstance.post("/api/cv/generate", formData, {
        responseType: "blob",
      });

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

      setCvGenerated(true);
    } catch (err) {
      console.error("CV generation/download failed:", err);
      alert("Failed to generate CV.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveCv = async () => {
    if (!formData?.vitals?.email) {
      alert("Missing email. Cannot save CV.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        email: formData.vitals.email,
        ...formData,
      };

      // Save structured CV data
      await axiosInstance.post("/api/cv/save", payload);

      // Upload .docx version to Cloudinary
      await axiosInstance.post("/api/cv/upload", payload);

      alert("CV data saved and uploaded successfully.");
    } catch (err) {
      console.error("Saving CV failed:", err);
      alert("Something went wrong while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box position="relative" p={8}>
      <Box position="absolute" top={4} left={4}>
        <ReturnDashboard />
      </Box>

      <Box mt={12}>
        <Text fontSize="xl" fontWeight="bold">You're all set!</Text>
        <Stack direction="row" gap={4} mt={4}>
          <BaseButton onClick={prevStep}>Back</BaseButton>
          <BaseButton onClick={handleGenerateCv} disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Generate CV"}
          </BaseButton>
          <BaseButton
            onClick={handleSaveCv}
            disabled={!cvGenerated || isSaving || isGenerating}
          >
            {isSaving ? "Saving..." : "Save CV"}
          </BaseButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default StepEnd;