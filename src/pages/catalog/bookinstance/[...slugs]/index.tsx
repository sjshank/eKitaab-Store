import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import {
  deleteBookInstanceById,
  getBookInstanceDetailsById,
  retrieveAllBooksFromCatalog,
  updateBookInstanceDetailsById,
} from "@/services/books-api";
import { TBook, TBookInstance, TBookInstanceFormFields } from "@/types/book";
import { Stack } from "@mui/joy";
import type { GetServerSideProps } from "next";
import React, { useCallback, useContext } from "react";
import WithDetailLayoutWrapper from "@/hoc/withDetailLayout";
import BookDetailSummary from "@/components/common/book-detail-summary";
import { useRouter } from "next/router";
import { FormContext, TFormContext } from "@/context/form-context";
import BookInstanceForm from "@/components/instances/book-instance-form";
import BookInstanceSummary from "@/components/instances/book-instance-summary";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useFormLegends from "@/hooks/useFormLegends";
import usePerformDelete from "@/hooks/usePerformDelete";
import useInitialValues from "@/hooks/useInitialValues";

type TBookInstanceDetail = {
  bookInstance: TBookInstance;
  books: TBook[];
  title: string;
  book: TBook;
};

const BookInstanceDetail: NextPageWithLayout<TBookInstanceDetail> = ({
  bookInstance,
  books,
  title,
  book,
}: TBookInstanceDetail) => {
  useFormLegends("Update Book Instance Details", "Update");
  usePerformDelete(
    deleteBookInstanceById.bind(null, bookInstance._id),
    "bookinstances"
  );

  const router = useRouter();
  const { formLegends, updateFormLegends } =
    useContext<TFormContext>(FormContext);
  const { isEdit } = formLegends;

  const handleSubmitAction = useCallback(
    async (bookInstanceFormFieldValues: TBookInstanceFormFields) => {
      const response = await updateBookInstanceDetailsById(
        bookInstanceFormFieldValues
      );
      if (response) {
        router.push(bookInstance._id);
        updateFormLegends({ ...formLegends, isEdit: false });
      }
    },
    []
  );

  const initialValues = useInitialValues({
    bookInstance: {
      ...bookInstance,
      book: book._id,
    },
    onSubmit: handleSubmitAction,
    books: books,
  });

  return (
    <Stack>
      {!isEdit && (
        <>
          <BookInstanceSummary {...bookInstance} />
          <Typography
            variant="subtitle2"
            component="div"
            align="left"
            sx={{ textDecoration: "underline", pl: 2, pt: 1 }}>
            <strong>BOOK DETAILS</strong>
          </Typography>
          <Box marginLeft={1}>
            <BookDetailSummary {...book} />
          </Box>
        </>
      )}
      {isEdit && <BookInstanceForm {...initialValues} />}
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps<TBookInstanceDetail> =
  (async (context) => {
    const { res, params } = context;
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=20, stale-while-revalidate=30"
    );
    const { book, copy } = await getBookInstanceDetailsById(
      params?.slugs?.[0] as string
    );
    const books = await retrieveAllBooksFromCatalog();

    return {
      props: {
        bookInstance: copy,
        books: books,
        book: book,
        title: `Instance Id : ${copy._id}`,
      },
    };
  }) as GetServerSideProps<TBookInstanceDetail>;

const BookInstanceDetailsPage = WithCatalogLayout(
  WithDetailLayoutWrapper(BookInstanceDetail)
);

export default BookInstanceDetailsPage;
