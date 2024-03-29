import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

type TAlertProps = {
  children: React.ReactNode;
};

const MuiAlert: React.FunctionComponent<TAlertProps> = ({ children }) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert variant="outlined" severity="info">
        {children}
      </Alert>
    </Stack>
  );
};

export default MuiAlert;
