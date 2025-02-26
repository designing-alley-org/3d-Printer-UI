import React, { useState, useCallback } from "react";
import { TextField, MenuItem, Box, Button, colors } from "@mui/material";
import { Edit2, SaveIcon } from "lucide-react";

// Props Type Definition
type PhoneInputProps = {
  extension?: string;
  phoneNumber?: string;
  disabled?: boolean;
  isLoading?: boolean;
  isEditing: boolean;
  setEditing: (value: boolean) => void;
  handleSave: () => void;
  onPhoneChange: (value: string) => void;
};

interface CountryExtension {
  code: string;
  label: string;
}

// Country Codes
const countryExtensions: CountryExtension[] = [
  { code: "+61", label: "Australia" }, { code: "+32", label: "Belgium" },
  { code: "+55", label: "Brazil" }, { code: "+86", label: "China" },
  { code: "+420", label: "Czech Republic" }, { code: "+45", label: "Denmark" },
  { code: "+20", label: "Egypt" }, { code: "+33", label: "France" },
  { code: "+49", label: "Germany" }, { code: "+91", label: "India" },
  { code: "+62", label: "Indonesia" }, { code: "+39", label: "Italy" },
  { code: "+81", label: "Japan" }, { code: "+52", label: "Mexico" },
  { code: "+31", label: "Netherlands" }, { code: "+47", label: "Norway" },
  { code: "+48", label: "Poland" }, { code: "+351", label: "Portugal" },
  { code: "+7", label: "Russia" }, { code: "+65", label: "Singapore" },
  { code: "+27", label: "South Africa" }, { code: "+82", label: "South Korea" },
  { code: "+34", label: "Spain" }, { code: "+46", label: "Sweden" },
  { code: "+41", label: "Switzerland" }, { code: "+66", label: "Thailand" },
  { code: "+90", label: "Turkey" }, { code: "+44", label: "UK" },
  { code: "+1", label: "USA" }, { code: "+971", label: "UAE" },
];


const PhoneInput: React.FC<PhoneInputProps> = ({
  extension,
  phoneNumber = "",
  disabled = false,
  isLoading = false,
  handleSave,
  onPhoneChange,
  isEditing,
  setEditing
}) => {
  // Input Styling
const inputStyles = {
  height: 50,
  outline: "none",
  borderRadius: 9,
  backgroundColor: disabled ? "transparent" : "#e6f0ff",
  colors: "black",
  "& .MuiOutlinedInput-root": {
    height: 50,
    borderRadius: 9,
    boxShadow: "0px 0px 4px 0px #66a3ff inset",
    border: "1px solid #0066ff47",
    "&:hover": { borderColor: "#0066ff47" },
    "&.Mui-focused": { borderColor: "#0066ff47" },
  },
};
  const [selectedExtension, setSelectedExtension] = useState(extension);

  const handleExtensionChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedExtension(event.target.value);
  }, []);

  const handlePhoneChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onPhoneChange(event.target.value);
  }, [onPhoneChange]);

  const toggleEdit = () => {
    if (isLoading) return;
    if (!isEditing) {
      setEditing(true);
    } else {
      handleSave();
    }
  };

  return (
    <Box display="flex" gap={1} alignItems="center">
      <TextField
        select
        value={selectedExtension}
        onChange={handleExtensionChange}
        disabled={!isEditing || disabled}
        sx={{ ...inputStyles, width: 112 }}
      >
        {countryExtensions.map((option) => (
          <MenuItem key={option.code} value={option.code} sx={{ bgcolor: "#C9E4CA" }}>
            {option.code} ({option.label})
          </MenuItem>
        ))}
      </TextField>

      <TextField
        value={phoneNumber}
        placeholder="Enter Phone Number"
        onChange={handlePhoneChange}
        disabled={!isEditing || disabled}
        sx={{ ...inputStyles, width: 447 }}
      />

      <Button
        onClick={toggleEdit}
        disabled={isLoading}
        sx={{
          bgcolor: isEditing ? "#1E6FFF" : "#1E6FFF",
          borderRadius: 6,
          padding: "0.8rem 1rem",
          color: "white",
          "&:hover": {
            bgcolor: "rgb(119, 157, 223)",
          },
        }}
      >
        {!isEditing ? 'Change Number' : 'Save'}
      </Button>
    </Box>
  );
};

export default PhoneInput;