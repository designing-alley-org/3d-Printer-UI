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
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Formik, Form, Field, FormikHelpers } from "formik";
import React, { useState } from "react";
import CustomButton from "../../stories/button/CustomButton";
import { getValidationSchema } from "../../validation";


type OrderOption = {
  title: string;
};

interface FormValues {
  queryType: string;
  orderId: OrderOption | null;
  subject: string;
  message: string;
}

// fake fetch orders for demo
const fetchOrders = async (): Promise<OrderOption[]> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { title: "Order #1234" },
        { title: "Order #5678" },
        { title: "Order #91011" },
      ]);
    }, 1000)
  );
};

const LeftSideForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<OrderOption[]>([]);
  const [loading, setLoading] = useState(false);

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
    queryType: "",
    orderId: null,
    subject: "",
    message: "",
  };

  const handleSubmit = (values: FormValues, helpers: FormikHelpers<FormValues>) => {
    console.log("Form Submitted:", values);
    helpers.setSubmitting(false);
  };

  return (
    <Card sx={{ maxWidth: 430, backgroundColor: "primary.main", color: "primary.contrastText", flex: 1 }}>
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
            const schema = getValidationSchema(values.queryType === "Other");
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
                  value={values.queryType}
                  displayEmpty
                  onChange={(e) => setFieldValue("queryType", e.target.value)}
                  sx={{
                    "& .MuiSelect-select": { color: "primary.contrastText" },
                    "& .MuiInputLabel-root": { color: "primary.contrastText" },
                    "& .MuiOutlinedInput-root": {     
                      "& fieldset": {
                        borderColor: "primary.contrastText",
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.contrastText",
                        opacity: 0.8,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "primary.contrastText",
                      },
                    },
                  }}
                  inputProps={{ 'aria-label': 'Query Type' }}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Payment">Payment</MenuItem>
                  <MenuItem value="Query">Query</MenuItem>
                  <MenuItem value="Quality">Quality</MenuItem>
                  <MenuItem value="Delivery">Delivery</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {errors.queryType && touched.queryType && (
                  <Typography color="error">{errors.queryType}</Typography>
                )}
              </FormControl>

              {/* Order ID - visible if queryType !== Other */}
              {values.queryType !== "Other" && (
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
                      "& .MuiInputBase-root": { color: "primary.contrastText" },
                      "& .MuiInputLabel-root": { color: "primary.contrastText" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "primary.contrastText",
                        },
                        "&:hover fieldset": {
                          borderColor: "primary.contrastText",
                          opacity: 0.8,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "primary.contrastText",
                        },
                      },
                    }}
                    loading={loading}
                    value={values.orderId}
                    onChange={(_, value) => setFieldValue("orderId", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Order ID"
                        error={!!errors.orderId && touched.orderId}
                        helperText={
                          touched.orderId && typeof errors.orderId === "string"
                            ? errors.orderId
                            : ""
                        }
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
                   sx={{
                    "& .MuiInputBase-root": { color: "primary.contrastText" },
                    "& .MuiInputLabel-root": { color: "primary.contrastText" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "primary.contrastText",
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.contrastText",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "primary.contrastText",
                      },
                    },
                  }}
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
                  sx={{
                    "& .MuiInputBase-root": { color: "primary.contrastText" },
                    "& .MuiInputLabel-root": { color: "primary.contrastText" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "primary.contrastText",
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.contrastText",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "primary.contrastText",
                      },
                    },
                  }}
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
                {isSubmitting ? "Submitting..." : "Submit"}
              </CustomButton>
            </CardActions>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default LeftSideForm;
