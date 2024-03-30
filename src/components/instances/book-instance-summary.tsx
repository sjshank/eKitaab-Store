import { TBookInstance } from "@/types/book";
import React from "react";
import List from "@mui/material/List";
import MuiSummaryItem from "@/ui/MuiSummaryItem";
import { STATUS_IDENTITY_MAP } from "@/utils/constants";
import Typography from "@mui/material/Typography";

const BookInstanceSummary: React.FunctionComponent<TBookInstance> = (
  copy: TBookInstance
): React.JSX.Element => {
  return (
    <List>
      <MuiSummaryItem label="Imprint" value={copy.imprint} />
      <MuiSummaryItem label="Status">
        <Typography
          component="span"
          sx={{
            color: `${STATUS_IDENTITY_MAP[copy.status]}`,
            fontSize: "0.95rem",
          }}>
          {copy.status}
        </Typography>
      </MuiSummaryItem>
      {copy.due_back && (
        <MuiSummaryItem
          label="Due Date"
          value={new Date(copy.due_back).toDateString()}
        />
      )}
    </List>
  );
};

export default BookInstanceSummary;
