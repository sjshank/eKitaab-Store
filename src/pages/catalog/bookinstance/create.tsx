import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import React, { useCallback, useContext } from "react";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import { TBook, TBookInstance, TBookInstanceFormFields } from "@/types/book";
import {
  createNewBookInstance,
  retrieveAllBooksFromCatalog,
} from "@/services/books-api";
import { GetStaticProps } from "next";
import BookInstanceForm from "@/components/instances/book-instance-form";
import useFormLegends from "@/hooks/useFormLegends";
import useInitialValues from "@/hooks/useInitialValues";
import { AlertContext, TAlertContext } from "@/context/alert-context";
import { RECORD_SUCCESS_MSG } from "@/utils/constants";

type TRegisterBookProps = {
  books: TBook[];
};

const CreateBookInstance: NextPageWithLayout<TRegisterBookProps> = ({
  books,
}) => {
  useFormLegends("Create New Book Instance", "Submit");
  const router = useRouter();
  const { updateAlert } = useContext<TAlertContext>(AlertContext);

  const handleSubmitAction = useCallback(
    async (
      bookInstanceFormFieldValues: TBookInstanceFormFields,
      setIsSubmitting: (flag: boolean) => void
    ) => {
      const response = await createNewBookInstance(bookInstanceFormFieldValues);
      if (response.status == 201) {
        updateAlert({
          show: true,
          message: RECORD_SUCCESS_MSG,
          type: "success",
        });
        router.push("/catalog/bookinstances");
        setIsSubmitting(false);
      } else {
        const data = await response.json();
        updateAlert({ show: true, message: data.message, type: "error" });
      }
    },
    [router, updateAlert]
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
