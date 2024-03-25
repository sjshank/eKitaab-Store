import React, { useContext, useMemo } from "react";
import { FormikProps, Form } from "formik";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import { useRouter } from "next/router";
import { FormContext, TFormContext } from "@/context/form-context";
import SaveAltRoundedIcon from "@mui/icons-material/SaveAltRounded";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

type TFormProps = {
  children?: React.ReactNode;
  formikProps: FormikProps<any> & any;
  formFields?: any;
};

const FormLayout: React.FunctionComponent<TFormProps> = ({
  children = null,
  formikProps,
  formFields = {},
}) => {
  const router = useRouter();
  const { formLegends, updateFormLegends } =
    useContext<TFormContext>(FormContext);
  const { formTitle, ctaLabel } = formLegends;
  const { isSubmitting, touched, errors, handleChange, handleBlur, values } =
    formikProps;

  const populateTextFields = useMemo(() => {
    if (!formFields.textFields || formFields.textFields.length == 0) {
      return null;
    }
    const textFields = formFields.textFields;
    return (
      <>
        {textFields.map((field: any) => (
          <TextField
            key={field.id}
            id={field.id}
            label={field.label}
            name={field.name}
            fullWidth
            variant="outlined"
            margin="dense"
            sx={{ my: 2 }}
            value={values[field.value]}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched[field.value] && errors[field.value]}
            error={Boolean(errors[field.value]) && touched[field.value]}
            required></TextField>
        ))}
      </>
    );
  }, [formFields, touched, errors, values]);

  const populateSelectFields = useMemo(() => {
    if (!formFields.selectFields || formFields.selectFields.length == 0) {
      return null;
    }
    const selectFields = formFields.selectFields;
    return (
      <>
        {selectFields.map((field: any) => (
          <FormControl key={field.id} required sx={{ my: 2 }}>
            <InputLabel id={`select-${field.label}`}>{field.label}</InputLabel>
            <Select
              labelId={`select-${field.label}`}
              id={field.id}
              label={field.label}
              name={field.name}
              size="medium"
              required
              tabIndex={0}
              color="primary"
              value={values[field.value]}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(errors[field.value]) && touched[field.value]}>
              {field.options}
            </Select>
            <FormHelperText className="Mui-error">
              {touched[field.value] && errors[field.value]}
            </FormHelperText>
          </FormControl>
        ))}
      </>
    );
  }, [[formFields, touched, errors, values]]);

  return (
    <>
      <Typography variant="h4" component="h2">
        {formTitle}
      </Typography>
      <Box
        component={Form}
        noValidate
        display="flex"
        flexDirection="column"
        padding={2}>
        <>
          {populateTextFields}
          {populateSelectFields}
          {children}
        </>
        <Stack direction="row" alignSelf="center" gap={3} marginY={3}>
          <Fab
            variant="extended"
            size="medium"
            role="button"
            color="primary"
            type="submit"
            disabled={isSubmitting}
            sx={{ minWidth: "125px" }}
            aria-label="submit">
            <SaveAltRoundedIcon fontSize="small" sx={{ mr: 1 }} />
            {ctaLabel}
          </Fab>
          <Fab
            variant="extended"
            size="medium"
            role="button"
            color="secondary"
            type="button"
            disabled={isSubmitting}
            sx={{ minWidth: "125px" }}
            onClick={() => {
              // @ts-ignore
              router?.query?.slugs && router?.query?.slugs[0]
                ? router.push(router?.query?.slugs[0] as string)
                : router.back();
              updateFormLegends({ ...formLegends, isEdit: false });
            }}
            aria-label="cancel">
            <RestartAltRoundedIcon fontSize="small" sx={{ mr: 1 }} />
            Cancel
          </Fab>
        </Stack>
      </Box>
    </>
  );
};

export default FormLayout;
