import React from "react";
import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import { TBookInstance } from "@/types/book";
import { retrieveAllBookInstancesFromCatalog } from "@/services/books-api";
import type { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import MuiSkeleton from "@/ui/MuiSkeleton";

const BookInstanceList: NextPageWithLayout<{
  bookInstances: TBookInstance[];
}> = ({
  bookInstances,
}: {
  bookInstances: TBookInstance[];
}): React.JSX.Element => {
  let MuiConnectedListLazy = null;

  if (bookInstances.length > 0) {
    MuiConnectedListLazy = dynamic(() => import("@/ui/MuiConnectedList"), {
      loading: () => <MuiSkeleton />,
      ssr: false,
    });
  }
  return (
    <>
      {MuiConnectedListLazy && (
        <MuiConnectedListLazy
          list={bookInstances}
          href="/catalog/bookinstance/"
          titleIdentifierKey="title"
        />
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  bookInstances: TBookInstance[];
}> = async () => {
  const response =
    (await retrieveAllBookInstancesFromCatalog()) as TBookInstance[];
  return {
    props: {
      bookInstances: response,
    },
    revalidate: 5,
  };
};

const BookInstancesPage = WithCatalogLayout(BookInstanceList, {
  subHeader: "Book Instance List",
});

export default BookInstancesPage;
