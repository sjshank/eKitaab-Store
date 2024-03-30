import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import { TAuthor, TBookFormFields, TGenre } from "@/types/book";
import BookForm from "@/components/books/book-form";
import { registerNewBook } from "@/services/books-api";
import { GetStaticProps } from "next";
import { retrieveAllRegisteredAuthors } from "@/services/authors-api";
import { retrieveAllRegisteredGenres } from "@/services/genres-api";
import useFormLegends from "@/hooks/useFormLegends";
import useInitialValues from "@/hooks/useInitialValues";
import { AlertContext, TAlertContext } from "@/context/alert-context";
import { RECORD_SUCCESS_MSG } from "@/utils/constants";

type TRegisterBookProps = {
  authors: TAuthor[];
  genres: TGenre[];
};

const RegisterBook: NextPageWithLayout<TRegisterBookProps> = ({
  authors,
  genres,
}) => {
  useFormLegends("Register New Book", "Submit");
  const router = useRouter();
  const { updateAlert } = useContext<TAlertContext>(AlertContext);

  const handleSubmitAction = async (
    bookFormFieldValues: TBookFormFields,
    setIsSubmitting: (flag: boolean) => void
  ) => {
    const response = await registerNewBook(bookFormFieldValues);
    if (response.status == 201) {
      updateAlert({
        show: true,
        message: RECORD_SUCCESS_MSG,
        type: "success",
      });
      router.push("/catalog/books");
      setIsSubmitting(false);
    } else {
      const data = await response.json();
      updateAlert({ show: true, message: data.message, type: "error" });
    }
  };

  const initialValues = useInitialValues({
    book: {
      _id: "",
      author: "",
      genre: [],
      isbn: "",
      summary: "",
      title: "",
    },
    onSubmit: handleSubmitAction,
    authors: authors,
    genres: genres,
  });

  return (
    <Stack>
      <BookForm {...initialValues} />
    </Stack>
  );
};

export const getStaticProps: GetStaticProps<{
  authors: TAuthor[];
}> = async () => {
  const authors = await retrieveAllRegisteredAuthors();
  const genres = await retrieveAllRegisteredGenres();

  return {
    props: {
      authors: authors,
      genres: genres,
    },
    revalidate: 3600,
  };
};

const RegisterNewBookPage = WithCatalogLayout(RegisterBook);

export default RegisterNewBookPage;
