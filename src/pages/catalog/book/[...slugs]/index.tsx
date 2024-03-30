import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import {
  deleteBookById,
  getBookDetailsById,
  updateBookDetailsById,
} from "@/services/books-api";
import {
  TAuthor,
  TBook,
  TBookInstance,
  TBookFormFields,
  TGenre,
} from "@/types/book";
import { Stack } from "@mui/joy";
import type { GetServerSideProps } from "next";
import React, { useCallback, useContext } from "react";
import BookCopies from "@/components/books/book-copies-table";
import WithDetailLayoutWrapper from "@/hoc/withDetailLayout";
import BookDetailSummary from "@/components/common/book-detail-summary";
import { retrieveAllRegisteredAuthors } from "@/services/authors-api";
import { retrieveAllRegisteredGenres } from "@/services/genres-api";
import { useRouter } from "next/router";
import { FormContext, TFormContext } from "@/context/form-context";
import BookForm from "@/components/books/book-form";
import useFormLegends from "@/hooks/useFormLegends";
import usePerformDelete from "@/hooks/usePerformDelete";
import useInitialValues from "@/hooks/useInitialValues";

type TBookDetail = {
  book: TBook;
  authors: TAuthor[];
  genres: TGenre[];
  copies: TBookInstance[];
  title: string;
};

const BookDetail: NextPageWithLayout<TBookDetail> = ({
  book,
  copies,
  title,
  authors,
  genres,
}: TBookDetail) => {
  useFormLegends("Update Book Details", "Update");
  usePerformDelete(deleteBookById.bind(null, book._id), "books");

  const router = useRouter();
  const { formLegends, updateFormLegends } =
    useContext<TFormContext>(FormContext);
  const { isEdit } = formLegends;

  const handleSubmitAction = useCallback(
    async (book: TBookFormFields) => {
      const response = await updateBookDetailsById(book);
      if (response.status == 202) {
        router.push(book._id);
        updateFormLegends({ ...formLegends, isEdit: false });
      } else {
        console.log(await response.json());
      }
    },
    [book.author, book.genre, book.isbn, book.summary, book.title]
  );

  const initialValues = useInitialValues({
    book: {
      ...book,
      genre: book.genre.map((g) => g._id),
      author: book.author._id,
    },
    onSubmit: handleSubmitAction,
    authors: authors,
    genres: genres,
  });

  return (
    <Stack>
      {!isEdit && (
        <>
          <BookDetailSummary book={book} />
          <BookCopies copies={copies} />
        </>
      )}
      {isEdit && <BookForm {...initialValues} />}
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps<TBookDetail> = (async (
  context
) => {
  const { res, params } = context;
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=20, stale-while-revalidate=30"
  );

  const { book, copies } = await getBookDetailsById(
    params?.slugs?.[0] as string
  );

  const authors = await retrieveAllRegisteredAuthors();
  const genres = await retrieveAllRegisteredGenres();

  return {
    props: {
      book,
      copies,
      authors,
      genres,
      title: book.title,
    },
  };
}) as GetServerSideProps<TBookDetail>;

const BookDetailsPage = WithCatalogLayout(WithDetailLayoutWrapper(BookDetail));

export default BookDetailsPage;
