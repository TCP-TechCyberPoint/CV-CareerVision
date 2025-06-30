import { Box, Heading } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface SkillsSelectionCardProps {
  title: string;
  children: ReactNode;
}

const SkillsSelectionCard = ({ title, children }: SkillsSelectionCardProps) => {
  return (
    <Box p={{ base: 4, sm: 6, md: 8, lg: 10 }} w="full" borderRadius="2xl">
      <Heading size={{ base: "sm", sm: "md", md: "lg" }} mb={{ base: 4, sm: 6, md: 8 }} color="white">
        {title}
      </Heading>
      {children}
    </Box>
  );
};

export default SkillsSelectionCard;
