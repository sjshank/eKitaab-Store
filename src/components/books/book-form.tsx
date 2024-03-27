import React, { useMemo } from "react";
import { FormikProps } from "formik";
import { withFormik } from "formik";
import { TAuthor, TBookFormFields, TGenre } from "@/types/book";
import FormLayout from "@/layouts/form";
import { BookFormSchema } from "@/utils/yup-schema";
import MenuItem from "@mui/material/MenuItem";
import BookFormFields from "./book-form-fields";

export type TBookFormProps = {
  book: TBookFormFields;
  onSubmit: (bookFormFieldValues: TBookFormFields) => void;
  buttonLbl?: string;
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
      _id: props.book?._id || "",
      title: props.book?.title || "",
      author: props.book?.author || "",
      genre: props.book?.genre || "",
      isbn: props.book?.isbn || "",
      summary: props.book?.summary || "",
    };
  },
  validationSchema: BookFormSchema,

  handleSubmit: (values, formikBag) => {
    const { props, setSubmitting } = formikBag;
    // console.log(values);
    props.onSubmit(values);
    setSubmitting(false);
  },
})(ConnectedForm);

export default BookForm;
