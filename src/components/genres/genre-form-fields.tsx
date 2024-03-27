import React from "react";
import TextField from "@mui/material/TextField";
import { FormikProps } from "formik";

const GenreFormFields = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}: FormikProps<any> & any) => (
  <>
    <TextField
      key="name"
      id="name"
      label="Name"
      name="name"
      fullWidth
      variant="outlined"
      margin="dense"
      sx={{ my: 2 }}
      value={values.name}
      onChange={handleChange}
      onBlur={handleBlur}
      helperText={touched.name && errors.name}
      error={Boolean(errors.name) && touched.name}
      required></TextField>
  </>
);

export default GenreFormFields;
