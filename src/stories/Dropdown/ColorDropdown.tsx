import React, { useState } from 'react';
import {
  Box,
  Menu,
  MenuItem,
  Button,
  Typography,
  SxProps,
  Theme,
} from '@mui/material';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface ColorOption {
  id: number | string;
  label: string;
  value: string;
}

interface ColorDropdownProps {
  options: ColorOption[];
  defaultValue?: ColorOption;
  onChange: (selected: ColorOption) => void;
  className?: string;
  sx?: SxProps<Theme>;
  titleHelper?: string;
  error?: boolean;
}

const ColorDropdown: React.FC<ColorDropdownProps> = ({
  options,
  defaultValue,
  onChange,
  className,
  sx,
  titleHelper,
  error = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<ColorOption | undefined>(
    defaultValue
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option: ColorOption) => {
    setSelected(option);
    onChange(option);
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <Box className={className} sx={{ display: 'inline-block', ...sx }}>
      <Button
        onClick={handleClick}
        variant="outlined"
        sx={{
          borderRadius: '10px',
          padding: '4px 12px',
          borderColor: error ? 'error.main' : ' #E4E4E4',
          color: error ? 'error.main' : 'black',
          fontWeight: 400,
          fontSize: '1rem',
          width: '100%',
          justifyContent: 'space-between',
          textTransform: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          '&:hover': {
            borderColor: error ? 'error.main' : 'text.secondary',
          },
        }}
      >
        {selected ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 15,
                height: 15,
                borderRadius: '50%',
                backgroundColor: selected.value,
                mr: 1,
              }}
            />
            <span style={{ fontSize: '.875rem' }}>{selected.label}</span>
          </Box>
        ) : (
          <span>{titleHelper}</span>
        )}
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
            paddingY: 0,
            minWidth: 160,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            selected={selected?.value === option.value}
            onClick={() => handleSelect(option)}
            sx={{
              fontSize: '16px',
              paddingX: 3,
              '&.Mui-selected': {
                backgroundColor: 'primary.contrastText',
                color: 'primary.main',
              },
              '&:hover': {
                backgroundColor: '#F3F8FF',
              },
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: option.value,
                mr: 1,
              }}
            />
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ColorDropdown;
