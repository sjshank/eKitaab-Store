import React from "react";
import Typography from "@mui/material/Typography";

const Header: React.FunctionComponent<{ subHeader?: string }> = ({
  subHeader,
}): React.JSX.Element => {
  return (
    <>
      {subHeader && (
        <Typography variant="h4" component="summary">
          {subHeader}
        </Typography>
      )}
    </>
  );
};

export default Header;
