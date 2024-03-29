import React from "react";
import { FormikProps } from "formik";
import { withFormik } from "formik";
import { TBook, TBookInstanceFormFields } from "@/types/book";
import FormLayout from "@/layouts/form";
import { BookInstanceFormSchema } from "@/utils/yup-schema";
import BookInstanceFormFields from "./book-instance-form-fields";
import dayjs from "dayjs";

export type TBookInstanceFormProps = {
  bookInstance: TBookInstanceFormFields;
  onSubmit: (bookInstanceFormFieldValues: TBookInstanceFormFields) => void;
  books: TBook[];
};

const ConnectedForm = (
  props: TBookInstanceFormProps & FormikProps<TBookInstanceFormFields>
) => {
  return (
    <FormLayout formikProps={props}>
      <BookInstanceFormFields {...props} />
    </FormLayout>
  );
};

const BookInstanceForm = withFormik<
  TBookInstanceFormProps,
  TBookInstanceFormFields
>({
  mapPropsToValues: (props) => {
    return {
      _id: props.bookInstance?._id || "",
      book: props.bookInstance?.book || "",
      due_back:
        props.bookInstance?.due_back || dayjs().add(1, "day").toISOString(),
      imprint: props.bookInstance?.imprint || "",
      status: props.bookInstance?.status || "Available",
    };
  },
  validationSchema: BookInstanceFormSchema,

  handleSubmit: (values, formikBag) => {
    const { props, setSubmitting } = formikBag;
    props.onSubmit(values);
    setSubmitting(false);
  },
})(ConnectedForm);

export default BookInstanceForm;
