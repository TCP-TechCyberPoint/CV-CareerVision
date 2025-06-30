import BaseButton from "@/ui/BaseButton";
import { Box, Heading, Text, Image, Flex, Stack } from "@chakra-ui/react";
import introFormImage from "@/assets/images/intro-form.png";
import ReturnDashboard from "../components/ReturnDashboard";

const StepIntro = ({ nextStep }: { nextStep: () => void }) => {
  return (
    <Box
      mt={{ base: 10, sm: 12, md: 14, lg: 16 }}
      mx="auto"
      maxW={{ base: "100%", md: "75%" }}
      p={{ base: 4, sm: 6, md: 8, lg: 10 }}
      position="relative"
    >
      <Box position="relative" top={{ base: 2, sm: 3, md: 4 }} left={{ base: 2, sm: 3, md: 4 }}>
        <ReturnDashboard />
      </Box>

      <Stack mt={{ base: 8, sm: 10, md: 12, lg: 14 }} gap={{ base: 4, sm: 6, md: 8, lg: 10 }}>
        <Stack gap={{ base: 2, sm: 3, md: 4, lg: 5 }} textAlign="center">
          <Heading 
            size={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }} 
            color="blue.600" 
            fontWeight="bold"
            px={{ base: 2, sm: 3, md: 0 }}
          >
            Create Your Professional CV
          </Heading>
          <Text 
            fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }} 
            color="white" 
            maxW={{ base: "full", sm: "500px", md: "600px", lg: "700px" }} 
            mx="auto"
            px={{ base: 2, sm: 3, md: 0 }}
          >
            Let's build a compelling CV that showcases your professional journey
          </Text>
        </Stack>

        <Stack gap={{ base: 4, sm: 6, md: 8, lg: 10 }}>
          <Text 
            fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl" }} 
            color="white" 
            fontWeight="semibold"
            px={{ base: 2, sm: 3, md: 0 }}
          >
            In this guided process, we'll help you:
          </Text>
          <Flex 
            gap={{ base: 4, sm: 6, md: 12, lg: 16 }} 
            align="center"
            direction={{ base: "column", md: "row" }}
          >
            <Stack gap={{ base: 2, sm: 3, md: 4, lg: 5 }} flex={1} w="full">
              <Flex align="center" gap={3}>
                <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                <Text fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl" }} color="white">
                  Highlight your key skills and expertise
                </Text>
              </Flex>
              <Flex align="center" gap={3}>
                <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                <Text fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl" }} color="white">
                  Showcase your professional experience
                </Text>
              </Flex>
              <Flex align="center" gap={3}>
                <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                <Text fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl" }} color="white">
                  Present your achievements and qualifications
                </Text>
              </Flex>
            </Stack>
            <Image
              src={introFormImage}
              alt="CV Creation Illustration"
              borderRadius="xl"
              maxH={{ base: "100px", sm: "120px", md: "180px", lg: "220px" }}
              objectFit="contain"
              flex="0 0 auto"
            />
          </Flex>
        </Stack>
      </Stack>

      <Flex justify="center" mt={{ base: 4, sm: 6, md: 8, lg: 10 }}>
        <BaseButton 
          color="white"
          variant="solid"
          bg="blue.700"
          size={{ base: "md", sm: "lg", md: "lg", lg: "xl" }}
          onClick={nextStep}
          w={{ base: "full", sm: "auto" }}
          px={{ base: 6, sm: 8, md: 8, lg: 10 }}
        >
          Start Creating My CV
        </BaseButton>
      </Flex>
    </Box>
  );
};

export default StepIntro;
