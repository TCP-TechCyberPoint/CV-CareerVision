import { useState } from "react";
import { Box, Button, VStack, Text, Spinner } from "@chakra-ui/react";
import { useSlideshowFormStore } from "../store";
import { api } from "@/api/axios";
import { useNavigate } from "react-router-dom";

const StepEnd = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formData = useSlideshowFormStore((state) => state.formData);
  const navigate = useNavigate();

  const handleGenerateAndUpload = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Generate CV
      const response = await api.post("/api/cv/generate", formData, {
        responseType: "blob",
      });

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "cv.docx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setIsGenerating(false);
      setIsUploading(true);

      // Save CV data
      const payload = {
        vitals: formData.vitals,
        experience: formData.experience,
        education: formData.education,
        projects: formData.projects,
        skills: formData.skills,
        preferences: formData.preferences,
        military: formData.military,
      };

      await api.post("/api/cv/save", payload);
      await api.post("/api/cv/upload", payload);

      setIsUploading(false);
      navigate("/home");
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      setIsGenerating(false);
      setIsUploading(false);
    }
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="center">
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          Congratulations! You've completed your CV
        </Text>
        
        <Text textAlign="center" color="gray.600">
          Click the button below to generate and download your CV, then save it to your account.
        </Text>

        {error && (
          <Text color="red.500" textAlign="center">
            {error}
          </Text>
        )}

        <Button
          colorScheme="blue"
          size="lg"
          onClick={handleGenerateAndUpload}
          isLoading={isGenerating || isUploading}
          loadingText={isGenerating ? "Generating CV..." : "Uploading..."}
          disabled={isGenerating || isUploading}
        >
          {isGenerating || isUploading ? (
            <VStack spacing={2}>
              <Spinner size="sm" />
              <Text fontSize="sm">
                {isGenerating ? "Generating CV..." : "Uploading..."}
              </Text>
            </VStack>
          ) : (
            "Generate & Download CV"
          )}
        </Button>

        <Text fontSize="sm" color="gray.500" textAlign="center">
          Your CV will be automatically saved to your account after generation.
        </Text>
      </VStack>
    </Box>
  );
};

export default StepEnd;