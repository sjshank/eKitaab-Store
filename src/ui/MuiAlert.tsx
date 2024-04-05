import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { AlertContext, TAlertContext } from "@/context/alert-context";

const MuiAlert: React.FunctionComponent<{}> = () => {
  const { alert } = React.useContext<TAlertContext>(AlertContext);
  return (
    <>
      {alert?.show && (
        <Box component="div" id="snackbar" className={alert.show ? "show" : ""}>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert variant="filled" severity={alert.type} data-testid="alert">
              {alert?.message}
            </Alert>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default MuiAlert;
