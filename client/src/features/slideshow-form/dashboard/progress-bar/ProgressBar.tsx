import {
  Box,
  Progress,
  Text,
  Stack,
  HStack,
  Badge,
  Flex,
} from "@chakra-ui/react";
import type { SlideshowFormData } from "@slideshow-form/types/form.types";
import { useProgressCalculation } from "@slideshow-form/hooks/useProgressCalculation";

interface ProgressBarProps {
  formData: SlideshowFormData;
  label?: string;
  showPercentage?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  width?: string;
  maxWidth?: string;
  colorPalette?:
    | "gray"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "teal"
    | "blue"
    | "cyan"
    | "purple"
    | "pink";
}

const ProgressBar = ({
  formData,
  label = "Profile Completion",
  showPercentage = true,
  size = "md",
  width = "full",
  maxWidth = "800px", 
}: ProgressBarProps) => {
  const { overallCompletion, getStatusColor, getStatusText } = useProgressCalculation(formData);
  const statusColor = getStatusColor(overallCompletion);

  return (
    <Box
      p={6}
      bg={{ base: "gray.50", _dark: "gray.800" }}
      borderRadius="xl"
      border="1px"
      borderColor={{ base: "gray.200", _dark: "gray.600" }}
      shadow="sm"
      w={width}
      maxW={maxWidth}
    >
      <Stack gap={4} align="stretch">
        {/* Header with label and percentage */}
        <Flex justify="space-between" align="center">
          <Text
            fontSize="lg"
            fontWeight="semibold"
            color={{ base: "gray.800", _dark: "gray.100" }}
          >
            {label}
          </Text>
          {showPercentage && (
            <HStack gap={4}>
              <Badge
                colorPalette={statusColor}
                variant="subtle"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
              >
                {getStatusText(overallCompletion)}
              </Badge>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color={`${statusColor}.500`}
              >
                {overallCompletion}%
              </Text>
            </HStack>
          )}
        </Flex>

        {/* Progress bar */}
        <Progress.Root
          value={overallCompletion}
          size={size}
          colorPalette={statusColor}
          striped
          animated
        >
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>

        {/* Status text */}
        <Text
          fontSize="sm"
          color={{ base: "gray.700", _dark: "gray.300" }}
          textAlign="center"
        >
          Complete your profile to improve your visibility to employers
        </Text>
      </Stack>
    </Box>
  );
};

export default ProgressBar;
