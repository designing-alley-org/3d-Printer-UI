import React, { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  TextFieldProps,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface CustomTextFieldProps extends Omit<TextFieldProps, "variant"> {
  variant?: TextFieldProps["variant"];
  borderRadius?: string;
  onlyNumber?: boolean;
  inputStyle?: number; // ✅ style preset selector
}

const CustomTextField: React.FC<CustomTextFieldProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const { onlyNumber, onChange, inputStyle, ...rest } = props;
  const isPasswordField = props.type === "password";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onlyNumber) {
      e.target.value = e.target.value.replace(/\D/g, "");
    }

    if (onChange) {
      onChange(e);
    }
  };

  // ✅ Define styles based on inputStyle
  let styleOverrides: any = {};
  switch (inputStyle) {
    case 1:
      styleOverrides = {
        "& .MuiOutlinedInput-root": {
          height: "2.5rem",
          borderRadius: "4px",
          width: "4rem",
        },
        "& .MuiOutlinedInput-input": {
          padding: "0.5rem 0.75rem",
        },
      };
      break;
    case 2:
      styleOverrides = {
        "& .MuiOutlinedInput-root": {
          height: "2.5rem",
          borderRadius: "4px",
        },
        "& .MuiOutlinedInput-input": {
          padding: "0.5rem 0.75rem",
        },
      };
      break;
    default:
      styleOverrides = {
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#FFFFFF",
          borderRadius: props.borderRadius || "32px",
        },
      };
      break;
  }

  return (
    <TextField
      {...rest}
      type={isPasswordField && !showPassword ? "password" : "text"}
      sx={{
        ...styleOverrides,
        ...props.sx, // allow consumer overrides
      }}
      onChange={handleChange}
      InputProps={{
        ...props.InputProps,
        endAdornment: isPasswordField ? (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
              tabIndex={-1}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : (
          props.InputProps?.endAdornment
        ),
      }}
    />
  );
};

export default CustomTextField;
