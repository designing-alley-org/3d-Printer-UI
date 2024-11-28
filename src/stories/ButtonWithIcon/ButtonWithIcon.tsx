import { Button, ButtonProps } from "@mui/material";
import { ReactNode } from "react";

interface ButtonWithIconProps extends ButtonProps {
  label: string;
  Icon?: ReactNode;
  iconPosition?: "start" | "end";
  handleClick: () => void;
}

export default function ButtonWithIcon({ label, Icon, iconPosition = "start", handleClick, ...props }: ButtonWithIconProps) {
  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      startIcon={iconPosition === "start" ? Icon : undefined}
      endIcon={iconPosition === "end" ? Icon : undefined}
      {...props}
    >
      {label}
    </Button>
  );
}