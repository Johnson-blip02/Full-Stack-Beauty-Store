import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required(),
  brand: yup.string().required(),
  category: yup.string().required(),
  price: yup.number().required().positive(),
  stockQuantity: yup.number().required().positive(),
  file: yup.mixed().when("pictureUrl", {
    is: (value: string) => !value,
    then: (schema) => schema.required("Please provide an image"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
