import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import React, { useCallback } from "react";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import { TAuthor } from "@/types/book";
import AuthorForm from "@/components/authors/author-form";
import { registerNewAuthor } from "@/services/authors-api";
import useFormLegends from "@/hooks/useFormLegends";
import useInitialValues from "@/hooks/useInitialValues";

const RegisterAuthor: NextPageWithLayout<{}> = () => {
  useFormLegends("Register New Author", "Submit");
  const router = useRouter();

  const handleSubmitAction = useCallback(async (author: TAuthor) => {
    const response = await registerNewAuthor(author);
    if (response.status == 201) {
      router.push("/catalog/authors");
    } else {
      console.log(await response.json());
    }
  }, []);
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
