import { Button } from "@chakra-ui/react";
import { forwardRef } from "react";

type ButtonProps = {
  children?: React.ReactNode;
  variant?: "outline" | "solid" | "ghost" | "subtle" | "surface" | "plain" | { [key: string]: string };
  bg?: string;
  colorScheme?: string;
  color?: string;
  colorPalette?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg" | { [key: string]: string };
  minW?: string;
  w?: string | { [key: string]: string };
  px?: number | { [key: string]: number };
  type?: "button" | "submit" | "reset";
  _hover?: object;
  transition?: string;
  disabled?: boolean;
  borderColor?: string;
  fontSize?: string;
  fontWeight?: string;
};

const BaseButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <Button 
   ref={ref} {...props}>{props.children || "Button"}</Button>;
});

BaseButton.displayName = "BaseButton";

export default BaseButton;
