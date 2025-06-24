import { Container, Text, Box } from "@chakra-ui/react";
import Navbar from "./Navbar";

const About = () => {
  return (
    <Box minH="100vh">
      <Navbar />
      <Box as="main">
        <Container>
          <Text>About</Text>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
