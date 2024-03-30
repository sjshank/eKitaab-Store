import React from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled, TableCellProps, PaperProps } from "@mui/material";

export const CustomizedTabHeaderCell = styled(TableCell)<TableCellProps>(
  () => ({
    "&.MuiTableCell-root": {
      padding: "8px",
      width: "15%",
    },
  })
);

export const CustomizedTabBodyCell = styled(TableCell)<TableCellProps>(() => ({
  "&.MuiTableCell-root": {
    padding: "8px",
    fontSize: "0.9rem",
    width: "15%",
  },
}));

export const CustomizedTableContainer = styled(Paper)<PaperProps>(() => ({
  "&.MuiPaper-root": {
    backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
    marginTop: "15px",
  },
}));

type TTableProps = {
  title: string;
  headers: string[];
  hasRecords: boolean;
  children: React.ReactNode;
};

const MuiTableContainer: React.FunctionComponent<TTableProps> = ({
  title = "",
  headers = [],
  hasRecords = false,
  children = null,
}): React.JSX.Element => {
  return (
    <TableContainer component={CustomizedTableContainer}>
      <Typography
        variant="subtitle2"
        component="div"
        align="center"
        padding={2}>
        <strong>{title}</strong>
      </Typography>
      <Table aria-label="catalog-table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <CustomizedTabHeaderCell key={header}>
                {header}
              </CustomizedTabHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!hasRecords && (
            <TableRow>
              <CustomizedTabBodyCell
                size="small"
                colSpan={4}
                align="center"
                sx={{ color: "text.secondary" }}>
                No data found
              </CustomizedTabBodyCell>
            </TableRow>
          )}
          {hasRecords && children}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MuiTableContainer;
