import { Button, HStack, Icon } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

interface AddExperienceButtonProps {
  onAdd: () => void;
}

const AddExperienceButton = ({ onAdd }: AddExperienceButtonProps) => {
  return (
    <Button
      onClick={onAdd}
      variant="outline"
      colorScheme="green"
      size="lg"
      w="full"
      borderStyle="dashed"
      borderWidth="2px"
      py={6}
      _hover={{
        bg: "green.50",
        borderColor: "green.400",
        transform: "translateY(-2px)",
      }}
      transition="all 0.2s"
    >
      <HStack gap={2}>
        <Icon fontSize="lg">
          <FiPlus />
        </Icon>
        Add Another Experience
      </HStack>
    </Button>
  );
};

export default AddExperienceButton; 