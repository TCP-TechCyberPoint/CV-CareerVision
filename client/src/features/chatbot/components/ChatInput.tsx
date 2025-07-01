import { Input, Button, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { useState } from "react";
import type { KeyboardEvent } from "react";
import { FiSend } from "react-icons/fi";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Flex gap={3}>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        bg={useColorModeValue("white", "gray.700")}
        borderColor={useColorModeValue("gray.300", "gray.600")}
        _focus={{
          borderColor: "blue.500",
          boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
        }}
        flex="1"
      />
      <Button
        colorScheme="blue"
        onClick={handleSend}
        disabled={!message.trim()}
        px={6}
      >
        <FiSend />
      </Button>
    </Flex>
  );
};

export default ChatInput