import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import { TGenre, TBook } from "@/types/book";
import type { GetStaticProps, GetStaticPaths } from "next";
import React from "react";
import Stack from "@mui/material/Stack";
import BooksTable from "@/components/common/books-table";
import {
  getGenreDetailsById,
  retrieveAllRegisteredGenres,
} from "@/services/genres-api";
import WithDetailLayoutWrapper from "@/hoc/withDetailLayout";

type TGenreDetail = {
  genre: TGenre;
  books: TBook[];
  title: string;
};

const GenreDetailPage: NextPageWithLayout<TGenreDetail> = ({
  genre,
  books,
  title,
}: TGenreDetail): React.JSX.Element => {
  return (
    <Stack>
      <BooksTable books={books} />
    </Stack>
  );
};

export const getStaticProps: GetStaticProps = (async (context) => {
  const { params } = await context;
  const { genre, books } = await getGenreDetailsById(params?.id);
  return {
    props: {
      genre,
      books,
      title: genre.name,
    },
  };
}) satisfies GetStaticProps<TGenreDetail>;

export const getStaticPaths = (async () => {
  const response = await retrieveAllRegisteredGenres();
  const paths = await response.map((genre) => ({ params: { id: genre._id } }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export default WithCatalogLayout(WithDetailLayoutWrapper(GenreDetailPage));
