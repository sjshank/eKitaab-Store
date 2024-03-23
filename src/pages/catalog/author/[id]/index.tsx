import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import { TAuthor, TBook } from "@/types/book";
import type { GetServerSideProps } from "next";
import React from "react";
import { getAuthorDetailsById } from "@/services/authors-api";
import Stack from "@mui/material/Stack";
import AuthorDetailSummary from "@/components/authors/author-detail-summary";
import BooksTable from "@/components/common/books-table";
import WithDetailLayoutWrapper from "@/hoc/withDetailLayout";

type TAuthorDetail = {
  author: TAuthor;
  books: TBook[];
  title: string;
};

const AuthorDetailPage: NextPageWithLayout<TAuthorDetail> = ({
  author,
  books,
  title,
}: TAuthorDetail) => {
  return (
    <Stack>
      <AuthorDetailSummary {...author} />
      <BooksTable books={books} />
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = (async (context) => {
  const { params } = context;
  const { author, books } = await getAuthorDetailsById(params?.id);
  return {
    props: {
      author,
      books,
      title: `${author.family_name}, ${author.first_name}`,
    },
  };
}) satisfies GetServerSideProps<TAuthorDetail>;

export default WithCatalogLayout(WithDetailLayoutWrapper(AuthorDetailPage));
