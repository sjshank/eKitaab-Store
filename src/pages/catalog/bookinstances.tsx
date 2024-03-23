import React from "react";
import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import { TBookInstance } from "@/types/book";
import { retrieveAllBookInstancesFromCatalog } from "@/services/books-api";
import type { GetStaticProps } from "next";
import MuiConnectedList from "@/ui/MuiConnectedList";

const BookInstanceList: NextPageWithLayout<{
  bookInstances: TBookInstance[];
}> = ({
  bookInstances,
}: {
  bookInstances: TBookInstance[];
}): React.JSX.Element => {
  return (
    <MuiConnectedList
      list={bookInstances}
      href="/catalog/bookinstance/"
      titleIdentifierKey="title"
    />
  );
};

export const getStaticProps: GetStaticProps<{
  bookInstances: TBookInstance[];
}> = async () => {
  const response = await retrieveAllBookInstancesFromCatalog();
  return {
    props: {
      bookInstances: response,
    },
    revalidate: 30,
  };
};

const BookInstancesPage = WithCatalogLayout(BookInstanceList, {
  subHeader: "Book Instance List",
});

export default BookInstancesPage;
