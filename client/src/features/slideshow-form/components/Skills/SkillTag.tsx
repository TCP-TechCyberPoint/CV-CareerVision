import { Tag, TagLabel } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionTag = motion.create(Tag.Root);

interface SkillTagProps {
  skill: string;
  isSelected?: boolean;
  isExpanded?: boolean;
  colorScheme: string;
  size?: "sm" | "md" | "lg";
  onClick: () => void;
  variant?: "solid" | "outline" | "subtle";
}

const SkillTag = ({ 
  skill, 
  isSelected = false, 
  isExpanded = false,
  colorScheme, 
  size = "md", 
  onClick,
  variant
}: SkillTagProps) => {
  const getVariant = () => {
    if (variant) return variant;
    if (isExpanded) return "outline";
    if (isSelected) return "solid";
    return "subtle";
  };

  const getSize = () => {
    if (size === "lg") return { px: 5, py: 3, fontSize: "md" };
    if (size === "sm") return { px: 3, py: 1, fontSize: "sm" };
    return { px: 4, py: 2, fontSize: "md" };
  };

  const sizeProps = getSize();

  return (
    <MotionTag
      size={size}
      variant={getVariant()}
      colorPalette={colorScheme}
      cursor="pointer"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      px={sizeProps.px}
      py={sizeProps.py}
      borderRadius="full"
    >
      <TagLabel fontWeight={size === "lg" ? "bold" : "normal"} fontSize={sizeProps.fontSize}>
        {skill}
      </TagLabel>
    </MotionTag>
  );
};

export default SkillTag; 