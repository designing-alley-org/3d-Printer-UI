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
        border: props.variant === "outlined" ? `1px solid #F0F4FF` : "none",
        backgroundColor: props.variant === "outlined" ? theme.palette.background.paper : "",
        boxShadow: props.variant === "outlined" ? "2px 2px 4px 0px #3B3E4929" : "none",   
        fontWeight: theme.typography.button.fontWeight,
        textTransform: "none",
        '&:hover': {
          backgroundColor: props.variant === "outlined" && theme.palette.primary.dark ,
          color: props.variant === "outlined" && theme.palette.primary.contrastText,
        },
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
