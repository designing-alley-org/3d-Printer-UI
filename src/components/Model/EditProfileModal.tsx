import React, { useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import ResponsiveModal from './ResponsiveModal';
import CustomInputLabelField from '../../stories/inputs/CustomInputLabelField';
import CustomButton from '../../stories/button/CustomButton';

interface User {
  name: string;
  email: string;
  phone_no: string;
  phone_ext?: string;
}

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
  onSave: (user: User) => void;
  loading?: boolean;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  open,
  onClose,
  user,
  onSave,
  loading = false,
}) => {
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    phone_no: '',
    phone_ext: '',
  });

  const [errors, setErrors] = useState<Partial<User>>({});

  useEffect(() => {
    if (user && open) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone_no: user.phone_no || '',
        phone_ext: user.phone_ext || '',
      });
    }
    setErrors({});
  }, [user, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof User]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<User> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone_no.trim()) {
      newErrors.phone_no = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone_no)) {
      newErrors.phone_no = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
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
        borderRadius={0.2}
      >
        Cancel
      </CustomButton>
      <CustomButton
        variant="contained"
        onClick={handleSave}
        loading={loading}
        borderRadius={0.2}
      >
        Save Changes
      </CustomButton>
    </Stack>
  );

  return (
    <ResponsiveModal
      open={open}
      onClose={handleClose}
      title="Edit Profile"
      actions={actions}
      maxWidth="sm"
      disableBackdropClick={loading}
    >
      <Box sx={{ width: '100%' }}>
        <CustomInputLabelField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          error={!!errors.name}
          helperText={errors.name}
          required
        />

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

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <CustomInputLabelField
            label="Phone Number"
            name="phone_no"
            value={formData.phone_no}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            type="tel"
            error={!!errors.phone_no}
            helperText={errors.phone_no}
            required
            sx={{ flex: 1 }}
          />

          <CustomInputLabelField
            label="Extension (Optional)"
            name="phone_ext"
            value={formData.phone_ext || ''}
            onChange={handleInputChange}
            placeholder="Ext."
            onlyNumber
            sx={{ flex: 0.3, minWidth: '120px' }}
          />
        </Stack>
      </Box>
    </ResponsiveModal>
  );
};

export default EditProfileModal;
