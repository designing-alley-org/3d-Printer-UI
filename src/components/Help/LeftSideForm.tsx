import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  MenuItem,
  Select,
  Typography,
  CircularProgress,
  TextField,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { AppDispatch } from '../../store/store';
import CustomButton from '../../stories/button/CustomButton';
import { getValidationSchema, HelpFormData } from '../../validation/helpQuery';
import { getUserOrderIdsService } from '../../services/order';
import { queryTypeOptions } from '../../constant/dropDownOption';
import { createQuery } from '../../store/Slice/querySlice';

const InputStyle = {
  '& .MuiInputBase-root': {
    color: 'primary.contrastText',
  },
  '& .MuiInputLabel-root': {
    color: 'primary.contrastText',
    '&.Mui-focused': {
      color: 'primary.contrastText',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'primary.contrastText',
  },
  '& .MuiOutlinedInput-root': {
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'primary.contrastText',
      opacity: 0.8,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'primary.contrastText',
      borderWidth: '2px',
    },
  },
  '& .MuiFormHelperText-root': {
    color: '#ffcdd2',
  },
};

type OrderOption = {
  title: string;
};

interface FormValues {
  type: string;
  orderId: OrderOption | null;
  subject: string;
  message: string;
}

// fake fetch orders for demo
const fetchOrders = async (): Promise<OrderOption[]> => {
  const orders = await getUserOrderIdsService();
  return orders.map((i: { _id: string }) => ({ title: i._id }));
};

const LeftSideForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<OrderOption[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpen = async () => {
    setOpen(true);
    setLoading(true);
    const orders = await fetchOrders();
    setOptions(orders);
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  const initialValues: FormValues = {
    type: '',
    orderId: null,
    subject: '',
    message: '',
  };

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      const payload: HelpFormData = {
        type: values.type,
        orderId: values.orderId,
        subject: values.subject,
        message: values.message,
      };
      
      await dispatch(createQuery(payload)).unwrap();
      
      // Show success notification
      toast.success('Query submitted successfully!');
      
      // Reset form on successful submission
      helpers.resetForm();
    } catch (error) {
      console.error('Error creating query:', error);
      toast.error('Failed to submit query. Please try again.');
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 430, backgroundColor: 'primary.main', flex: 1 }}>
      <CardHeader
        title={
          <Typography variant="h6" color="primary.contrastText" gutterBottom>
            Contact Support
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="primary.contrastText">
            Sub text will be displayed here guiding user to submit any type of
            query they have.
          </Typography>
        }
      />

      <Formik
        initialValues={initialValues}
        validate={(values: FormValues) => {
          try {
            const schema = getValidationSchema(values.type !== 'Order Issue');
            schema.validateSync(values, { abortEarly: false });
            return {};
          } catch (err: any) {
            if (err.inner) {
              return err.inner.reduce((errors: any, error: any) => {
                return { ...errors, [error.path]: error.message };
              }, {});
            }
            return {};
          }
        }}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => (
          <Form>
            <CardContent>
              {/* Query Type */}
              <FormControl fullWidth margin="normal">
                <Select
                  value={values.type}
                  onChange={(e) => setFieldValue('type', e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        borderRadius: '8px',
                        mt: 1,
                      },
                    },
                  }}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <Typography
                          sx={{
                            color: 'primary.contrastText',
                            opacity: 0.7,
                          }}
                        >
                          Query Select
                        </Typography>
                      );
                    }
                    const selectedOption = queryTypeOptions.find(
                      (option) => option.value === selected
                    );
                    return selectedOption ? selectedOption.label : selected;
                  }}
                  sx={{
                    color: 'primary.contrastText',
                    '& .MuiSelect-select': {
                      color: 'primary.contrastText',
                    },
                    '& .MuiSelect-icon': {
                      color: 'primary.contrastText',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.contrastText',
                      borderWidth: '1px',
                      borderRadius: '8px',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.contrastText',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.contrastText',
                    },
                  }}
                >
                  {queryTypeOptions.map((option) => (
                    <MenuItem key={option.id} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.type && touched.type && (
                  <Typography color="error" sx={{ color: '#ffcdd2' }}>
                    {errors.type}
                  </Typography>
                )}
              </FormControl>

              {/* Order ID - visible if queryType !== Order Issue */}
              {values.type == 'Order Issue' && (
                <FormControl fullWidth margin="normal">
                  <Autocomplete<OrderOption, false, false, false>
                    open={open}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    isOptionEqualToValue={(option, value) =>
                      option.title === value?.title
                    }
                    getOptionLabel={(option) => option.title}
                    options={options}
                    sx={{
                      '& .MuiInputBase-root': {
                        color: 'primary.contrastText',
                      },
                      '& .MuiInputLabel-root': {
                        color: 'primary.contrastText',
                        '&.Mui-focused': {
                          color: 'primary.contrastText',
                        },
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.contrastText',
                      },
                      '& .MuiOutlinedInput-root': {
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.contrastText',
                          opacity: 0.8,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.contrastText',
                          borderWidth: '2px',
                        },
                      },
                      '& .MuiAutocomplete-popupIndicator': {
                        color: 'primary.contrastText',
                      },
                      '& .MuiAutocomplete-clearIndicator': {
                        color: 'primary.contrastText',
                      },
                    }}
                    loading={loading}
                    value={values.orderId}
                    onChange={(_, value) => setFieldValue('orderId', value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Order ID"
                        error={!!errors.orderId && touched.orderId}
                        helperText={
                          touched.orderId && typeof errors.orderId === 'string'
                            ? errors.orderId
                            : ''
                        }
                        sx={{
                          '& .MuiFormHelperText-root': {
                            color: '#ffcdd2',
                          },
                        }}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                  />
                </FormControl>
              )}

              {/* Subject */}
              <FormControl fullWidth margin="normal">
                <Field
                  as={TextField}
                  name="subject"
                  label="Subject"
                  error={!!errors.subject && touched.subject}
                  helperText={touched.subject && errors.subject}
                  sx={{ ...InputStyle }}
                />
              </FormControl>

              {/* Message */}
              <FormControl fullWidth margin="normal">
                <Field
                  as={TextField}
                  name="message"
                  label="Message"
                  multiline
                  rows={3}
                  error={!!errors.message && touched.message}
                  helperText={touched.message && errors.message}
                  sx={{ ...InputStyle }}
                />
              </FormControl>
            </CardContent>

            <CardActions>
              <CustomButton
                type="submit"
                variant="outlined"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </CustomButton>
            </CardActions>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default LeftSideForm;
