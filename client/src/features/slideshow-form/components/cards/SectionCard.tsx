// src/components/cards/SectionCard.tsx

import { Box, Flex, Text, Badge } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { getCompletionColor } from "@/features/slideshow-form/utils/mockData";
import BaseCard from "./BaseCard";

interface SectionCardProps {
  title: string;
  icon: ReactNode;
  description?: string;
  onClick?: () => void;
  // Enhanced customization props
  completion?: number;
  themeColor?: string;
  customContent?: ReactNode;
  footer?: string;
  isBasic?: boolean; // For backward compatibility
}

const SectionCard = ({
  title,
  icon,
  description,
  onClick,
  completion,
  themeColor = "teal",
  customContent,
  footer,
  isBasic = false,
}: SectionCardProps) => {
  // Use basic layout for simple cards or when isBasic is true
  if (isBasic || (!completion && !customContent)) {
    return (
      <BaseCard
        variant="navigation"
        themeColor={themeColor}
        onClick={onClick}
      >
        <Flex align="center" gap={3} mb={2}>
          <Box
            fontSize="2xl"
            color={`${themeColor}.500`}
            _groupHover={{ color: `${themeColor}.600` }}
          >
            {icon}
          </Box>
          <Text fontSize="lg" fontWeight="semibold">
            {title}
          </Text>
        </Flex>
        {description && (
          <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }}>
            {description}
          </Text>
        )}
      </BaseCard>
    );
  }

  // Enhanced layout with custom content and completion
  return (
    <BaseCard
      variant="navigation"
      themeColor={themeColor}
      onClick={onClick}
    >
      {/* Header */}
      <Flex align="center" justify="space-between" mb={4}>
        <Flex align="center" gap={3}>
          <Box
            fontSize="2xl"
            color={`${themeColor}.500`}
            _groupHover={{ color: `${themeColor}.600` }}
          >
            {icon}
          </Box>
          <Text fontSize="lg" fontWeight="semibold">
            {title}
          </Text>
        </Flex>
        {completion !== undefined && (
          <Badge 
            colorPalette={getCompletionColor(completion)}
            variant="subtle"
            borderRadius="full"
          >
            {completion}%
          </Badge>
        )}
      </Flex>

      {/* Custom Content */}
      {customContent && (
        <Box mb={4}>
          {customContent}
        </Box>
      )}

      {/* Description (fallback if no custom content) */}
      {!customContent && description && (
        <Text 
          fontSize="sm" 
          color={{ base: "gray.600", _dark: "gray.400" }}
          mb={4}
        >
          {description}
        </Text>
      )}

      {/* Footer */}
      {footer && (
        <Text 
          fontSize="xs" 
          color={{ base: "gray.500", _dark: "gray.400" }} 
          mt={4}
        >
          {footer}
        </Text>
      )}
    </BaseCard>
  );
};

export default SectionCard;
