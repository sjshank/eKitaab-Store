import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import { TGenre } from "@/types/book";
import React from "react";
import type { GetStaticProps } from "next";
import { retrieveAllRegisteredGenres } from "@/services/genres-api";
import dynamic from "next/dynamic";
import MuiSkeleton from "@/ui/MuiSkeleton";

const GenreList: NextPageWithLayout<{ genres: TGenre[] }> = ({
  genres,
}): React.JSX.Element => {
  let MuiConnectedListLazy = null;

  if (genres.length > 0) {
    MuiConnectedListLazy = dynamic(() => import("@/ui/MuiConnectedList"), {
      loading: () => <MuiSkeleton />,
      ssr: false,
    });
  }

  return (
    <>
      {MuiConnectedListLazy && (
        <MuiConnectedListLazy
          list={genres}
          href="/catalog/genre/"
          titleIdentifierKey="name"
        />
      )}
    </>
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
