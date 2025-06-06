import { Box, HStack } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import BaseButton from "@/components/ui/BaseButton";

interface AddExperienceButtonProps {
  onAdd: () => void;
  text?: string;
}

const AddExperienceButton = ({ 
  onAdd, 
  text = "Add New Experience" 
}: AddExperienceButtonProps) => {
  return (
    <Box textAlign="center">
      <HStack justify="center">
        <FiPlus />
        <BaseButton
          onClick={onAdd}
          variant="outline"
          colorScheme="purple"
          size="lg"
        >
          {text}
        </BaseButton>
      </HStack>
    </Box>
  );
};

export default AddExperienceButton; 