import { Stack, Text } from "@chakra-ui/react";

const PreferencesHeader = () => {
  return (
    <Stack gap={6}>
      <Text fontSize="2xl" fontWeight="bold" color="purple.600">
        CV Preferences
      </Text>
      <Text color="gray.600" fontSize="md">
        Help us customize your CV to match your goals and preferences
      </Text>
    </Stack>
  );
};

export default PreferencesHeader; 