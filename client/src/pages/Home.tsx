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
      p={6}
      bg={useColorModeValue("white", "gray.800")}
      rounded="xl"
      shadow="lg"
      gap={4}
    >
      <Icon as={icon} w={10} h={10} color="blue.500" />
      <Heading size="md">{title}</Heading>
      <Text color={useColorModeValue("gray.600", "gray.400")}>{text}</Text>
    </Stack>
  );
};

const Home = () => {
  const navigate = useNavigate();
useCvData();

  return (
    <Box>
      
      {/* Hero Section */}
      <Box bg={useColorModeValue("gray.50", "gray.900")} py={20}>
        <Container maxW="container.xl">
          <Stack align="center" textAlign="center" gap={8}>
            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
            >
              Your Career Journey
              <Text as="span" color="blue.500">
                {" "}
                Starts Here
              </Text>
            </Heading>
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              color="gray.600"
              maxW="2xl"
            >
              Track your professional growth, set career goals, and visualize
              your path to success. Start your journey towards a fulfilling
              career today.
            </Text>
            <Stack direction={{ base: "column", md: "row" }} gap={4}>
              <Button
                size="lg"
                colorScheme="blue"
                px={8}
                fontSize="md"
                rounded="full"
                onClick={() => navigate("/create-cv")}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                colorScheme="blue"
                variant="outline"
                px={8}
                fontSize="md"
                rounded="full"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20}>
        <Container maxW="container.xl">
          <Stack gap={12}>
            <Stack align="center" textAlign="center" gap={4}>
              <Heading>Why Choose Us</Heading>
              <Text color="gray.600" maxW="2xl">
                We provide the tools and insights you need to navigate your
                career path effectively and achieve your professional goals.
              </Text>
            </Stack>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>
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

      {/* CTA Section */}
      <Box bg={useColorModeValue("blue.50", "blue.900")} py={20}>
        <Container maxW="container.xl">
          <Stack align="center" textAlign="center" gap={8}>
            <Heading>Ready to Start Your Journey?</Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl">
              Join thousands of professionals who are already tracking their
              career growth and achieving their goals.
            </Text>
            <Button
              size="lg"
              colorScheme="blue"
              px={8}
              fontSize="md"
              rounded="full"
              onClick={() => navigate("/create-cv")}
            >
              Sign Up Now
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
