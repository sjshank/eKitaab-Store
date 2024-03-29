import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import React, { useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import { TBook, TBookInstanceFormFields } from "@/types/book";
import { FormContext, TFormContext } from "@/context/form-context";
import {
  createNewBookInstance,
  retrieveAllBooksFromCatalog,
} from "@/services/books-api";
import { GetStaticProps } from "next";
import BookInstanceForm, {
  TBookInstanceFormProps,
} from "@/components/instances/book-instance-form";

type TRegisterBookProps = {
  books: TBook[];
};

const CreateBookInstance: NextPageWithLayout<TRegisterBookProps> = ({
  books,
}) => {
  const router = useRouter();
  const { formLegends, updateFormLegends } =
    useContext<TFormContext>(FormContext);

  useEffect(() => {
    updateFormLegends({
      ...formLegends,
      formTitle: "Create New Book Instance",
      ctaLabel: "Submit",
    });
  }, []);

  const handleSubmitAction = async (
    bookInstanceFormFieldValues: TBookInstanceFormFields
  ) => {
    const response = await createNewBookInstance(bookInstanceFormFieldValues);
    if (response) {
      router.push("/catalog/bookinstances");
    }
  };
  const initialValues: TBookInstanceFormProps = {
    bookInstance: {
      _id: "",
      book: "",
      due_back: "",
      status: "Available",
      imprint: "",
    },
    onSubmit: handleSubmitAction,
    books: books,
  };
  return (
    <Stack>
      <BookInstanceForm {...initialValues} />
    </Stack>
  );
};

export const getStaticProps: GetStaticProps<{
  books: TBook[];
}> = async () => {
  const books = await retrieveAllBooksFromCatalog();

  return {
    props: {
      books: books,
    },
    revalidate: 3600,
  };
};

const CreateNewBookInstancePage = WithCatalogLayout(CreateBookInstance);

export default CreateNewBookInstancePage;
