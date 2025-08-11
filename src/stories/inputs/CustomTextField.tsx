import React, { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  useTheme,
  TextFieldProps,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";



// CustomTextField component with password visibility toggle


interface CustomTextFieldProps extends Omit<TextFieldProps, 'variant'> {
  variant?: TextFieldProps['variant'];
}

const CustomTextField: React.FC<CustomTextFieldProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = props.type === "password";

  return (
    <TextField
      {...props}
      type={isPasswordField && !showPassword ? "password" : "text"}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: '#FFFFFF',
          borderRadius: "32px"
        },
        ...props.sx, // allow overrides
      }}
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
