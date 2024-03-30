import React from "react";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LocalLibraryRoundedIcon from "@mui/icons-material/LocalLibraryRounded";

const Header: React.FunctionComponent<{}> = (): React.JSX.Element => {
  return (
    <Stack
      marginTop={4}
      marginBottom={4}
      justifyContent="space-between"
      direction="row">
      <AppBar
        position="relative"
        sx={{
          textAlignLast: "left",
          textAlign: "left",
        }}>
        <Toolbar>
          <LocalLibraryRoundedIcon fontSize="large" />
          <Typography variant="h5" component="h1" marginTop={1} fontSize={30}>
            E-Kitaab Store
          </Typography>
        </Toolbar>
      </AppBar>
    </Stack>
  );
};

export default Header;
