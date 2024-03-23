import { TBook } from "@/types/book";
import React from "react";
import List from "@mui/material/List";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import MuiSummaryItem from "@/ui/MuiSummaryItem";

const BookDetailSummary: React.FunctionComponent<TBook> = (
  book: TBook
): React.JSX.Element => {
  return (
    <List>
      <MuiSummaryItem label="Author">
        <Link
          href={`/catalog/author/${book.author._id}`}
          component={NextLink}
          role="link"
          tabIndex={0}
          title="View Author Details"
          sx={{ fontSize: 15 }}>
          {`${book.author.first_name},${book.author.family_name}`}
        </Link>
      </MuiSummaryItem>
      <MuiSummaryItem label="Summary" value={book.summary} />
      <MuiSummaryItem label="ISBN" value={book.isbn} />
      <MuiSummaryItem
        label="Genre"
        value={book.genre.map((g) => g.name).join(", ")}
      />
    </List>
  );
};

export default BookDetailSummary;
