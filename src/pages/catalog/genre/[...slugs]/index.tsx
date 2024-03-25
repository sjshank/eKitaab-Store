import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import { TGenre, TBook } from "@/types/book";
import type { GetStaticProps, GetStaticPaths } from "next";
import React, { useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import BooksTable from "@/components/common/books-table";
import {
  getGenreDetailsById,
  retrieveAllRegisteredGenres,
  updateGenreById,
} from "@/services/genres-api";
import WithDetailLayoutWrapper from "@/hoc/withDetailLayout";
import GenreForm, { TGenreFormProps } from "@/components/genres/genre-form";
import { useRouter } from "next/router";
import { FormContext, TFormContext } from "@/context/form-context";

type TGenreDetail = {
  genre: TGenre;
  books: TBook[];
  title: string;
};

const GenreDetail: NextPageWithLayout<TGenreDetail> = ({
  genre,
  books,
  title,
}: TGenreDetail): React.JSX.Element => {
  const router = useRouter();
  const { formLegends, updateFormLegends } =
    useContext<TFormContext>(FormContext);
  const { isEdit } = formLegends;

  useEffect(() => {
    updateFormLegends({
      ...formLegends,
      formTitle: "Update Genre",
      ctaLabel: "Update",
    });
  }, []);

  const handleSubmitAction = async (genre: TGenre) => {
    const response = await updateGenreById(genre);
    if (response) {
      router.push(genre._id);
      updateFormLegends({ ...formLegends, isEdit: false });
    }
  };
  const initialValues: TGenreFormProps = {
    genre: { ...genre },
    onSubmit: handleSubmitAction,
  };
  return (
    <Stack>
      {!isEdit && <BooksTable books={books} />}
      {isEdit && <GenreForm {...initialValues} />}
    </Stack>
  );
};

export const getStaticProps: GetStaticProps = (async (context) => {
  const { params } = await context;
  const { genre, books } = await getGenreDetailsById(
    params?.slugs?.[0] as string
  );
  return {
    props: {
      genre,
      books,
      title: genre.name,
    },
  };
}) as GetStaticProps<TGenreDetail>;

export const getStaticPaths = (async () => {
  const response = await retrieveAllRegisteredGenres();
  const paths = await response.map((genre) => ({
    params: { slugs: [genre._id] },
  }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

const GenreDetailPage = WithCatalogLayout(WithDetailLayoutWrapper(GenreDetail));

export default GenreDetailPage;
