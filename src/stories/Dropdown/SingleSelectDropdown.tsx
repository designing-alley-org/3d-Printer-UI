import React, { useState } from 'react';
import {
  Box,
  Menu,
  MenuItem,
  Button,
  Typography,
  SxProps,
  Theme
} from '@mui/material';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface Option {
  id: number | string;
  label: string;
  value: string;
}

interface SingleSelectDropdownProps {
  options: Option[];
  defaultValue?: Option;
  onChange: (selected: Option) => void;
  className?: string;
  sx?: SxProps<Theme>;
  titleHelper?: string;
  error?: boolean;
}

const SingleSelectDropdown: React.FC<SingleSelectDropdownProps> = ({
  options,
  defaultValue,
  onChange,
  className,
  sx,
  titleHelper,
  error = false
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<Option>(defaultValue || { id: '', label: '', value: '' });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option: Option) => {
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
          borderRadius: '30px',
          padding: '4px 12px',
          borderColor: error ? 'error.main' : 'primary.main',
          color: error ? 'error.main' : 'primary.main',
          fontWeight: 500,
          fontSize: '16px',
          textTransform: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          '&:hover': {
            borderColor: error ? 'error.main' : '#88A2F0',
          },
        }}
      >
        <span>{selected.label ? selected.label : titleHelper}</span>
       
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
            borderRadius: '20px',
            paddingY: 1,
            minWidth: 160,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            selected={selected.value === option.value}
            onClick={() => handleSelect(option)}
            sx={{
              fontSize: '16px',
              paddingX: 3,
              color: '#1e6fff',
              '&.Mui-selected': {
                backgroundColor: '#E7F0FF',
              },
              '&:hover': {
                backgroundColor: '#F3F8FF',
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default SingleSelectDropdown;
