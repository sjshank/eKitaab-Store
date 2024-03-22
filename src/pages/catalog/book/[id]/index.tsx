import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import { getBookDetailsById } from "@/services/books-api";
import { TBook, TBookInstance } from "@/types/book";
import { Box, Stack } from "@mui/joy";
import type { GetServerSideProps } from "next";
import React from "react";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import BookDetailSummary from "@/components/books/book-detail-summary";
import BookCopies from "@/components/books/book-copies-table";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import { useRouter } from "next/router";

type TBookDetail = {
  book: TBook;
  copies: TBookInstance[];
};

const BookDetail: NextPageWithLayout<TBookDetail> = ({
  book,
  copies,
}: TBookDetail) => {
  const router = useRouter();
  return (
    <Box component="article">
      <Typography variant="h5" component="h2">
        {book.title}
      </Typography>
      <Stack>
        <BookDetailSummary {...book} />
        <BookCopies copies={copies} />
      </Stack>
      <Stack direction="row" justifyContent="center" gap={2} marginTop={4}>
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          onClick={() => router.push(`${router.asPath}/update`)}>
          <EditNoteRoundedIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </Fab>
        <Fab variant="extended" size="medium" color="error">
          <DeleteSweepRoundedIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </Fab>
      </Stack>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  const { params } = context;
  const { book, copies } = await getBookDetailsById(params?.id);
  return {
    props: {
      book,
      copies,
    },
  };
};

const BookDetailsPage = WithCatalogLayout(BookDetail);

export default BookDetailsPage;
