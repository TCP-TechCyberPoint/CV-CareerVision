import { Button } from "@chakra-ui/react";

type Props = {
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  variant?: "outline" | "solid" | "subtle" | "surface" | "ghost" | "plain";
  color?: string;
  colorScheme?: string;
  colorPalette?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
  _hover?: object;
};

const BaseButton = (props: Props) => {
  return (
    <Button
      type={props.type}
      colorPalette={props.colorPalette}
      colorScheme={props.colorScheme}
      variant={props.variant}
      color={props.color}
      onClick={props.onClick}
      size={props.size}
      disabled={props.isDisabled}
      _hover={props._hover}
      
    >
      {props.children}
    </Button>
  );
};

export default BaseButton;
