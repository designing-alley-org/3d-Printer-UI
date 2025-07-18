import React from "react";
import { TextField, Box } from "@mui/material";
import MUIButton from "../../stories/MUIButton/Button";

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
    height: { xs: 32, sm: 40 },
    outline: "none",
    borderRadius: 9,
    backgroundColor: disabled ? "transparent" : "#e6f0ff",
    "& .MuiOutlinedInput-root": {
      height: { xs: 32, sm: 40 },
      fontSize: { xs: 12, sm: 14 },
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
    <Box
      display="flex"
      gap={{ xs: 1, sm: 2 }}
      flexDirection={{ xs: "column", sm: "row" }}
    >
      <TextField
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        disabled={!isEditing || disabled}
        sx={{ ...inputStyles, width: { xs: 260, sm: 570 } }}
      />
      <MUIButton
        label={!isEditing ? `Change ${name}` : "Save"}
        onClick={toggleEdit}
        disabled={isLoading}
      />
    </Box>
  );
};

export default EditableInput;
