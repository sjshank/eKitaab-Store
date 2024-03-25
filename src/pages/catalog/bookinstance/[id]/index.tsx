import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import { getBookInstanceDetailsById } from "@/services/books-api";
import { TBook, TBookInstance } from "@/types/book";
import { Box, Stack } from "@mui/joy";
import type { GetServerSideProps } from "next";
import React from "react";
import WithDetailLayoutWrapper from "@/hoc/withDetailLayout";
import BookDetailSummary from "@/components/common/book-detail-summary";
import BookInstanceSummary from "@/components/instances/book-instance-summary";
import Typography from "@mui/material/Typography";

type TBookInstanceDetail = {
  book: TBook;
  copy: TBookInstance;
  title: string;
};

const BookInstance: NextPageWithLayout<TBookInstanceDetail> = ({
  book,
  copy,
  title,
}: TBookInstanceDetail) => {
  return (
    <Stack>
      <BookInstanceSummary {...copy} />
      <Typography
        variant="subtitle2"
        component="div"
        align="left"
        sx={{ textDecoration: "underline", pl: 2, pt: 1 }}>
        <strong>BOOK DETAILS</strong>
      </Typography>
      <Box marginLeft={1}>
        <BookDetailSummary {...book} />
      </Box>
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  const { res, req, params } = context;
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=20, stale-while-revalidate=30"
  );
  const { book, copy } = await getBookInstanceDetailsById(params?.id);
  return {
    props: {
      book,
      copy,
      title: `${book.title} : ${copy.status}`,
    },
  };
};

const BookInstancePage = WithCatalogLayout(
  WithDetailLayoutWrapper(BookInstance)
);

export default BookInstancePage;
