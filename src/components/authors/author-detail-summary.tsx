import { TAuthor } from "@/types/book";
import React from "react";
import List from "@mui/material/List";
import MuiSummaryItem from "@/ui/MuiSummaryItem";

const AuthorDetailSummary: React.FunctionComponent<TAuthor> = (
  author: TAuthor
): React.JSX.Element => {
  return (
    <List>
      <MuiSummaryItem
        label="Date Of Birth"
        value={new Date(author.date_of_birth).toDateString()}
      />
      {author.date_of_death && (
        <MuiSummaryItem
          label="Date Of Death"
          value={new Date(author.date_of_death).toDateString()}
        />
      )}
    </List>
  );
};

export default AuthorDetailSummary;
