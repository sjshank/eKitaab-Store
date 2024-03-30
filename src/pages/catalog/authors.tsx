import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import React from "react";
import type { GetStaticProps } from "next";
import { TAuthor } from "@/types/book";
import { retrieveAllRegisteredAuthors } from "@/services/authors-api";
import dynamic from "next/dynamic";
import MuiSkeleton from "@/ui/MuiSkeleton";

const AuthorList: NextPageWithLayout<{ authors: TAuthor[] }> = ({
  authors,
}): React.JSX.Element => {
  let MuiConnectedListLazy = null;

  if (authors.length > 0) {
    MuiConnectedListLazy = dynamic(() => import("@/ui/MuiConnectedList"), {
      loading: () => <MuiSkeleton />,
      ssr: false,
    });
  }
  return (
    <>
      {MuiConnectedListLazy && (
        <MuiConnectedListLazy
          list={authors}
          href="/catalog/author/"
          titleIdentifierKey="fullName"
        />
      )}
    </>
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
    revalidate: 5,
  };
};

const AuthorsPage = WithCatalogLayout(AuthorList, { subHeader: "Author List" });

export default AuthorsPage;
