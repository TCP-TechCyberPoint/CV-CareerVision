import {
  Box,
  Progress,
  Text,
  Stack,
  HStack,
  Badge,
  Flex,
} from '@chakra-ui/react';

interface ProgressBarProps {
  completionPercentage?: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  colorPalette?: 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink';
}

const ProgressBar = ({
  completionPercentage = 0,
  label = 'Profile Completion',
  showPercentage = true,
  size = 'lg',
  colorPalette = 'blue',
}: ProgressBarProps) => {
  // Ensure percentage is between 0 and 100
  const clampedPercentage = Math.min(Math.max(completionPercentage, 0), 100);

  // Get status color based on completion
  const getStatusColor = (percentage: number): typeof colorPalette => {
    if (percentage < 25) return 'red';
    if (percentage < 50) return 'orange';
    if (percentage < 75) return 'yellow';
    if (percentage < 100) return 'blue';
    return 'green';
  };

  const statusColor = getStatusColor(clampedPercentage);

  // Get status text
  const getStatusText = (percentage: number) => {
    if (percentage === 0) return 'Not Started';
    if (percentage < 25) return 'Getting Started';
    if (percentage < 50) return 'In Progress';
    if (percentage < 75) return 'Well Underway';
    if (percentage < 100) return 'Almost Done';
    return 'Complete';
  };

  return (
    <Box
      p={6}
      bg={{ base: 'gray.50', _dark: 'gray.800' }}
      borderRadius="xl"
      border="1px"
      borderColor={{ base: 'gray.200', _dark: 'gray.600' }}
      shadow="sm"
      w="full"
      maxW="600px"
    >
      <Stack gap={4} align="stretch">
        {/* Header with label and percentage */}
        <Flex justify="space-between" align="center">
          <Text
            fontSize="lg"
            fontWeight="semibold"
            color={{ base: 'gray.800', _dark: 'gray.100' }}
          >
            {label}
          </Text>
          {showPercentage && (
            <HStack gap={2}>
              <Badge
                colorPalette={statusColor}
                variant="subtle"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
              >
                {getStatusText(clampedPercentage)}
              </Badge>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color={`${statusColor}.500`}
              >
                {clampedPercentage}%
              </Text>
            </HStack>
          )}
        </Flex>

        {/* Progress bar */}
        <Progress.Root
          value={clampedPercentage}
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
          color={{ base: 'gray.700', _dark: 'gray.300' }}
          textAlign="center"
        >
          Complete your profile to improve your visibility to employers
        </Text>
      </Stack>
    </Box>
  );
};

export default ProgressBar;
