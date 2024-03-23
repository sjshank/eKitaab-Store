import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import { getBookDetailsById } from "@/services/books-api";
import { TBook, TBookInstance } from "@/types/book";
import { Stack } from "@mui/joy";
import type { GetServerSideProps } from "next";
import React from "react";
import BookCopies from "@/components/books/book-copies-table";
import WithDetailLayoutWrapper from "@/hoc/withDetailLayout";
import BookDetailSummary from "@/components/common/book-detail-summary";

type TBookDetail = {
  book: TBook;
  copies: TBookInstance[];
  title: string;
};

const BookDetail: NextPageWithLayout<TBookDetail> = ({
  book,
  copies,
  title,
}: TBookDetail) => {
  return (
    <Stack>
      <BookDetailSummary {...book} />
      <BookCopies copies={copies} />
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  const { params } = context;
  const { book, copies } = await getBookDetailsById(params?.id);
  return {
    props: {
      book,
      copies,
      title: book.title,
    },
  };
};

const BookDetailsPage = WithCatalogLayout(WithDetailLayoutWrapper(BookDetail));

export default BookDetailsPage;
