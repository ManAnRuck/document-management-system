import * as yup from 'yup';

export const newDocumentValidationSchema = yup.object().shape({
  title: yup
    .string()
    .min(3)
    .max(255)
    .required(),
});
