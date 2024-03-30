import { styled } from "@mui/material";
import InputLabel, { InputLabelProps } from "@mui/material/InputLabel";
import React from "react";

const CustomizedInputLabel = styled(InputLabel)<InputLabelProps>(
  ({ theme }) => ({
    "&.MuiFormLabel-root": {
      color: theme.palette.primary.main,
    },
  })
);

const MuiInputLabel: React.FunctionComponent<InputLabelProps> = (
  inputLabelProps: InputLabelProps
): React.JSX.Element => {
  return (
    <CustomizedInputLabel {...inputLabelProps}>
      {inputLabelProps.children}
    </CustomizedInputLabel>
  );
};

export default MuiInputLabel;
