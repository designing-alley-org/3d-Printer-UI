import { useState } from 'react';
import toast from 'react-hot-toast';
import { updatePassword } from '../../store/actions/updatePassword';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from '@mui/material';
import CustomButton from '../../stories/button/CustomButton';
import { Formik, Form, FormikHelpers } from 'formik';
import { changePasswordValidationSchema } from '../../validation/authValidation';
import CustomInputLabelField from '../../stories/inputs/CustomInputLabelField';

interface FormState {
  old_password: string;
  new_password: string;
  confirmPassword: string;
}

const initialValues: FormState = {
  old_password: '',
  new_password: '',
  confirmPassword: '',
};

const Password = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    values: FormState,
    { resetForm }: FormikHelpers<FormState>
  ) => {
    try {
      setLoading(true);
      const { old_password, new_password } = values;
      const response = updatePassword(old_password, new_password);
      await toast.promise(response, {
        loading: 'Updating...',
        success: 'Password updated successfully',
        error: 'Failed to update password',
      });
      resetForm();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      sx={{
        p:0,
      }}
    >
      <Card>
        <CardHeader
          title="Security Settings"
          subheader=" Manage your account security and authentication"
        />
        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={changePasswordValidationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isValid,
              dirty,
            }) => (
              <Form>
                <Box maxWidth={500}>
                  <CustomInputLabelField
                    label="Current Password"
                    name="old_password"
                    type="password"
                    value={values.old_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.old_password && Boolean(errors.old_password)}
                    helperText={
                      touched.old_password ? errors.old_password : undefined
                    }
                    placeholder="Enter your current password"
                    required
                    sx={{ mb: 2 }}
                  />

                  <CustomInputLabelField
                    label="New Password"
                    name="new_password"
                    type="password"
                    value={values.new_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.new_password && Boolean(errors.new_password)}
                    helperText={
                      touched.new_password ? errors.new_password : undefined
                    }
                    placeholder="Enter your new password"
                    required
                    sx={{ mb: 2 }}
                  />

                  <CustomInputLabelField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword
                        ? errors.confirmPassword
                        : undefined
                    }
                    placeholder="Confirm your new password"
                    required
                    sx={{ mb: 2 }}
                  />

                  <CustomButton
                    children={'Update password'}
                    disabled={!isValid || !dirty || loading}
                    loading={loading}
                    type="submit"
                    variant="contained"
                  />
                </Box>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>

      <Card sx={{ marginTop: '1rem' }}>
        <CardHeader title="Two-Factor Authentication (2FA)" />
      </Card>
    </Container>
  );
};

export default Password;
