import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import React from "react";
import type { GetStaticProps } from "next";
import { TAuthor } from "@/types/book";
import { retrieveAllRegisteredAuthors } from "@/services/authors-api";
import MuiConnectedList from "@/ui/MuiConnectedList";

const AuthorList: NextPageWithLayout<{ authors: TAuthor[] }> = ({
  authors,
}): React.JSX.Element => {
  return (
    <MuiConnectedList
      list={authors}
      href="/catalog/author/"
      titleIdentifierKey="fullName"
    />
  );
};

export const getStaticProps: GetStaticProps<{
  authors: TAuthor[];
}> = async () => {
  const response = (await retrieveAllRegisteredAuthors()) as TAuthor[];
  return {
    props: {
      authors: response,
    },
    revalidate: 30,
  };
};

const AuthorsPage = WithCatalogLayout(AuthorList, { subHeader: "Author List" });

export default AuthorsPage;
