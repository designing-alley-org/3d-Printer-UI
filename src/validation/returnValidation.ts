import * as Yup from 'yup';

export const returnValidationSchema = Yup.object({
  returnReason: Yup.string()
    .required('Return reason is required')
    .test('word-count', 'Return reason must be at least 10 words', (value) => {
      if (!value) return false;
      const wordCount = value
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
      return wordCount >= 10;
    })
    .max(500, 'Return reason must not exceed 500 characters'),
  images: Yup.array()
    .min(2, 'At least 2 images are required')
    .max(5, 'Maximum 5 images allowed')
    .required('Images are required'),
});

export type ReturnFormValues = Yup.InferType<typeof returnValidationSchema>;
