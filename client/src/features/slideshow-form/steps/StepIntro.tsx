import BaseButton from "@/components/ui/BaseButton";
import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
import { useSlideshowForm } from "../store/useSlideshowForm";




const StepIntro = () => {
  const  nextStep  = useSlideshowForm().nextStep;
  return (
    <Box
      mt={24}
      mx="auto"
      maxW="600px"
      p={10}
      borderRadius="2xl"
      boxShadow="2xl"
      bg="white"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minH="500px"
    >
      <Flex direction="column" align="flex-start" gap={6}>
        <Heading size="xl">Welcome to the Health Form</Heading>
        <Text fontSize="md" color="gray.600">
          This quick and simple slideshow will guide you through a few short steps.
          It helps us understand your basic profile so we can tailor your experience.
        </Text>
        <Image
          src="/intro-illustration.svg"
          alt="Intro Illustration"
          borderRadius="lg"
          maxH="200px"
          objectFit="cover"
          mt={4}
        />
      </Flex>

      <Flex justify="flex-end" mt={8}>
        <BaseButton colorPalette="blue" size="lg" onClick={nextStep}>
          Get Started
        </BaseButton>
      </Flex>
    </Box>
  );
};

export default StepIntro;
