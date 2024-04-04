import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import React, { useCallback, useContext } from "react";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import { TAuthor } from "@/types/book";
import AuthorForm from "@/components/authors/author-form";
import { registerNewAuthor } from "@/services/authors-api";
import useFormLegends from "@/hooks/useFormLegends";
import useInitialValues from "@/hooks/useInitialValues";
import { AlertContext, TAlertContext } from "@/context/alert-context";
import { RECORD_SUCCESS_MSG } from "@/utils/constants";

const RegisterAuthor: NextPageWithLayout<{}> = () => {
  useFormLegends("Register New Author", "Submit");
  const router = useRouter();
  const { updateAlert } = useContext<TAlertContext>(AlertContext);

  const handleSubmitAction = useCallback(
    async (author: TAuthor, setIsSubmitting: (flag: boolean) => void) => {
      const response = await registerNewAuthor(author);
      if (response.status == 201) {
        updateAlert({
          show: true,
          message: RECORD_SUCCESS_MSG,
          type: "success",
        });
        router.push("/catalog/authors");
        setIsSubmitting(false);
      } else {
        const data = await response.json();
        updateAlert({ show: true, message: data.message, type: "error" });
      }
    },
    [router, updateAlert]
  );
  const initialValues = useInitialValues({
    author: {} as TAuthor,
    onSubmit: handleSubmitAction,
  });

  return (
    <Stack>
      <AuthorForm {...initialValues} />
    </Stack>
  );
};

const RegisterNewAuthorPage = WithCatalogLayout(RegisterAuthor);

export default RegisterNewAuthorPage;
