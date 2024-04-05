import React from "react";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const MuiSummaryItem: React.FunctionComponent<{
  label: string;
  value?: string | number | boolean | undefined | null;
  children?: React.ReactNode;
}> = ({ label, value = "", children = null }): React.JSX.Element => (
  <ListItem>
    <ListItemText>
      <Typography variant="subtitle2" component="strong" role="strong">
        {label} :{" "}
      </Typography>
      {children === null && (
        <Typography
          variant="body2"
          component="span"
          color="text.secondary"
          data-testid="item-value"
          fontSize="0.95rem">
          {value}
        </Typography>
      )}
      {children}
    </ListItemText>
  </ListItem>
);

export default MuiSummaryItem;
