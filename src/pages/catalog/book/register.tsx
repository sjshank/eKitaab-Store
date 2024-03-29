import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import React from "react";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import { TAuthor, TBookFormFields, TGenre } from "@/types/book";
import BookForm, { TBookFormProps } from "@/components/books/book-form";
import { registerNewBook } from "@/services/books-api";
import { GetStaticProps } from "next";
import { retrieveAllRegisteredAuthors } from "@/services/authors-api";
import { retrieveAllRegisteredGenres } from "@/services/genres-api";
import useFormLegends from "@/hooks/useFormLegends";
import useInitialValues from "@/hooks/useInitialValues";

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

  const handleSubmitAction = async (bookFormFieldValues: TBookFormFields) => {
    const response = await registerNewBook(bookFormFieldValues);
    if (response) {
      router.push("/catalog/books");
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
