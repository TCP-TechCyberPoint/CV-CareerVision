import { Box, Container, Heading, Input, Text } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import BaseButton from "@/components/ui/BaseButton";
import { useAuth0Integration } from "@/hooks/useAuth0Integration";

const EditProfilePage: React.FC = () => {
  const { user } = useAuth0Integration();

  return (
    <>
      <Container maxW="container.md" py={12} mx={"auto"} w={"5/12"}>
        <Box mb={8} textAlign="center">
          <Heading size="xl" mb={2}>
            Edit Profile
          </Heading>
          <Text color="gray.500">Update your personal information</Text>
        </Box>
        <Box
          p={8}
          borderRadius="xl"
          borderWidth="1px"
          bg="white"
          boxShadow="lg"
        >
          <FormControl mb={6}>
            <FormLabel fontWeight="medium">Full Name</FormLabel>
            <Input
              size="lg"
              placeholder="Enter your full name"
              defaultValue={user?.name}
              _focus={{
                borderColor: "blue.400",
                boxShadow: "0 0 0 1px blue.400",
              }}
            />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel fontWeight="medium">Email</FormLabel>
            <Input
              defaultValue={user?.email}
              type="email"
              size="lg"
              placeholder="Enter your email"
              _focus={{
                borderColor: "blue.400",
                boxShadow: "0 0 0 1px blue.400",
              }}
            />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel fontWeight="medium">Bio</FormLabel>
            <Input
              as="textarea"
              size="lg"
              placeholder="Tell us about yourself"
              minH="120px"
              _focus={{
                borderColor: "blue.400",
                boxShadow: "0 0 0 1px blue.400",
              }}
            />
          </FormControl>
          <Box display="flex" justifyContent="flex-end">
            <BaseButton
              colorScheme="blue"
              variant="outline"
              color="blue.500"
              size="lg"
              minW="120px"
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
              transition="all 0.2s"
            >
              Save Changes
            </BaseButton>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default EditProfilePage;
