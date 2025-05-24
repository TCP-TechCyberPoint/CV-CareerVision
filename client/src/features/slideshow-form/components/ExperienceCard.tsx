import { IconButton, Separator } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";
import type {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import type { FieldArrayWithId } from "react-hook-form";
import type { ExperienceFormData } from "../schemas/experienceSchema";
import type { Experience } from "../types/experience.type";
import ExperienceFormFields from "./ExperienceFormFields";

const MotionBox = motion.create("div");

interface ExperienceCardProps {
  field: FieldArrayWithId<ExperienceFormData, "experiences", "id">;
  index: number;
  totalFields: number;
  register: UseFormRegister<ExperienceFormData>;
  errors: FieldErrors<ExperienceFormData>;
  setValue: UseFormSetValue<ExperienceFormData>;
  watchedExperiences: Experience[];
  onRemove: (index: number) => void;
}

const ExperienceCard = ({
  field,
  index,
  totalFields,
  register,
  errors,
  setValue,
  watchedExperiences,
  onRemove,
}: ExperienceCardProps) => {
  return (
    <MotionBox
      key={field.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      style={{
        padding: "1.5rem",
        borderRadius: "0.5rem",
        borderWidth: "2px",
        borderColor: "var(--chakra-colors-purple-100)",
        backgroundColor: "var(--chakra-colors-purple-50)",
        position: "relative",
      }}
    >
      {/* Remove Button (only show if more than 1 experience) */}
      {totalFields > 1 && (
        <IconButton
          position="absolute"
          _hover={{ background: "red.400" }}
          top={4}
          right={4}
          zIndex={10}
          size="sm"
          rounded="full"
          variant="ghost"
          colorScheme="red"
          onClick={() => onRemove(index)}
          aria-label="Remove experience"
        >
          <FiTrash2 />
        </IconButton>
      )}

      <ExperienceFormFields
        index={index}
        register={register}
        errors={errors}
        setValue={setValue}
        watchedExperiences={watchedExperiences}
      />

      {/* Separator between experiences */}
      {index < totalFields - 1 && <Separator mt={6} borderColor="purple.200" />}
    </MotionBox>
  );
};

export default ExperienceCard;
