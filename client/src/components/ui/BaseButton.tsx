import { Button } from "@chakra-ui/react";

type Props = {
  children?: React.ReactNode;
  variant?: "outline" | "solid" | "subtle" | "surface" | "ghost" | "plain";
  color?: string;
  onClick?: () => void;
};

const BaseButton = (props: Props) => {
  return (
    <Button variant={props.variant} color={props.color} onClick={props.onClick}>
      {props.children}
    </Button>
  );
};

export default BaseButton;
