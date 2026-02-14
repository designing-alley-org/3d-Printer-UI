import * as Yup from 'yup';
import type { InferType } from 'yup';

// Form validation schema - matches backend MongoDB Address model
// Only includes fields that are required in the MongoDB schema
export const addressFormSchema = Yup.object({
  // Required fields from backend
  addressType: Yup.string()
    .oneOf(
      ['home', 'office', 'workshop', 'billing', 'shipping', 'other'],
      'Invalid address type'
    )
    .required('Address type is required'),

  personName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters')
    .trim()
    .required('Name is required'),

  // Phone number (flat for form input)
  phoneNumber: Yup.string()
    .matches(/^\d+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),

  // Country code for phone dial code (managed by FormikPhoneNumber)
  countryCode: Yup.string()
    .matches(/^[A-Z]{2}$/, 'Enter a valid country code')
    .required('Country is required'),

  email: Yup.string()
    .email('Invalid email address')
    .lowercase()
    .trim()
    .required('Email is required'),

  // Street lines (single string in form, will be converted to array for backend)
  streetLines: Yup.string()
    .min(5, 'Street address must be at least 5 characters')
    .required('Street address is required'),

  city: Yup.string()
    .min(2, 'City must be at least 2 characters')
    .trim()
    .required('City is required'),

  postalCode: Yup.string().trim().required('Postal code is required'),

  // Optional fields from backend
  companyName: Yup.string()
    .max(150, 'Company name must be at most 150 characters')
    .trim()
    .optional(),

  stateProvince: Yup.string().trim().optional(),
});

// Infer TypeScript type from Yup schema
export type AddressFormValues = InferType<typeof addressFormSchema>;

// Backend payload schema - matches exact MongoDB structure
export const createAddressPayloadSchema = Yup.object({
  addressType: Yup.string()
    .oneOf(['home', 'office', 'workshop', 'billing', 'shipping', 'other'])
    .required(),

  personName: Yup.string().max(100).required(),

  companyName: Yup.string().max(150).optional(),

  phone: Yup.object({
    dialCode: Yup.string()
      .matches(/^\+\d{1,4}$/, 'Invalid dial code')
      .required(),
    number: Yup.string().required(),
  }).required(),

  email: Yup.string().email().required(),

  streetLines: Yup.array()
    .of(Yup.string().required())
    .min(1, 'Must provide at least 1 street line')
    .max(3, 'Must provide at most 3 street lines')
    .required(),

  city: Yup.string().required(),

  stateProvince: Yup.string().optional(),

  postalCode: Yup.string().required(),

  country: Yup.object({
    name: Yup.string().required(),
    isoCode: Yup.string()
      .matches(/^[A-Z]{2}$/)
      .required(),
  }).required(),

  orderId: Yup.string().optional(),
});

// Infer TypeScript type for backend payload
export type CreateAddressPayload = InferType<typeof createAddressPayloadSchema>;

// Full Address type from backend (with MongoDB fields)
export interface Address extends CreateAddressPayload {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
// Export the validation schema with a more common name
export const addressValidationSchema = addressFormSchema;
