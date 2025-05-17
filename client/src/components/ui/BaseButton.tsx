import { Button } from "@chakra-ui/react";
import { forwardRef } from "react";

type ButtonProps = {
  children?: React.ReactNode;
  variant?: "outline" | "solid" | "ghost" | "subtle" | "surface" | "plain";
  colorScheme?: string;
  color?: string;
  colorPalette?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  minW?: string;
  type?: "button" | "submit" | "reset";
  _hover?: object;
  transition?: string;
};

const BaseButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <Button ref={ref} {...props}>{props.children || "Button"}</Button>;
});

BaseButton.displayName = "BaseButton";

export default BaseButton;
