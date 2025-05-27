import { Box, HStack } from "@chakra-ui/react";
import BaseButton from "@/components/ui/BaseButton";
import { FiPlus } from "react-icons/fi";

interface AddProjectButtonProps {
  onAdd: () => void;
  text?: string;
}

const AddProjectButton = ({ 
  onAdd, 
  text = "Add New Project" 
}: AddProjectButtonProps) => {
  return (
    <Box textAlign="center">
      <HStack justify="center">
        <FiPlus />
        <BaseButton
          onClick={onAdd}
          variant="outline"
          colorScheme="blue"
          size="lg"
        >
          {text}
        </BaseButton>
      </HStack>
    </Box>
  );
};

export default AddProjectButton; 