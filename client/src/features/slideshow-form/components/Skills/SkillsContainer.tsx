import { Box, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import ReturnDashboard from "@slideshow-form/components/ReturnDashboard"; 

const MotionBox = motion.create(Box);

interface SkillsContainerProps {
  subtitle: string;
  children: ReactNode;
}

const SkillsContainer = ({
  subtitle,
  children,
}: SkillsContainerProps) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      mt={{ base: 10, sm: 12, md: 14, lg: 16 }}
      mx="auto"
      maxW={{ base: "100%", md: "75%" }}
      p={{ base: 4, sm: 6, md: 8, lg: 10 }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minH={{ base: "auto", md: "500px" }}
      position="relative"
    >
      <Box position="relative" top={{ base: 2, sm: 3, md: 4 }} left={{ base: 2, sm: 3, md: 4 }}>
        <ReturnDashboard />
      </Box>

      <VStack gap={{ base: 4, sm: 6, md: 8, lg: 10 }} align="flex" w="full" mt={{ base: 8, sm: 10, md: 12, lg: 14 }}>
        <Box textAlign="center" w="full">
          <Text fontSize={{ base: "md", sm: "lg", md: "xl" }} color="white" mt={2}>
            {subtitle}
          </Text>
        </Box>

        {children}
      </VStack>
    </MotionBox>
  );
};

export default SkillsContainer;
