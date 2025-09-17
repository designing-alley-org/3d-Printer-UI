import * as Yup from 'yup';

// Address validation schema
export const addressValidationSchema = Yup.object({
  personName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  streetLines: Yup.string()
    .min(5, 'Street address must be at least 5 characters')
    .required('Street address is required'),
  city: Yup.string()
    .min(2, 'City must be at least 2 characters')
    .required('City is required'),
  countryCode: Yup.string()
    .matches(/^[A-Z]{2}$/, 'Enter a valid country code (e.g., GB)')
    .required('Country code is required'),
  postalCode: Yup.string()
    .matches(/^(GIR 0AA|[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2})$/i, 'Enter a valid UK postal code')
    .required('Postal code is required'),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  addressType: Yup.string()
    .min(2, 'Address type must be at least 2 characters')
    .required('Address type is required'),
});
