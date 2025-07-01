import { Box, VStack, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

import { AiLoader } from "@/ui";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatSession = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI Career Assistant. How can I help you with your career journey today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const overlayBg = useColorModeValue("rgba(255, 255, 255, 0.9)", "rgba(26, 32, 44, 0.9)");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("white", "gray.800");

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    // TODO: Add AI response logic here
    // For now, just add a placeholder response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand your message. This is where the AI response will be implemented.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2500);
  };

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      shadow="lg"
      overflow="hidden"
      h="600px"
      display="flex"
      flexDirection="column"
      position="relative"
    >
      {/* Loading Overlay */}
      {isLoading && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg={overlayBg}
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          pt="20px"
          zIndex="10"
        >
          <AiLoader size="3em" />
        </Box>
      )}

      {/* Messages Area */}
      <Flex flex="1" overflow="hidden">
        <VStack 
          flex="1" 
          overflowY="auto" 
          p={4} 
          gap={4}
          align="stretch"
        >
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </VStack>
      </Flex>

      {/* Input Area */}
      <Box p={4} borderTop="1px" borderColor={borderColor}>
        <ChatInput onSendMessage={handleSendMessage} />
      </Box>
    </Box>
  );
};

export default ChatSession; 