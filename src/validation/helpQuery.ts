import * as Yup from "yup";

export const getValidationSchema = (isOtherSelected: boolean) =>
  Yup.object({
    queryType: Yup.string().required("Query type is required"),
    orderId: isOtherSelected
      ? Yup.mixed().nullable()
      : Yup.object({
          title: Yup.string().required(),
        }).required("Order ID is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().nullable(),
  });

export type ValidationSchema = ReturnType<typeof getValidationSchema>;
