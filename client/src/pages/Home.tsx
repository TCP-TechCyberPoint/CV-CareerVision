import Navbar from "@/components/layout/Navbar";
import SlideshowForm from "@/features/slideshow-form/SlideshowForm";
import {  Container} from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <Navbar />
      <Container>
        <SlideshowForm />
      </Container>
    </>
  );
};

export default Home;
