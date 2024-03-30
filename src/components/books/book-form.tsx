import React from "react";
import { FormikProps } from "formik";
import { withFormik } from "formik";
import { TAuthor, TBookFormFields, TGenre } from "@/types/book";
import FormLayout from "@/layouts/form";
import { BookFormSchema } from "@/utils/yup-schema";
import BookFormFields from "./book-form-fields";

export type TBookFormProps = {
  book: TBookFormFields;
  onSubmit: (
    bookFormFieldValues: TBookFormFields,
    setIsSubmitting: (flag: boolean) => void
  ) => void;
  authors: TAuthor[];
  genres: TGenre[];
};

const ConnectedForm = (
  props: TBookFormProps & FormikProps<TBookFormFields>
) => {
  const { authors, genres } = props;

  return (
    <FormLayout formikProps={props}>
      <BookFormFields {...props} authors={authors} genres={genres} />
    </FormLayout>
  );
};

const BookForm = withFormik<TBookFormProps, TBookFormFields>({
  mapPropsToValues: (props) => {
    return {
      ...props.book,
    };
  },
  validationSchema: BookFormSchema,

  handleSubmit: (values, formikBag) => {
    const { props, setSubmitting } = formikBag;
    props.onSubmit(values, setSubmitting);
  },
})(ConnectedForm);

export default BookForm;
