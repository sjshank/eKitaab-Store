import React from "react";
import { FormikProps } from "formik";
import TextField from "@mui/material/TextField";
import { withFormik } from "formik";
import { TGenre } from "@/types/book";
import SaveAltRoundedIcon from "@mui/icons-material/SaveAltRounded";
import FormLayout from "@/layouts/form";
import { GenreFormSchema } from "@/utils/yup-schema";
import { GenreFormFields } from "@/utils/form-fields";

export type TGenreFormProps = {
  genre: TGenre;
  onSubmit: (genre: TGenre) => void;
  buttonLbl?: string;
};

const ConnectedForm = (props: TGenreFormProps & FormikProps<TGenre>) => {
  return (
    <FormLayout formikProps={props} formFields={GenreFormFields}></FormLayout>
  );
};

const GenreForm = withFormik<TGenreFormProps, TGenre>({
  mapPropsToValues: (props) => {
    return {
      _id: props.genre?._id || "",
      name: props.genre?.name || "",
    };
  },
  validationSchema: GenreFormSchema,

  handleSubmit: (values, formikBag) => {
    const { props, setSubmitting } = formikBag;
    props.onSubmit(values);
    setSubmitting(false);
  },
})(ConnectedForm);

export default GenreForm;
