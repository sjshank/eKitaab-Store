import React from "react";
import Typography from "@mui/material/Typography";

type THeaderProps<T> = {
  subHeader?: T;
};

const Header: React.FunctionComponent<THeaderProps<string>> = ({
  subHeader,
}): React.JSX.Element => {
  return (
    <>
      {subHeader && (
        <Typography variant="h4" component="summary" data-testid="sub-header">
          {subHeader}
        </Typography>
      )}
    </>
  );
};

export default Header;
