import React from "react";
import { Button, ButtonProps, CircularProgress, useTheme } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
  borderRadius?: string | number;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  loading = false,
  children,
  borderRadius,
  disabled,
  sx,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Button
      {...props}
      disabled={loading || disabled}
      sx={{
        borderRadius: borderRadius ?? (theme.shape.borderRadius as number) * 1.33, // 24px from theme (multiplier in case)
        padding: "10px 16px",
        fontWeight: theme.typography.button.fontWeight,
        textTransform: "none",
        ...sx, // merge custom overrides last
      }}
    >
      {loading ? (
        <CircularProgress
          size={20}
          sx={{
            color: props.variant === "contained" ? theme.palette.common.white : theme.palette.primary.main,
          }}
        />
      ) : (
        children
      )}
    </Button>
  );
};

export default CustomButton;
