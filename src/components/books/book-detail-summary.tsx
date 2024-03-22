import { TBook } from "@/types/book";
import React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const EachSummaryItem: React.FunctionComponent<{
  label: string;
  value: any;
}> = ({ label, value }): React.JSX.Element => (
  <ListItem>
    <ListItemText>
      <Typography variant="subtitle2" component="strong">
        {label} :{" "}
      </Typography>
      <Typography
        variant="body2"
        component="span"
        color="text.secondary"
        fontSize="0.95rem">
        {value}
      </Typography>
    </ListItemText>
  </ListItem>
);

const BookDetailSummary: React.FunctionComponent<TBook> = (
  book: TBook
): React.JSX.Element => {
  return (
    <List>
      <EachSummaryItem
        label="Author"
        value={`${book.author.first_name}, ${book.author.family_name}`}
      />
      <EachSummaryItem label="Summary" value={book.summary} />
      <EachSummaryItem label="ISBN" value={book.isbn} />
      <EachSummaryItem
        label="Genre"
        value={book.genre.map((g) => g.name).join(", ")}
      />
    </List>
  );
};

export default BookDetailSummary;
