import React from "react";
import { TextField, Box, Button } from "@mui/material";

// Props Type Definition
type InputProps = {
  name: string;
  value?: string;
  placeholder: string;
  disabled?: boolean;
  isLoading?: boolean;
  isEditing: boolean;
  setEditing: (value: boolean) => void;
  handleSave: () => void;
  onChange: (value: string) => void;
};

const EditableInput: React.FC<InputProps> = ({
  name = "",
  value = "",
  placeholder,
  disabled = false,
  isLoading = false,
  handleSave,
  onChange,
  isEditing,
  setEditing,
}) => {
  // Input Styling
  const inputStyles = {
    height: 50,
    outline: "none",
    borderRadius: 9,
    backgroundColor: disabled ? "transparent" : "#e6f0ff",
    "& .MuiOutlinedInput-root": {
      height: 50,
      borderRadius: 9,
      boxShadow: "0px 0px 4px 0px #66a3ff inset",
      border: "1px solid #0066ff47",
      "&:hover": { borderColor: "#0066ff47" },
      "&.Mui-focused": { borderColor: "#0066ff47" },
    },
  };

  const toggleEdit = () => {
    if (isLoading) return;
    if (!isEditing) {
      setEditing(true);
    } else {
      handleSave();
    }
  };

  return (
    <Box display="flex"  gap={2}>
      <TextField
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        disabled={!isEditing || disabled}
        sx={{ ...inputStyles, width: 570 }}
      />

      <Button
        onClick={toggleEdit}
        disabled={isLoading}
        sx={{
          bgcolor: "#1E6FFF",
          borderRadius: 6,
          color: "white",
          "&:hover": {
            bgcolor: "rgb(119, 157, 223)",
          },
        }}
      >
        {!isEditing ? `Change ${name} ` : "Save"}
      </Button>
    </Box>
  );
};

export default EditableInput;
