import { Box, Card, CardContent, CardHeader, Container } from '@mui/material';
import CustomButton from '../../stories/button/CustomButton';
import { Formik, Form, FormikHelpers } from 'formik';
import {
  changePasswordValidationSchema,
  ChangePasswordValue,
  forgotPasswordValidationSchema,
} from '../../validation/authValidation';
import FormikInput from '../../stories/inputs/FormikInput';
import { useUpdateEmail, useUpdatePassword } from '../../features/user/hook';

const initialValues: ChangePasswordValue = {
  old_password: '',
  new_password: '',
  confirmPassword: '',
};

const Password = () => {
  const { mutate: updatePasswordMutate, isPending: isUpdatingPassword } =
    useUpdatePassword();
  const { mutate: updateEmailMutate, isPending: isUpdatingEmail } =
    useUpdateEmail();

  const handleSubmit = (
    values: ChangePasswordValue,
    { resetForm }: FormikHelpers<ChangePasswordValue>
  ) => {
    const { old_password, new_password } = values;
    updatePasswordMutate(
      { old_password, new_password },
      {
        onSuccess: () => {
          resetForm();
        },
      }
    );
  };

  return (
    <Container
      sx={{
        p: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {/* Email update */}

      <Card sx={{ marginTop: '1rem' }}>
        <CardHeader
          title="Email Settings"
          subheader="Manage your account email address"
        />
        <CardContent>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={forgotPasswordValidationSchema}
            onSubmit={(values, { resetForm }) => {
              updateEmailMutate(
                { new_email: values.email },
                {
                  onSuccess: () => {
                    resetForm();
                  },
                }
              );
            }}
          >
            {({ isValid, dirty }) => (
              <Form>
                <Box maxWidth={500}>
                  <FormikInput
                    label="New Email"
                    name="email"
                    type="email"
                    placeholder="Enter your new email"
                    required
                    sx={{ mb: 2 }}
                  />

                  <CustomButton
                    children={'Update Email'}
                    disabled={!isValid || !dirty || isUpdatingEmail}
                    loading={isUpdatingEmail}
                    type="submit"
                    variant="contained"
                  />
                </Box>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
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
            {({ isValid, dirty }) => (
              <Form>
                <Box maxWidth={500}>
                  <FormikInput
                    label="Current Password"
                    name="old_password"
                    type="password"
                    placeholder="Enter your current password"
                    required
                    sx={{ mb: 2 }}
                  />

                  <FormikInput
                    label="New Password"
                    name="new_password"
                    type="password"
                    placeholder="Enter your new password"
                    required
                    sx={{ mb: 2 }}
                  />

                  <FormikInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your new password"
                    required
                    sx={{ mb: 2 }}
                  />

                  <CustomButton
                    children={'Update password'}
                    disabled={!isValid || !dirty || isUpdatingPassword}
                    loading={isUpdatingPassword}
                    type="submit"
                    variant="contained"
                  />
                </Box>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Password;
