import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Drawer,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Fade,
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface ResponsiveModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  disableBackdropClick?: boolean;
}

const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  disableBackdropClick = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = (
    _event?: {},
    reason?: 'backdropClick' | 'escapeKeyDown'
  ) => {
    if (disableBackdropClick && reason === 'backdropClick') {
      return;
    }
    onClose();
  };

  if (isMobile) {
    return (
      <Drawer
        anchor="bottom"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: '85vh',
            minHeight: '300px',
          },
        }}
        keepMounted
      >
        <Box sx={{ p: 2 }}>
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            {title && (
              <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
            )}
            <IconButton
              onClick={() => onClose()}
              sx={{
                ml: 'auto',
                color: 'grey.600',
              }}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Content */}
          <Box sx={{ mb: actions ? 2 : 0 }}>{children}</Box>

          {/* Actions */}
          {actions && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 1,
                pt: 2,
                borderTop: 1,
                borderColor: 'divider',
              }}
            >
              {actions}
            </Box>
          )}
        </Box>
      </Drawer>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          borderRadius: 0.5,
          minHeight: '200px',
        },
      }}
    >
      {title && (
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 1,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <IconButton
            onClick={() => onClose()}
            sx={{
              color: 'grey.600',
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
      )}

      <DialogContent sx={{ pt: title ? 1 : 3 }}>{children}</DialogContent>

      {actions && (
        <DialogActions sx={{ px: 3, pb: 2 }}>{actions}</DialogActions>
      )}
    </Dialog>
  );
};

export default ResponsiveModal;
