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

import BaseButton from "../ui/BaseButton";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { open: isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.800" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
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

        {/* Desktop Links */}
        <HStack
          gap={8}
          alignItems="center"
          display={{ base: "none", md: "flex" }}
        >
          <BaseButton variant="ghost" color="white">
            Home
          </BaseButton>
          <BaseButton variant="ghost" color="white">
            About
          </BaseButton>
          <BaseButton variant="ghost" color="white">
            Contact
          </BaseButton>
        </HStack>
      </Flex>

      {/* Mobile Links */}
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack spaceY={4}>
            <BaseButton variant="ghost" color="white">
              Home
            </BaseButton>
            <BaseButton variant="ghost" color="white">
              About
            </BaseButton>
            <BaseButton variant="ghost" color="white">
              Contact
            </BaseButton>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
