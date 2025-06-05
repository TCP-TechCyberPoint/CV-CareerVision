import { Box, Heading } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import type { ReactNode } from "react";

interface SkillsSelectionCardProps {
  title: string;
  children: ReactNode;
}

const SkillsSelectionCard = ({ title, children }: SkillsSelectionCardProps) => {
  const cardBg = useColorModeValue("gray.50", "gray.700");

  return (
    <Box p={6} w="full" bg={cardBg} borderRadius="2xl">
      <Heading size="md" mb={6} color="gray.600">
        {title}
      </Heading>
      {children}
    </Box>
  );
};

export default SkillsSelectionCard;
