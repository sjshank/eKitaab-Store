import React from "react";
import { FormikProps } from "formik";
import { withFormik } from "formik";
import { TGenre } from "@/types/book";
import FormLayout from "@/layouts/form";
import { GenreFormSchema } from "@/utils/yup-schema";
import GenreFormFields from "./genre-form-fields";

export type TGenreFormProps = {
  genre: TGenre;
  onSubmit: (genre: TGenre, setIsSubmitting: (flag: boolean) => void) => void;
};

const ConnectedForm = (props: TGenreFormProps & FormikProps<TGenre>) => {
  return (
    <FormLayout formikProps={props}>
      <GenreFormFields {...props} />
    </FormLayout>
  );
};

const GenreForm = withFormik<TGenreFormProps, TGenre>({
  mapPropsToValues: (props) => {
    return {
      ...props.genre,
    };
  },
  validationSchema: GenreFormSchema,

  handleSubmit: (values, formikBag) => {
    const { props, setSubmitting } = formikBag;
    props.onSubmit(values, setSubmitting);
  },
})(ConnectedForm);

export default GenreForm;
