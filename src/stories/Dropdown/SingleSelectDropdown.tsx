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
  labelView?: string;
  value: string;
}

interface SingleSelectDropdownProps {
  fontSize?: string | number;
  options: Option[];
  defaultValue?: Option;
  onChange: (selected: Option) => void;
  className?: string;
  sx?: SxProps<Theme>;
  titleHelper?: string;
  error?: boolean;
  style?: React.CSSProperties;
}

const SingleSelectDropdown: React.FC<SingleSelectDropdownProps> = ({
  fontSize,
  options,
  defaultValue,
  onChange,
  className,
  sx,
  titleHelper,
  style,
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
          borderRadius: '10px',
          padding: '4px 12px',
          borderColor: error ? 'error.main' : '#E4E4E4',
          color: error ? 'error.main' : 'black',
          fontWeight: 400,
          fontSize: '1rem',
          textTransform: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          gap: 1,
          '&:hover': {
            borderColor: error ? 'error.main' : 'text.secondary',
          },
          ...style,
        }}
      >
        <span style={{ fontSize: fontSize }}>{selected.label ? selected.label : titleHelper}</span>
       
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
            selected={selected.value === option.value}
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
            {option.labelView || option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default SingleSelectDropdown;
