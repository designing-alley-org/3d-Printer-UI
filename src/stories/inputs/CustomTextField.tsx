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
}

const CustomTextField: React.FC<CustomTextFieldProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const { onlyNumber, onChange, ...rest } = props;
  const isPasswordField = props.type === "password";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onlyNumber) {
      e.target.value = e.target.value.replace(/\D/g, ""); 
    }

    // ✅ call your original onChange if passed
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <TextField
      {...rest}
      type={isPasswordField && !showPassword ? "password" : "text"}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#FFFFFF",
          borderRadius: props.borderRadius || "32px",
        },
         
        ...props.sx,
      }}
      onChange={handleChange} // 🔥 use wrapped version
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
