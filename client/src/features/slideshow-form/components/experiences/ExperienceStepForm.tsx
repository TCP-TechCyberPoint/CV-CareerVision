import { IconButton, Separator } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";
import type {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type { FieldArrayWithId } from "react-hook-form";
import type { Experience } from "@slideshow-form/types";
import ExperienceFormFields from "./ExperienceFormFields";
import { BaseCard } from "@slideshow-form/components/cards";

const MotionBaseCard = motion.create(BaseCard);

interface ExperienceStepFormProps {
  field: FieldArrayWithId<{ experiences: Experience[] }, "experiences", "id">;
  index: number;
  totalFields: number;
  register: UseFormRegister<{ experiences: Experience[] }>;
  errors: FieldErrors<{ experiences: Experience[] }>;
  setValue: UseFormSetValue<{ experiences: Experience[] }>;
  watch: UseFormWatch<{ experiences: Experience[] }>;
  onRemove: (index: number) => void;
}

const ExperienceStepForm = ({
  field,
  index,
  totalFields,
  register,
  errors,
  setValue,
  watch,
  onRemove,
}: ExperienceStepFormProps) => {
  return (
    <MotionBaseCard
      key={field.id}
      variant="form"
      themeColor="green"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
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
        watch={watch}
      />

      {/* Separator between experiences */}
      {index < totalFields - 1 && <Separator mt={6} borderColor="green.200" />}
    </MotionBaseCard>
  );
};

export default ExperienceStepForm; 