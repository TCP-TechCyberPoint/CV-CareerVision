import {
  Box,
  Flex,
  Text,
  Stack,
  HStack,
  Icon,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import BaseButton from "../ui/BaseButton";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { open: isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <Box bg="gray.800" px={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir="row-reverse"
      >
        {/* Desktop Links */}
        <HStack
          gap={8}
          alignItems="center"
          display={{ base: "none", md: "flex" }}
          flexDir={"row-reverse"}
        >
          <BaseButton variant="ghost" color="white" onClick={() => navigate("/edit-profile")}>
            Profile
          </BaseButton>
          <BaseButton variant="ghost" color="white" onClick={() => navigate("/")}  >
            Home
          </BaseButton>
          <BaseButton variant="ghost" color="white" onClick={() => navigate("/about")}>
            About
          </BaseButton>
        </HStack>

        {/* Logo */}
        <Text fontSize="xl" color="white" fontWeight="bold">
          Career Vision
        </Text>

        {/* Hamburger Menu for Mobile */}
        <IconButton
          size="md"
          _icon={{ w: 5, h: 5 }}
          aria-label="Toggle Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        >
          <Icon as={isOpen ? HiX : HiMenu} />
        </IconButton>
      </Flex>

      {/* Mobile Links */}
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack spaceY={4} alignItems="flex-end">

            <BaseButton variant="ghost" color="white" onClick={() => navigate("/edit-profile")} >
              Profile
            </BaseButton>
            <BaseButton variant="ghost" color="white" onClick={() => navigate("/")} >
              Home
            </BaseButton>
            <BaseButton variant="ghost" color="white" onClick={() => navigate("/about")}>
              About
            </BaseButton>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
