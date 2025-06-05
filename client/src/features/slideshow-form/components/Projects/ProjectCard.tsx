import { IconButton, Separator } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";
import type {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import type { FieldArrayWithId } from "react-hook-form";
import type { Project } from "../../types/projects.types";
import ProjectFormFields from "./ProjectFormFields";

const MotionBox = motion.create("div");

interface ProjectCardProps {
  field: FieldArrayWithId<{ projects: Project[] }, "projects", "id">;
  index: number;
  totalFields: number;
  register: UseFormRegister<{ projects: Project[] }>;
  errors: FieldErrors<{ projects: Project[] }>;
  setValue: UseFormSetValue<{ projects: Project[] }>;
  watchedProjects: Project[];
  onRemove: (index: number) => void;
}

const ProjectCard = ({
  field,
  index,
  totalFields,
  register,
  errors,
  setValue,
  watchedProjects,
  onRemove,
}: ProjectCardProps) => {
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
        borderColor: "var(--chakra-colors-blue-100)",
        backgroundColor: "var(--chakra-colors-blue-50)",
        position: "relative",
      }}
    >
      {/* Remove Button (only show if more than 1 project) */}
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
          aria-label="Remove project"
        >
          <FiTrash2 />
        </IconButton>
      )}

      <ProjectFormFields
        index={index}
        register={register}
        errors={errors}
        setValue={setValue}
        watchedProjects={watchedProjects}
      />

      {/* Separator between projects */}
      {index < totalFields - 1 && <Separator mt={6} borderColor="blue.200" />}
    </MotionBox>
  );
};

export default ProjectCard; 