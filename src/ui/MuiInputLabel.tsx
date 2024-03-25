import { styled } from "@mui/material";
import InputLabel, { InputLabelProps } from "@mui/material/InputLabel";

const CustomizedInputLabel = styled(InputLabel)<InputLabelProps>(
  ({ theme }) => ({
    "&.MuiFormLabel-root": {
      color: theme.palette.primary.main,
    },
  })
);

const MuiInputLabel = (inputLabelProps: InputLabelProps) => {
  return (
    <CustomizedInputLabel {...inputLabelProps}>
      {inputLabelProps.children}
    </CustomizedInputLabel>
  );
};

export default MuiInputLabel;
