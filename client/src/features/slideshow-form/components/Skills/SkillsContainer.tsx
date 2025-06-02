import { Box, Text, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import ReturnDashboard from "../ReturnDashboard";

const MotionBox = motion.create(Box);

interface SkillsContainerProps {
  subtitle: string;
  children: ReactNode;
}

const SkillsContainer = ({
  subtitle,
  children,
}: SkillsContainerProps) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      mt={24}
      mx="auto"
      maxW="900px"
      p={10}
      borderRadius="3xl"
      boxShadow="2xl"
      bg={bgColor}
      border="1px solid"
      borderColor={borderColor}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minH="600px"
      position="relative"
    >
      <Box position="absolute" top={4} left={4}>
        <ReturnDashboard />
      </Box>

      <VStack gap={8} align="flex" w="full" mt={12}>
        <Box textAlign="center" w="full">
          <Text fontSize="lg" color="gray.500" mt={2}>
            {subtitle}
          </Text>
        </Box>

        {children}
      </VStack>
    </MotionBox>
  );
};

export default SkillsContainer;
