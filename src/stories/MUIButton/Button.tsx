import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { Tooltip } from '@mui/material';

interface ButtonProps {
  btnVariant?:
    | 'primary'
    | 'outlined'
    | 'disabled'
    | 'dark'
    | 'black'
    | 'icon-outline'
    | 'icon-filled'
    | 'icon-soft';
  onClick?: () => void;
  fullWidth?: boolean;
  ariaLabel?: string;
  loading?: boolean;
  tooltip?: string; // optional tooltip text
  type?: 'button' | 'submit' | 'reset'; // MUI type prop
  label?: string;
  size?: 'small' | 'medium' | 'large'; // MUI size prop
  disabled?: boolean; // MUI disabled prop
  style?: React.CSSProperties; // custom styles
  icon?: React.ReactNode; // custom icon
  iconPosition?: 'start' | 'end'; // icon alignment
}

const commonStyles = {
  borderRadius: '999px',
  textTransform: 'none',
};

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'btnVariant',
})<ButtonProps>(({ btnVariant }) => {
  switch (btnVariant) {
 
    case 'outlined':
      return {
        ...commonStyles,
        border: '1px solid #1E65F5',
        color: '#1E65F5',
        backgroundColor: 'transparent',
      };
    case 'disabled':
      return {
        ...commonStyles,
        backgroundColor: '#d3d3d3',
        color: '#eaeaea',
        cursor: 'not-allowed',
        pointerEvents: 'none',
      };
    case 'dark':
      return {
        ...commonStyles,
        backgroundColor: '#444',
        color: '#f0f0f0',
        '&:hover': { backgroundColor: '#333' },
      };
    case 'black':
      return {
        ...commonStyles,
        backgroundColor: '#000',
        color: '#fff',
        '&:hover': { backgroundColor: '#111' },
      };
    case 'icon-outline':
      return {
        ...commonStyles,
        border: '2px solid #6da5f7',
        color: '#3a78dd',
        backgroundColor: 'transparent',
      };
    case 'icon-filled':
      return {
        ...commonStyles,
        backgroundColor: '#4679cf',
        color: '#fff',
        '&:hover': { backgroundColor: '#3763b5' },
      };
    case 'icon-soft':
      return {
        ...commonStyles,
        backgroundColor: '#a7c9ff',
        color: '#3a78dd',
        border: '2px solid #89b7ff',
        '&:hover': { backgroundColor: '#8ab6ff', borderColor: '#6da5f7' },
      };
    default:
      return {};
  }
});

export default function   MUIButton({
  btnVariant = 'primary',
  onClick,
  fullWidth = false,
  label,
  size = 'medium',
  type = 'button',
  disabled = false,
  tooltip,
  style,
  icon,
  loading = false,
  iconPosition = 'end',
  ariaLabel,
}: ButtonProps) {
  const isIconOnly = !label && !!icon;

  return (
    <Tooltip title={tooltip} arrow>
      <StyledButton
        variant="contained"
        onClick={onClick}
        type={type}
        fullWidth={fullWidth}
        aria-label={ariaLabel || label || 'icon-button'}
        title={label || ariaLabel || ''}
        btnVariant={btnVariant}
        size={size}
        disabled={disabled || loading}
        style={style}
        startIcon={!isIconOnly && iconPosition === 'start' ? icon : undefined}
        endIcon={!isIconOnly && iconPosition === 'end' ? icon : undefined}
      >
        {loading ? (
          <CircularProgress size={20} color="inherit" />
        ) : isIconOnly ? (
          icon
        ) : (
          label
        )}
      </StyledButton>
    </Tooltip>
  );
}
