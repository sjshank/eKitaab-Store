import React from "react";
import { FormikProps } from "formik";
import dayjs from "dayjs";
import { withFormik } from "formik";
import { TAuthor } from "@/types/book";
import FormLayout from "@/layouts/form";
import { AuthorFormSchema } from "@/utils/yup-schema";
import AuthorFormFields from "./author-form-fields";

export type TAuthorFormProps = {
  author: TAuthor;
  onSubmit: (author: TAuthor, setIsSubmitting: (flag: boolean) => void) => void;
};

const ConnectedForm = (props: TAuthorFormProps & FormikProps<TAuthor>) => {
  return (
    <FormLayout formikProps={props}>
      <AuthorFormFields {...props} />
    </FormLayout>
  );
};

const AuthorForm = withFormik<TAuthorFormProps, TAuthor>({
  mapPropsToValues: (props) => {
    return {
      ...props.author,
      date_of_birth:
        props.author?.date_of_birth ||
        dayjs().subtract(5, "years").toISOString(),
      date_of_death:
        props.author?.date_of_death || dayjs().subtract(1, "day").toISOString(),
    };
  },
  validationSchema: AuthorFormSchema,

  handleSubmit: (values, formikBag) => {
    const { props, setSubmitting } = formikBag;
    props.onSubmit(values, setSubmitting);
  },
})(ConnectedForm);

export default AuthorForm;
