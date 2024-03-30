import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import { TGenre } from "@/types/book";
import MuiConnectedList from "@/ui/MuiConnectedList";
import React from "react";
import type { GetStaticProps } from "next";
import { retrieveAllRegisteredGenres } from "@/services/genres-api";

const GenreList: NextPageWithLayout<{ genres: TGenre[] }> = ({
  genres,
}): React.JSX.Element => {
  return (
    <MuiConnectedList
      list={genres}
      href="/catalog/genre/"
      titleIdentifierKey="name"
    />
  );
};

export const getStaticProps: GetStaticProps = (async () => {
  const response = (await retrieveAllRegisteredGenres()) as TGenre[];
  return {
    props: {
      genres: response,
    },
    revalidate: 5,
  };
}) satisfies GetStaticProps<{
  genres: TGenre[];
}>;

const GenresPage = WithCatalogLayout(GenreList, { subHeader: "Genre List" });

export default GenresPage;
