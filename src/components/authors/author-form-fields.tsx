import React from "react";
import TextField from "@mui/material/TextField";
import { TextFieldProps } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { FormikProps } from "formik";

const CommonDatePickerProps: Partial<DatePickerProps<any>> = {
  autoFocus: false,
  formatDensity: "spacious",
  reduceAnimations: true,
  sx: { my: 2 },
  disableFuture: true,
};

const CommonTextFieldProps: Partial<TextFieldProps> = {
  fullWidth: true,
  variant: "outlined",
  margin: "dense",
  sx: { my: 2 },
};

const AuthorFieldProps: any = {
  firstName: {
    ...CommonTextFieldProps,
    id: "first_name",
    name: "first_name",
    label: "First Name",
    value: "first_name",
    required: true,
  },
  familyName: {
    ...CommonTextFieldProps,
    id: "family_name",
    name: "family_name",
    label: "Family Name",
    value: "family_name",
    required: true,
  },

  dateOfBirth: {
    id: "date_of_birth",
    name: "date_of_birth",
    label: "Date Of Birth (optional)",
    maxDate: dayjs().subtract(5, "years"),
  },
  dateOfDeath: {
    id: "date_of_death",
    name: "date_of_death",
    label: "Date Of Death (optional)",
    maxDate: dayjs().subtract(1, "day"),
  },
};

const AuthorFormFields: React.FunctionComponent<FormikProps<any> & any> = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  setFieldValue,
}) => (
  <>
    <TextField
      {...AuthorFieldProps.firstName}
      value={values[AuthorFieldProps.firstName.name]}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={
        touched[AuthorFieldProps.firstName.name] &&
        errors[AuthorFieldProps.firstName.name]
      }
      error={
        Boolean(errors[AuthorFieldProps.firstName.name]) &&
        touched[AuthorFieldProps.firstName.name]
      }></TextField>
    <TextField
      {...AuthorFieldProps.familyName}
      value={values[AuthorFieldProps.familyName.name]}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={
        touched[AuthorFieldProps.familyName.name] &&
        errors[AuthorFieldProps.familyName.name]
      }
      error={
        Boolean(errors[AuthorFieldProps.familyName.name]) &&
        touched[AuthorFieldProps.familyName.name]
      }></TextField>
    <DatePicker
      {...CommonDatePickerProps}
      {...AuthorFieldProps.dateOfBirth}
      value={dayjs(values.date_of_birth)}
      onChange={(value) =>
        value ??
        setFieldValue("date_of_birth", dayjs(value).toISOString(), true)
      }
      slotProps={{
        textField: {
          margin: "dense",
          helperText: touched.date_of_birth && errors.date_of_birth,
        },
      }}
    />
    <DatePicker
      {...CommonDatePickerProps}
      {...AuthorFieldProps.dateOfDeath}
      // value={dayjs(values.date_of_death)}
      onChange={(value) =>
        value ??
        setFieldValue("date_of_death", dayjs(value).toISOString(), true)
      }
      slotProps={{
        textField: {
          margin: "dense",
          helperText: touched.date_of_death && errors.date_of_death,
        },
      }}
    />
  </>
);

export default AuthorFormFields;
