import BaseButton from "@/components/ui/BaseButton";
import { Box, Heading, Text, Image, Flex, Stack } from "@chakra-ui/react";
import introFormImage from "@/assets/images/intro-form.png";
import ReturnDashboard from "../components/ReturnDashboard";

const StepIntro = ({ nextStep }: { nextStep: () => void }) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW="600px"
      p={8}
      borderRadius="3xl"
      boxShadow="xl"
      bg="white"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      border="1px solid"
      borderColor="gray.100"
      position="relative"
      _hover={{
        boxShadow: "2xl",
        transform: "translateY(-2px)",
        transition: "all 0.3s ease"
      }}
      transition="all 0.3s ease"
    >
      <Box position="absolute" top={4} left={4}>
        <ReturnDashboard />
      </Box>

      <Stack gap={6} mt={10}>
        <Stack gap={3} textAlign="center">
          <Heading size="xl" color="blue.600" fontWeight="bold">
            Create Your Professional CV
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="400px" mx="auto">
            Let's build a compelling CV that showcases your professional journey
          </Text>
        </Stack>

        <Stack gap={6}>
          <Text fontSize="md" color="gray.700" fontWeight="semibold">
            In this guided process, we'll help you:
          </Text>
          <Flex gap={8} align="center">
            <Stack gap={3} flex={1}>
              <Flex align="center" gap={3}>
                <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                <Text fontSize="md" color="gray.600">Highlight your key skills and expertise</Text>
              </Flex>
              <Flex align="center" gap={3}>
                <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                <Text fontSize="md" color="gray.600">Showcase your professional experience</Text>
              </Flex>
              <Flex align="center" gap={3}>
                <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                <Text fontSize="md" color="gray.600">Present your achievements and qualifications</Text>
              </Flex>
            </Stack>
            <Image
              src={introFormImage}
              alt="CV Creation Illustration"
              borderRadius="xl"
              maxH="140px"
              objectFit="contain"
              flex="0 0 auto"
            />
          </Flex>
        </Stack>
      </Stack>

      <Flex justify="center" mt={6}>
        <BaseButton 
          colorPalette="blue" 
          size="lg" 
          onClick={nextStep}
        >
          Start Creating My CV
        </BaseButton>
      </Flex>
    </Box>
  );
};

export default StepIntro;
