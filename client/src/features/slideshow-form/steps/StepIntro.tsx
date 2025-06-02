import BaseButton from "@/components/ui/BaseButton";
import { Box, Heading, Text, Image, Flex, Stack } from "@chakra-ui/react";
import introFormImage from "@/assets/images/intro-form.png";
import ReturnDashboard from "../components/ReturnDashboard";

const StepIntro = ({ nextStep }: { nextStep: () => void }) => {
  return (
    <Box
      mt={24}
      mx="auto"
      maxW="800px"
      p={10}
      borderRadius="2xl"
      boxShadow="2xl"
      bg="white"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minH="600px"
      position="relative"
    >
      <Box position="absolute" top={4} left={4}>
        <ReturnDashboard />
      </Box>

      <Stack gap={8} mt={12}>
        <Stack gap={4}>
          <Heading size="2xl" color="blue.600">
            Create Your Professional CV
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Let's build a compelling CV that showcases your professional journey
          </Text>
        </Stack>

        <Stack gap={6}>
          <Text fontSize="lg">
            In this guided process, we'll help you:
          </Text>
          <Stack gap={4}>
            <Flex align="center" gap={3}>
              <Box w={2} h={2} bg="blue.500" borderRadius="full" />
              <Text>Highlight your key skills and expertise</Text>
            </Flex>
            <Flex align="center" gap={3}>
              <Box w={2} h={2} bg="blue.500" borderRadius="full" />
              <Text>Showcase your professional experience</Text>
            </Flex>
            <Flex align="center" gap={3}>
              <Box w={2} h={2} bg="blue.500" borderRadius="full" />
              <Text>Present your achievements and qualifications</Text>
            </Flex>
          </Stack>
        </Stack>

        <Image
          src={introFormImage}
          alt="CV Creation Illustration"
          borderRadius="lg"
          maxH="250px"
          objectFit="contain"
          mt={4}
          
        />
      </Stack>

      <Flex justify="flex-end" mt={8}>
        <BaseButton colorPalette="blue" size="lg" onClick={nextStep}>
          Start Creating My CV
        </BaseButton>
      </Flex>
    </Box>
  );
};

export default StepIntro;
