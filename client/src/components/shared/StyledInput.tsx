import { Input } from "@chakra-ui/react";
import type { InputProps } from "@chakra-ui/react";

interface StyledInputProps extends InputProps {
  hoverColor: string;
  focusColor: string;
}

const StyledInput = ({
  hoverColor,
  focusColor,
  ...props
}: StyledInputProps) => (
  <Input
    size="md"
    borderRadius="md"
    bg="gray.50"
    border="2px solid"
    borderColor="gray.200"
    _hover={{ borderColor: `${hoverColor}.300` }}
    _focus={{
      borderColor: `${focusColor}.400`,
      boxShadow: `0 0 0 2px rgba(${
        focusColor === "blue"
          ? "59, 130, 246"
          : focusColor === "green"
          ? "34, 197, 94"
          : "147, 51, 234"
      }, 0.1)`,
      bg: "white",
    }}
    transition="all 0.2s ease"
    {...props}
  />
);

export default StyledInput;
