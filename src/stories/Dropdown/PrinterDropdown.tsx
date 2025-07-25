import React, { useEffect, useState } from 'react';
import {
  Box,
  Menu,
  MenuItem,
  Button,
  Typography,
  SxProps,
  Theme,
  Radio,
} from '@mui/material';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface PrinterOption {
  id: string;
  name: string;
  details: {
    buildVolume: string;
    layerResolution: string;
    nozzleSize: string;
    printSpeed: string;
    materialCompatibility: string;
    technologyType: string;
  };
}

interface PrinterDropdownProps {
  options: PrinterOption[];
  defaultValue?: PrinterOption;
  onChange: (selected: PrinterOption) => void;
  className?: string;
  sx?: SxProps<Theme>;
  titleHelper?: string;
  error?: boolean;
  disabled?: boolean;
}

const PrinterDropdown: React.FC<PrinterDropdownProps> = ({
  options,
  defaultValue,
  onChange,
  className,
  sx,
  disabled = false,
  titleHelper,
  error = false,
}) => {

  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<PrinterOption | undefined>(defaultValue);

  console.log('PrinterDropdown defaultValue:', defaultValue);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option: PrinterOption) => {
    setSelected(option);
  };

  const handleConfirm = () => {
    if (selected) {
      onChange(selected);
    }
    handleClose();
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
  if (defaultValue && defaultValue.id !== selected?.id) {
    setSelected(defaultValue);
  }
}, [defaultValue]);

  return (
    <Box className={className} sx={{ display: 'inline-block', ...sx }}>
      <Button
        onClick={handleClick}
        disabled={disabled}
        variant="outlined"
        sx={{
          borderRadius: '10px',
          padding: '4px 12px',
          borderColor: error ? 'error.main' : ' #66A3FF',
          color: error ? 'error.main' : 'black',
          fontWeight: 400,
          width: '100%',
          justifyContent: 'space-between',
          fontSize: '1rem',
          textTransform: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          '&:hover': {
            borderColor: error ? 'error.main' : '#88A2F0',
          },
        }}
      >
        <span>{selected ? selected.name : titleHelper}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </Button>
      <Typography
        variant="caption"
        sx={{
          color: error ? 'error.main' : 'text.secondary',
          marginLeft: 'auto',
        }}
      >
        {error ? 'Please select an option' : ''}
      </Typography>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: '15px',
            marginTop: '5px',
            padding: 2,
            minWidth: 300,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            onClick={() => handleSelect(option)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              '&.Mui-selected': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Radio
                checked={selected?.id === option.id}
                onChange={() => handleSelect(option)}
                value={option.id}
                name="radio-buttons"
              />
              <Typography variant="h6">{option.name}</Typography>
            </Box>
            <Box sx={{ pl: 4 }}>
              <Typography variant="body2"> <strong>Build Volume: </strong> {option.details.buildVolume}</Typography>
              <Typography variant="body2"> <strong>Layer Resolution: </strong> {option.details.layerResolution}</Typography>
              <Typography variant="body2"> <strong>Nozzle Size: </strong> {option.details.nozzleSize}</Typography>
              <Typography variant="body2"> <strong>Print Speed: </strong> {option.details.printSpeed}</Typography>
              <Typography variant="body2"> <strong>Material Compatibility: </strong> {option.details.materialCompatibility}</Typography>
              <Typography variant="body2"> <strong>Technology Type: </strong> {option.details.technologyType}</Typography>
            </Box>
          </MenuItem>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={handleConfirm} variant="contained">
            Confirm
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default PrinterDropdown;
