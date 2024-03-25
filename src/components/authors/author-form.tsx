import React, { useMemo } from "react";
import { FormikProps } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { withFormik } from "formik";
import { TAuthor } from "@/types/book";
import SaveAltRoundedIcon from "@mui/icons-material/SaveAltRounded";
import FormLayout from "@/layouts/form";
import { AuthorFormSchema } from "@/utils/yup-schema";
import { AuthorFormFields } from "@/utils/form-fields";

export type TAuthorFormProps = {
  author: TAuthor;
  onSubmit: (author: TAuthor) => void;
  buttonLbl?: string;
};

const ConnectedForm = (props: TAuthorFormProps & FormikProps<TAuthor>) => {
  const { touched, errors, values } = props;

  return (
    <FormLayout formikProps={props} formFields={AuthorFormFields}>
      <DatePicker
        label="Date Of Birth (optional)"
        name="date_of_birth"
        sx={{ my: 2 }}
        autoFocus={false}
        reduceAnimations={true}
        formatDensity="spacious"
        value={dayjs(values.date_of_birth)}
        maxDate={dayjs().subtract(5, "years")}
        onChange={(value) =>
          value ??
          props.setFieldValue("date_of_birth", dayjs(value).toISOString(), true)
        }
        slotProps={{
          textField: {
            margin: "dense",
            helperText: touched.date_of_birth && errors.date_of_birth,
          },
        }}
        disableFuture
      />
      <DatePicker
        label="Date Of Death (optional)"
        name="date_of_death"
        sx={{ my: 2 }}
        autoFocus={false}
        reduceAnimations={true}
        formatDensity="spacious"
        // value={dayjs(values.date_of_death)}
        maxDate={dayjs().subtract(1, "day")}
        onChange={(value) =>
          value ??
          props.setFieldValue("date_of_death", dayjs(value).toISOString(), true)
        }
        slotProps={{
          textField: {
            margin: "dense",
            helperText: touched.date_of_death && errors.date_of_death,
          },
        }}
        disableFuture
      />
    </FormLayout>
  );
};

const AuthorForm = withFormik<TAuthorFormProps, TAuthor>({
  mapPropsToValues: (props) => {
    return {
      _id: props.author?._id || "",
      family_name: props.author?.family_name || "",
      first_name: props.author?.first_name || "",
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
    console.log(values);
    props.onSubmit(values);
    setSubmitting(false);
  },
})(ConnectedForm);

export default AuthorForm;
