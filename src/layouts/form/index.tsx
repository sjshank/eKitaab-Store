import React, { useContext } from "react";
import { FormikProps, Form, FormikValues } from "formik";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import { useRouter } from "next/router";
import { FormContext, TFormContext } from "@/context/form-context";
import SaveAltRoundedIcon from "@mui/icons-material/SaveAltRounded";

type TFormProps = {
  children?: React.ReactNode;
  formikProps: FormikProps<FormikValues> & any;
};

const FormLayout: React.FunctionComponent<TFormProps> = ({
  children = null,
  formikProps,
}) => {
  const router = useRouter();
  const { formLegends, updateFormLegends } =
    useContext<TFormContext>(FormContext);
  const { formTitle, ctaLabel } = formLegends;
  const { isSubmitting } = formikProps;

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
        {children}
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
