import { Box, Text, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { FiUser, FiCpu } from "react-icons/fi";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.isUser;

  // Move all hooks to the top level
  const userBgColor = useColorModeValue("blue.500", "blue.600");
  const aiBgColor = useColorModeValue("gray.100", "gray.700");
  const aiTextColor = useColorModeValue("gray.800", "white");
  const timestampColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Flex justify={isUser ? "flex-end" : "flex-start"} gap={3}>
      {!isUser && (
        <Box
          w="32px"
          h="32px"
          bg="blue.500"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <FiCpu color="white" size="16px" />
        </Box>
      )}

      <Box
        maxW="70%"
        bg={isUser ? userBgColor : aiBgColor}
        color={isUser ? "white" : aiTextColor}
        px={4}
        py={3}
        borderRadius="lg"
        position="relative"
      >
        <Text fontSize="sm" lineHeight="1.4">
          {message.content}
        </Text>

        <Text
          fontSize="xs"
          color={isUser ? "whiteAlpha.700" : timestampColor}
          mt={2}
          textAlign="right"
        >
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Text>
      </Box>

      {isUser && (
        <Box
          w="32px"
          h="32px"
          bg="gray.500"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <FiUser color="white" size="16px" />
        </Box>
      )}
    </Flex>
  );
};

export default ChatMessage; 