import React, { useState, useCallback } from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import MUIButton from "../../stories/MUIButton/Button";

type PhoneInputProps = {
  extension?: string;
  phoneNumber?: string;
  disabled?: boolean;
  isLoading?: boolean;
  isEditing: boolean;
  setEditing: (value: boolean) => void;
  handleSave: () => void;
  onPhoneChange: (value: string) => void;
  onExtensionChange?: (value: string) => void;
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
  extension = "+44",
  phoneNumber = "",
  disabled = false,
  isLoading = false,
  handleSave,
  onPhoneChange,
  onExtensionChange,
  isEditing,
  setEditing
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
  
  const [selectedExtension, setSelectedExtension] = useState(extension);

  const handleExtensionChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newExtension = event.target.value;
    setSelectedExtension(newExtension);
    if (onExtensionChange) {
      onExtensionChange(newExtension);
    }
  }, [onExtensionChange]);

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
    <Box
      display="flex"
      gap={{ xs: 0.5, sm: 1 }}
      flexWrap={{ xs: "wrap", sm: "nowrap" }}
      justifyContent={{ sm: "flex-start" }}
    >
      <Box display="flex" gap={1} >
      <TextField
        select
        value={selectedExtension}
        onChange={handleExtensionChange}
        disabled={!isEditing || disabled}
        sx={{ ...inputStyles, width: { xs: 90, sm: 100 } }}
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
        sx={{ ...inputStyles, width: { xs: 170, sm: 460 } }}
      />
      </Box>
      <MUIButton
        label={!isEditing ? 'Change Number' : 'Save'}
        onClick={toggleEdit}
        disabled={isLoading}
      />
    </Box>
  );
};

export default PhoneInput;