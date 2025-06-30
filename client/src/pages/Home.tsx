import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { FiBriefcase, FiTrendingUp, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import type { IconType } from "react-icons/lib";
import { useCvData } from "@/features/slideshow-form/hooks/useCvData";
import Navbar from "@/ui/Navbar";

const Feature = ({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: IconType;
}) => {
  return (
    <Stack
      align="center"
      textAlign="center"
      p={{ base: 3, md: 6 }}
      bg={useColorModeValue("white", "gray.800")}
      rounded="xl"
      shadow="lg"
      gap={{ base: 2, md: 4 }}
    >
      <Icon as={icon} w={{ base: 6, md: 10 }} h={{ base: 6, md: 10 }} color="blue.500" />
      <Heading size={{ base: "xs", md: "md" }}>{title}</Heading>
      <Text 
        color={useColorModeValue("gray.600", "gray.400")}
        fontSize={{ base: "sm", md: "md" }}
        display={{ base: "none", md: "block" }}
      >
        {text}
      </Text>
    </Stack>
  );
};

const Home = () => {
  const navigate = useNavigate();
  useCvData();

  return (
    <Box minH="100vh">
      <Navbar />
      <Box as="main">
        
        {/* Hero Section */}
        <Box bg={useColorModeValue("gray.50", "gray.900")} py={{ base: 8, md: 10 }}>
          <Container maxW={{ base: "container.sm", md: "container.md", lg: "container.xl" }} px={{ base: 4, md: 6 }}>
            <Stack align="center" textAlign="center" gap={{ base: 6, md: 8 }}>
              <Heading
                fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight="bold"
                px={{ base: 2, md: 0 }}
              >
                Your Career Journey
                <Text as="span" color="blue.500">
                  {" "}
                  Starts Here
                </Text>
              </Heading>
       
              <Stack 
                direction="row" 
                gap={{ base: 3, md: 4 }}
                align="center"
                justify="center"
                flexWrap="wrap"
              >
                <Button
                  size={{ base: "md", md: "lg" }}
                  colorScheme="blue"
                  px={{ base: 6, sm: 8, md: 10 }}
                  fontSize={{ base: "sm", md: "md" }}
                  borderLeftRadius="full"
                  borderRightRadius="lg"
                  bgColor="blue.700"
                  color="white"
                  onClick={() => navigate("/create-cv")}
                  minW={{ base: "120px", sm: "180px", md: "240px" }}
                >
                  Get Started
                </Button>
                <Button
                  size={{ base: "sm", md: "lg" }}
                  colorScheme="blue"
                  px={{ base: 6, sm: 8, md: 10 }}
                  fontSize={{ base: "sm", md: "md" }}
                  borderLeftRadius="lg"
                  borderRightRadius="full"
                  bgColor="blue.700"
                  color="white"
                  onClick={() => navigate("/dashboard")}
                  minW={{ base: "120px", sm: "180px", md: "200px" }}
                >
                  Dashboard
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Box>

        {/* Features Section */}
        <Box py={{ base: 12, md: 20 }}>
          <Container maxW={{ base: "container.sm", md: "container.md", lg: "container.xl" }} px={{ base: 4, md: 6 }}>
            <Stack gap={{ base: 8, md: 12 }}>
              <Stack align="center" textAlign="center" gap={{ base: 3, md: 4 }}>
                <Heading 
                  fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }}
                  fontWeight="bold"
                  color="whiteAlpha.900"
                  px={{ base: 2, md: 0 }}
                >
                  Why Choose Us
                </Heading>
                <Text 
                  color="whiteAlpha.900" 
                  maxW={{ base: "full", md: "2xl" }}
                  fontSize={{ base: "sm", md: "md" }}
                  px={{ base: 2, md: 0 }}
                >
                  We provide the tools and insights you need to navigate your
                  career path effectively and achieve your professional goals.
                </Text>
              </Stack>

              <SimpleGrid 
                columns={{ base: 3, md: 3 }} 
                gap={{ base: 3, md: 10 }}
                px={{ base: 2, md: 0 }}
              >
                <Feature
                  icon={FiBriefcase}
                  title="Career Tracking"
                  text="Monitor your professional journey and track your achievements over time."
                />
                <Feature
                  icon={FiTrendingUp}
                  title="Growth Analytics"
                  text="Get insights into your career progression with detailed analytics."
                />
                <Feature
                  icon={FiUsers}
                  title="Community Support"
                  text="Connect with like-minded professionals and share experience."
                />
              </SimpleGrid>
            </Stack>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
