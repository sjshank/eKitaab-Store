import { TBookInstance } from "@/types/book";
import { Box } from "@mui/joy";
import React from "react";
import TableRow from "@mui/material/TableRow";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import {
  BOOK_COPIES_TABLE_HEADER,
  STATUS_IDENTITY_MAP,
} from "@/utils/constants";
import MuiTableContainer, {
  CustomizedTabBodyCell,
} from "@/ui/MuiTableContainer";

const BookCopies: React.FunctionComponent<{ copies: TBookInstance[] }> = ({
  copies,
}): React.JSX.Element => {
  return (
    <Box component="article" padding={1}>
      <MuiTableContainer
        title="COPIES"
        headers={BOOK_COPIES_TABLE_HEADER}
        hasRecords={copies.length > 0}>
        {copies.length > 0 &&
          copies.map((copy) => (
            <TableRow key={copy._id}>
              <CustomizedTabBodyCell size="small">
                <Link
                  href={`/catalog/bookinstance/${copy._id}`}
                  component={NextLink}
                  role="link"
                  tabIndex={0}
                  color="text.primary"
                  title="View Copy Details">
                  {copy._id}
                </Link>
              </CustomizedTabBodyCell>
              <CustomizedTabBodyCell
                size="small"
                sx={{ color: `${STATUS_IDENTITY_MAP[copy.status]}` }}>
                {copy.status}
              </CustomizedTabBodyCell>
              <CustomizedTabBodyCell size="small">
                <span className="char-truncate-one-line">{copy.imprint}</span>
              </CustomizedTabBodyCell>
              <CustomizedTabBodyCell size="small">
                {new Date(copy.due_back).toDateString()}
              </CustomizedTabBodyCell>
            </TableRow>
          ))}
      </MuiTableContainer>
    </Box>
  );
};

export default BookCopies;
