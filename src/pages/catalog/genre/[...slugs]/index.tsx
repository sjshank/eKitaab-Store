import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import { TGenre, TBook } from "@/types/book";
import type { GetStaticProps, GetStaticPaths } from "next";
import React, { useCallback, useContext } from "react";
import Stack from "@mui/material/Stack";
import BooksTable from "@/components/common/books-table";
import {
  deleteGenreById,
  getGenreDetailsById,
  retrieveAllRegisteredGenres,
  updateGenreById,
} from "@/services/genres-api";
import WithDetailLayoutWrapper from "@/hoc/withDetailLayout";
import GenreForm from "@/components/genres/genre-form";
import { useRouter } from "next/router";
import { FormContext, TFormContext } from "@/context/form-context";
import useFormLegends from "@/hooks/useFormLegends";
import usePerformDelete from "@/hooks/usePerformDelete";
import useInitialValues from "@/hooks/useInitialValues";

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
  useFormLegends("Update Genre", "Update");
  usePerformDelete(deleteGenreById.bind(null, genre._id), "genres");

  const router = useRouter();
  const { formLegends, updateFormLegends } =
    useContext<TFormContext>(FormContext);
  const { isEdit } = formLegends;

  const handleSubmitAction = useCallback(
    async (genre: TGenre) => {
      const response = await updateGenreById(genre);
      if (response.status == 202) {
        router.push(genre._id);
        updateFormLegends({ ...formLegends, isEdit: false });
      } else {
        console.log(await response.json());
      }
    },
    [genre.name]
  );

  const initialValues = useInitialValues({
    genre: { ...genre },
    onSubmit: handleSubmitAction,
  });

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
    revalidate: 1,
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
