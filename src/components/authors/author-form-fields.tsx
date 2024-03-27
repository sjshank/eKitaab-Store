import React from "react";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { FormikProps } from "formik";

const AuthorFieldProps = {
  firstName: {
    id: "first_name",
    name: "first_name",
    label: "First Name",
    value: "first_name",
    required: true,
  },
  familyName: {
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
  },
  dateOfDeath: {
    id: "date_of_death",
    name: "date_of_death",
    label: "Date Of Death (optional)",
  },
};

const AuthorFormFields = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  setFieldValue,
}: FormikProps<any> & any) => (
  <>
    <TextField
      {...AuthorFieldProps.firstName}
      fullWidth
      variant="outlined"
      margin="dense"
      sx={{ my: 2 }}
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
      }
      required></TextField>
    <TextField
      {...AuthorFieldProps.familyName}
      fullWidth
      variant="outlined"
      margin="dense"
      sx={{ my: 2 }}
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
      {...AuthorFieldProps.dateOfBirth}
      sx={{ my: 2 }}
      autoFocus={false}
      reduceAnimations={true}
      formatDensity="spacious"
      value={dayjs(values.date_of_birth)}
      maxDate={dayjs().subtract(5, "years")}
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
      disableFuture
    />
    <DatePicker
      {...AuthorFieldProps.dateOfDeath}
      sx={{ my: 2 }}
      autoFocus={false}
      reduceAnimations={true}
      formatDensity="spacious"
      // value={dayjs(values.date_of_death)}
      maxDate={dayjs().subtract(1, "day")}
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
      disableFuture
    />
  </>
);

export default AuthorFormFields;
