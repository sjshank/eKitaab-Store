import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import React, { useCallback } from "react";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import { TBook, TBookInstance, TBookInstanceFormFields } from "@/types/book";
import {
  createNewBookInstance,
  retrieveAllBooksFromCatalog,
} from "@/services/books-api";
import { GetStaticProps } from "next";
import BookInstanceForm, {
  TBookInstanceFormProps,
} from "@/components/instances/book-instance-form";
import useFormLegends from "@/hooks/useFormLegends";
import useInitialValues from "@/hooks/useInitialValues";

type TRegisterBookProps = {
  books: TBook[];
};

const CreateBookInstance: NextPageWithLayout<TRegisterBookProps> = ({
  books,
}) => {
  useFormLegends("Create New Book Instance", "Submit");
  const router = useRouter();

  const handleSubmitAction = useCallback(
    async (bookInstanceFormFieldValues: TBookInstanceFormFields) => {
      const response = await createNewBookInstance(bookInstanceFormFieldValues);
      if (response.status == 201) {
        router.push("/catalog/bookinstances");
      } else {
        console.log(await response.json());
      }
    },
    []
  );
  const initialValues = useInitialValues({
    bookInstance: {} as TBookInstance,
    onSubmit: handleSubmitAction,
    books: books,
  });

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
