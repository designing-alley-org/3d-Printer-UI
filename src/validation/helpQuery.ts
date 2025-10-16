import * as Yup from 'yup';

export interface HelpFormData {
  type: string;
  _id: string;
  orderId: string | null;
  subject: string;
  message: string;
}

export const getValidationSchema = (isOtherSelected: boolean) =>
  Yup.object({
    type: Yup.string().required('Query type is required'),
    orderId: isOtherSelected
      ? Yup.mixed().nullable()
      : Yup.string().required('Order ID is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

export type helpValidationSchema = ReturnType<typeof getValidationSchema>;
