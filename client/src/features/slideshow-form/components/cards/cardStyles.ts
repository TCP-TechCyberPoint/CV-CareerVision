// Shared styling utilities for consistent card appearance

export const cardBaseStyles = {
  borderRadius: "lg",
  borderWidth: "1px",
  transition: "all 0.3s ease",
  boxShadow: "sm",
  position: "relative" as const,
} as const;

export const cardVariantStyles = {
  navigation: {
    cursor: "pointer",
    _hover: {
      boxShadow: "lg",
      transform: "translateY(-2px)",
    },
  },
  form: {
    cursor: "default",
    _hover: {
      boxShadow: "md",
    },
  },
} as const;

export const getCardColors = (variant: 'navigation' | 'form', themeColor: string = 'gray') => {
  const baseColors = {
    borderColor: { base: "gray.200", _dark: "gray.600" },
    bg: { base: "white", _dark: "gray.800" },
  };

  if (variant === 'navigation') {
    return {
      ...baseColors,
      _hover: {
        borderColor: `${themeColor}.300`,
      },
    };
  }

  if (variant === 'form') {
    return {
      borderColor: `${themeColor}.200`,
      bg: { base: `${themeColor}.50`, _dark: `${themeColor}.900` },
    };
  }

  return baseColors;
};

export const cardContentStyles = {
  padding: 5,
} as const; 