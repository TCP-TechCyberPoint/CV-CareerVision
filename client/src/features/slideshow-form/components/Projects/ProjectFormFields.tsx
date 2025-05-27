import {
  Input,
  Textarea,
  HStack,
  VStack,
  Text,
  Box,
  Wrap,
  IconButton,
} from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import type {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import type { Project } from "../../types/projects.type";
import { Tag } from "@chakra-ui/react";
import { MdOutlineCancel } from "react-icons/md";

interface ProjectFormFieldsProps {
  index: number;
  register: UseFormRegister<{ projects: Project[] }>;
  errors: FieldErrors<{ projects: Project[] }>;
  setValue: UseFormSetValue<{ projects: Project[] }>;
  watchedProjects: Project[];
}

const ProjectFormFields = ({
  index,
  register,
  errors,
  setValue,
  watchedProjects,
}: ProjectFormFieldsProps) => {
  const [techInput, setTechInput] = useState("");
  const currentProject = watchedProjects?.[index];
  const projectTech = currentProject?.projectTech || [];

  const addTech = () => {
    if (techInput.trim() && !projectTech.includes(techInput.trim())) {
      const newTech = [...projectTech, techInput.trim()];
      setValue(`projects.${index}.projectTech`, newTech);
      setTechInput("");
    }
  };

  const removeTech = (techToRemove: string) => {
    const newTech = projectTech.filter((tech) => tech !== techToRemove);
    setValue(`projects.${index}.projectTech`, newTech);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTech();
    }
  };

  return (
    <VStack gap={4} align="stretch">
      {/* Project Name and Project Link */}
      <HStack gap={4}>
        <Field.Root invalid={!!errors.projects?.[index]?.projectName} flex={1}>
          <Field.Label fontWeight="medium" color="gray.700">
            Project Name
          </Field.Label>
          <Input
            {...register(`projects.${index}.projectName`)}
            placeholder="My Awesome Project"
            size="lg"
            borderRadius="md"
            bg="white"
            _focus={{
              borderColor: "blue.400",
              boxShadow: "0 0 0 1px blue.400",
            }}
          />
          <Field.ErrorText>
            {errors.projects?.[index]?.projectName?.message}
          </Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.projects?.[index]?.projectLink} flex={1}>
          <Field.Label fontWeight="medium" color="gray.700">
            Project Link
          </Field.Label>
          <Input
            {...register(`projects.${index}.projectLink`)}
            placeholder="https://github.com/username/project"
            size="lg"
            borderRadius="md"
            bg="white"
            _focus={{
              borderColor: "blue.400",
              boxShadow: "0 0 0 1px blue.400",
            }}
          />
          <Field.ErrorText>
            {errors.projects?.[index]?.projectLink?.message}
          </Field.ErrorText>
        </Field.Root>
      </HStack>

      {/* Description */}
      <Field.Root invalid={!!errors.projects?.[index]?.description}>
        <Field.Label fontWeight="medium" color="gray.700">
          Description
        </Field.Label>
        <Textarea
          {...register(`projects.${index}.description`)}
          placeholder="Describe your project, what it does, and what technologies you used..."
          size="lg"
          borderRadius="md"
          bg="white"
          rows={3}
          _focus={{
            borderColor: "blue.400",
            boxShadow: "0 0 0 1px blue.400",
          }}
        />
        <Field.ErrorText>
          {errors.projects?.[index]?.description?.message}
        </Field.ErrorText>
      </Field.Root>

      {/* Project Tech Tags */}
      <Field.Root invalid={!!errors.projects?.[index]?.projectTech}>
        <Field.Label fontWeight="medium" color="gray.700">
          Technologies Used
        </Field.Label>

        {/* Tech Input */}
        <HStack>
          <Input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add technology (e.g., React, Node.js, MongoDB)"
            size="lg"
            borderRadius="md"
            bg="white"
            _focus={{
              borderColor: "blue.400",
              boxShadow: "0 0 0 1px blue.400",
            }}
          />
          <IconButton
            onClick={addTech}
            colorScheme="blue"
            size="lg"
            aria-label="Add technology"
            disabled={!techInput.trim()}
          >
            <FiPlus />
          </IconButton>
        </HStack>

        {/* Display Tech Tags */}
        {projectTech.length > 0 && (
          <Box mt={3}>
            <Text fontSize="sm" color="gray.600" mb={2}>
              Selected Technologies:
            </Text>
            <Wrap gap={2}>
              {projectTech.map((tech, techIndex) => (
                <Tag.Root
                  key={techIndex}
                  size="lg"
                  colorPalette="blue"
                  borderRadius="1xl"
                  variant="solid"
                >
                  <Tag.Label>{tech}</Tag.Label>

                  <Tag.EndElement>
                    <MdOutlineCancel
                      onClick={() => removeTech(tech)}
                      aria-label={`Remove ${tech}`}
                    />
                  </Tag.EndElement>
                </Tag.Root>
              ))}
            </Wrap>
          </Box>
        )}

        <Field.ErrorText>
          {errors.projects?.[index]?.projectTech?.message}
        </Field.ErrorText>
      </Field.Root>

      {/* Hidden input for projectTech to register with react-hook-form */}
      <input
        type="hidden"
        {...register(`projects.${index}.projectTech`)}
        value={JSON.stringify(projectTech)}
      />
    </VStack>
  );
};

export default ProjectFormFields;
