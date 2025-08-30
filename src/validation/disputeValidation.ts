import * as Yup from 'yup';

export const disputeValidationSchema = Yup.object({
  disputeType: Yup.object()
    .shape({
      id: Yup.mixed().required(),
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .required('Dispute type is required'),
  disputeReason: Yup.string()
    .required('Dispute reason is required')
    .min(10, 'Dispute reason must be at least 10 characters')
    .max(500, 'Dispute reason must not exceed 500 characters'),
});

export type DisputeFormValues = Yup.InferType<typeof disputeValidationSchema>;
