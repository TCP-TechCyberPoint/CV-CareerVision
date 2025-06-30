// src/components/cards/SectionCard.tsx

import type { ReactNode } from "react";
import { Box, Flex, Text, Badge } from "@chakra-ui/react";
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
  isBasic?: boolean; // For backward compatibility
  // Margin props
  ml?: string | number | Record<string, string | number>;
  mr?: string | number | Record<string, string | number>;
}

const SectionCard = ({
  title,
  icon,
  description,
  onClick,
  completion,
  themeColor = "teal",
  customContent,
  isBasic = false,
  ml,
  mr,
}: SectionCardProps) => {
  // Use basic layout for simple cards or when isBasic is true
  if (isBasic || (!completion && !customContent)) {
    return (
      <BaseCard
        variant="navigation"
        themeColor={themeColor}
        onClick={onClick}
        minH={{ base: "120px", md: "160px" }}
        p={{ base: 3, md: 6 }}
        ml={ml}
        mr={mr}
      >
        <Flex align="center" gap={3} mb={2}>
          <Box
            fontSize="2xl"
            color={`${themeColor}.500`}
            _groupHover={{ color: `${themeColor}.600` }}
          >
            {icon}
          </Box>
          <Text fontSize={{ base: "md", md: "lg" }} fontWeight="semibold" display={{ base: "none", md: "block" }}>
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
      minH={{ base: "120px", md: "160px" }}
      p={{ base: 3, md: 6 }}
      ml={ml}
      mr={mr}
    >
      {/* Header - hidden on mobile */}
      <Flex align="center" justify="space-between" mb={4} display={{ base: "none", md: "flex" }}>
        <Flex align="center" gap={3}>
          <Box
            fontSize="2xl"
            color={`${themeColor}.500`}
            _groupHover={{ color: `${themeColor}.600` }}
          >
            {icon}
          </Box>
          <Text fontSize={{ base: "md", md: "lg" }} fontWeight="semibold">
            {title}
          </Text>
        </Flex>
        {completion !== undefined && (
          <Badge 
            colorPalette={themeColor}
            variant="subtle"
            borderRadius="full"
          >
            {completion}%
          </Badge>
        )}
      </Flex>

      {/* Custom Content */}
      {customContent && (
        <Box mb={{ base: 0, md: 4 }}>
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
    </BaseCard>
  );
};

export default SectionCard;
