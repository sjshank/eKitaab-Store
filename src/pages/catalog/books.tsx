import React from "react";
import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import { TAllBooks } from "@/types/book";
import { retrieveAllBooksFromCatalog } from "@/services/books-api";
import type { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import MuiSkeleton from "@/ui/MuiSkeleton";
import MuiConnectedList from "@/ui/MuiConnectedList";

const BookList: NextPageWithLayout<{ books: TAllBooks[] }> = ({
  books,
}: {
  books: TAllBooks[];
}): React.JSX.Element => {
  // let MuiConnectedListLazy = null;

  // if (books.length > 0) {
  //   MuiConnectedListLazy = dynamic(() => import("@/ui/MuiConnectedList"), {
  //     loading: () => <MuiSkeleton />,
  //     ssr: false,
  //   });
  // }
  return (
    <>
      {/* {MuiConnectedListLazy && ( */}
      <MuiConnectedList
        list={books}
        href="/catalog/book/"
        titleIdentifierKey="title"
      />
      {/* )} */}
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  books: TAllBooks[];
}> = async () => {
  const response = await retrieveAllBooksFromCatalog();
  return {
    props: {
      books: response,
    },
    revalidate: 5,
  };
};

const BooksPage = WithCatalogLayout(BookList, { subHeader: "Book List" });

export default BooksPage;
