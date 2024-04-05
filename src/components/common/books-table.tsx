import { TBook } from "@/types/book";
import { Box } from "@mui/joy";
import React from "react";
import TableRow from "@mui/material/TableRow";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import { BOOKS_TABLE_HEADER } from "@/utils/constants";
import MuiTableContainer, {
  CustomizedTabBodyCell,
} from "@/ui/MuiTableContainer";

const BooksTable: React.FunctionComponent<{ books: TBook[] }> = ({
  books,
}): React.JSX.Element => {
  return (
    <Box component="article" padding={2}>
      <MuiTableContainer
        title="BOOKS"
        headers={BOOKS_TABLE_HEADER}
        hasRecords={books.length > 0}>
        {books.length > 0 &&
          books.map((book) => (
            <TableRow key={book._id}>
              <CustomizedTabBodyCell size="small">
                <Link
                  href={`/catalog/book/${book._id}`}
                  component={NextLink}
                  role="link"
                  tabIndex={0}
                  title="View Book Details">
                  {book.title}
                </Link>
              </CustomizedTabBodyCell>
              <CustomizedTabBodyCell size="small">
                <span
                  className="char-truncate-one-line"
                  data-testid="book-summary">
                  {book.summary}
                </span>
              </CustomizedTabBodyCell>
            </TableRow>
          ))}
      </MuiTableContainer>
    </Box>
  );
};

const MemoizedBooksTable = React.memo(BooksTable);
export default MemoizedBooksTable;
