import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { 
  cardBaseStyles, 
  cardVariantStyles, 
  getCardColors, 
  cardContentStyles 
} from "./cardStyles";

interface BaseCardProps {
  children: ReactNode;
  variant?: 'navigation' | 'form';
  themeColor?: string;
  onClick?: () => void;
  className?: string;
  role?: string;
  // Allow additional props to be passed through
  [key: string]: unknown;
}

const BaseCard = ({
  children,
  variant = 'navigation',
  themeColor = 'gray',
  onClick,
  className,
  role = variant === 'navigation' ? 'group' : undefined,
  ...otherProps
}: BaseCardProps) => {
  const variantStyles = cardVariantStyles[variant];
  const colorStyles = getCardColors(variant, themeColor);

  return (
    <Box
      onClick={onClick}
      role={role}
      className={className}
      {...cardBaseStyles}
      {...variantStyles}
      {...colorStyles}
      p={cardContentStyles.padding}
      {...otherProps}
    >
      {children}
    </Box>
  );
};

export default BaseCard; 