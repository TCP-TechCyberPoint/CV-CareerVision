import { IconButton, Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";
import type {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  FieldArrayWithId,
} from "react-hook-form";
import type { Experience } from "@slideshow-form/types";
import type { ExperienceFormData } from "../../schemas/experienceSchema";
import ExperienceFormFields from "./ExperienceFormFields";

const MotionBox = motion.create(Box);

interface ExperienceStepFormProps {
  field: FieldArrayWithId<ExperienceFormData, "experience", "id">;
  index: number;
  totalFields: number;
  register: UseFormRegister<ExperienceFormData>;
  errors: FieldErrors<ExperienceFormData>;
  setValue: UseFormSetValue<ExperienceFormData>;
  watchedExperiences: Experience[];
  onRemove: (index: number) => void;
}

const ExperienceStepForm = ({
  field,
  index,
  totalFields,
  register,
  errors,
  setValue,
  watchedExperiences,
  onRemove,
}: ExperienceStepFormProps) => {
  return (
    <MotionBox
      key={field.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      p={6}
      borderRadius="lg"
      borderWidth="2px"
      borderColor="purple.100"
      bg="purple.50"
      position="relative"
      mb={4}
    >
      {/* Experience number */}
      <Text
        position="absolute"
        top={2}
        left={4}
        fontSize="sm"
        fontWeight="bold"
        color="purple.600"
      >
        Experience #{index + 1}
      </Text>

      {/* Remove Button (only show if more than 1 experience) */}
      {totalFields > 1 && (
        <IconButton
          position="absolute"
          top={2}
          right={2}
          size="sm"
          variant="ghost"
          colorScheme="red"
          _hover={{ bg: "red.100" }}
          onClick={() => onRemove(index)}
          aria-label="Remove experience"
        >
          <FiTrash2 />
        </IconButton>
      )}

      <Box mt={8}>
        <ExperienceFormFields
          index={index}
          register={register}
          errors={errors}
          setValue={setValue}
          watchedExperiences={watchedExperiences}
        />
      </Box>
    </MotionBox>
  );
};

export default ExperienceStepForm;
