import React, { useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import ResponsiveModal from './ResponsiveModal';
import CustomInputLabelField from '../../stories/inputs/CustomInputLabelField';
import CustomButton from '../../stories/button/CustomButton';


interface EditEmailModalProps {
  open: boolean;
  onClose: () => void;
  email: string;
  onSave: (email: string) => void;
  loading?: boolean;
}

const EditEmailModal: React.FC<EditEmailModalProps> = ({
  open,
  onClose,
  email,
  onSave,
  loading = false,
}) => {
  const [formData, setFormData] = useState<{
    email: string;
  }>({
    email: '',
  });

  const [errors, setErrors] = useState<Partial<{ email: string }>>({});

  useEffect(() => {
    if (email && open) {
      setFormData({
        email: email || '',
      });
    }
    setErrors({});
  }, [email, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof { email: string }]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<{ email: string }> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData.email);
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const actions = (
    <Stack direction="row" spacing={2}>
      <CustomButton
        variant="outlined"
        onClick={handleClose}
        disabled={loading}
      >
        Cancel
      </CustomButton>
      <CustomButton
        variant="contained"
        onClick={handleSave}
        loading={loading}
      >
        Save Changes
      </CustomButton>
    </Stack>
  );

  return (
    <ResponsiveModal
      open={open}
      onClose={handleClose}
      title="Edit Email"
      actions={actions}
      maxWidth="sm"
      disableBackdropClick={loading}
    >
      <Box sx={{ width: '100%' }}>
        <CustomInputLabelField
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email address"
          type="email"
          error={!!errors.email}
          helperText={errors.email}
          required
        />
      </Box>
    </ResponsiveModal>
  );
};

export default EditEmailModal;