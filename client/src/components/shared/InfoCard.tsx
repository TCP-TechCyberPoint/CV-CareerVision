import { Box, Card, Text, VStack } from "@chakra-ui/react";

interface InfoCardProps {
  title: string;
  icon: string;
  color: string;
  children: React.ReactNode;
}

const InfoCard = ({ 
  title, 
  icon, 
  color, 
  children 
}: InfoCardProps) => (
  <Box
    transform="translateY(0)"
    transition="all 0.3s ease"
    _hover={{
      transform: "translateY(-5px)",
      filter: `drop-shadow(0 10px 20px rgba(${
        color === 'blue' ? '59, 130, 246' : 
        color === 'green' ? '34, 197, 94' : 
        '147, 51, 234'
      }, 0.1))`,
    }}
  >
    <Card.Root
      bg="white"
      borderRadius="lg"
      boxShadow="lg"
      p={4}
      border="1px solid"
      borderColor={`${color}.100`}
      _hover={{
        borderColor: `${color}.200`,
        boxShadow: "xl",
      }}
      transition="all 0.3s ease"
    >
      <Card.Header pb={2}>
        <Text fontSize="lg" fontWeight="semibold" color={`${color}.600`}>
          {icon} {title}
        </Text>
      </Card.Header>
      <Card.Body>
        <VStack gap={3} align="stretch">
          {children}
        </VStack>
      </Card.Body>
    </Card.Root>
  </Box>
);

export default InfoCard; 