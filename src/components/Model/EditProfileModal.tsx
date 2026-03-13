import React from 'react';
import { Box, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ResponsiveModal from './ResponsiveModal';
import { isValidPhoneNumber } from 'libphonenumber-js';
import CustomButton from '../../stories/button/CustomButton';
import { editUser } from '../../types';
import FormikInput from '../../stories/inputs/FormikInput';
import FormikPhoneNumber from '../../stories/inputs/FormikPhoneNumber';
import { countries } from '../../constant/countries';

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  user: editUser;
  onSave: (formData: editUser) => void;
  loading?: boolean;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  open,
  onClose,
  user,
  onSave,
  loading = false,
}) => {
  // Helper to find ISO code from dial code (e.g. "+1" -> "US")
  const getCountryIso = (dialCode?: string) => {
    if (!dialCode) return 'US'; // Default
    const cleanCode = dialCode.replace('+', '');
    const country = countries.find((c) => c.phone === cleanCode);
    return country ? country.code : 'US';
  };

  // Helper to find dial code from ISO code (e.g. "US" -> "+1")
  const getDialCode = (isoCode: string) => {
    const country = countries.find((c) => c.code === isoCode);
    return country ? `+${country.phone}` : '';
  };

  const initialValues = {
    name: user?.name || '',
    phone_no: user?.phone_no || '',
    country_iso: getCountryIso(user?.phone_ext),
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone_no: Yup.string()
      .required('Phone number is required')
      .test('is-valid-phone', 'Invalid phone number', function (value) {
        const { country_iso } = this.parent;
        return isValidPhoneNumber(value || '', country_iso);
      }),
    country_iso: Yup.string().required('Country code is required'),
  });

  const handleSubmit = (values: typeof initialValues) => {
    onSave({
      name: values.name,
      phone_no: values.phone_no,
      phone_ext: getDialCode(values.country_iso),
    });
  };

  const actions = (onClose: () => void, submitForm: () => void) => (
    <Stack direction="row" spacing={2}>
      <CustomButton variant="outlined" onClick={onClose} disabled={loading}>
        Cancel
      </CustomButton>
      <CustomButton variant="contained" onClick={submitForm} loading={loading}>
        Save Changes
      </CustomButton>
    </Stack>
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ submitForm, resetForm }) => {
        // Handle closing via standard modal close
        const handleClose = () => {
          resetForm();
          onClose();
        };

        return (
          <ResponsiveModal
            open={open}
            onClose={handleClose}
            title="Edit Profile"
            actions={actions(handleClose, submitForm)}
            maxWidth="sm"
            disableBackdropClick={loading}
          >
            <Form>
              <Box sx={{ width: '100%' }}>
                <FormikInput
                  label="Full Name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                />

                <Box sx={{ mt: 2 }}>
                  <FormikPhoneNumber
                    label="Phone Number"
                    name="phone_no"
                    countryCodeName="country_iso"
                    required
                  />
                </Box>
              </Box>
            </Form>
          </ResponsiveModal>
        );
      }}
    </Formik>
  );
};

export default EditProfileModal;
