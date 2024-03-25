import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import React, { useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import { TAuthor } from "@/types/book";
import AuthorForm, { TAuthorFormProps } from "@/components/authors/author-form";
import { registerNewAuthor } from "@/services/authors-api";
import { FormContext, TFormContext } from "@/context/form-context";

const RegisterAuthor: NextPageWithLayout<{}> = () => {
  const router = useRouter();
  const { formLegends, updateFormLegends } =
    useContext<TFormContext>(FormContext);

  useEffect(() => {
    updateFormLegends({
      ...formLegends,
      formTitle: "Register New Author",
      ctaLabel: "Submit",
    });
  }, []);

  const handleSubmitAction = async (author: TAuthor) => {
    const response = await registerNewAuthor(author);
    if (response) {
      router.push("/catalog/authors");
    }
  };
  const initialValues: TAuthorFormProps = {
    author: {
      _id: "",
      date_of_birth: "",
      date_of_death: "",
      family_name: "",
      first_name: "",
    },
    onSubmit: handleSubmitAction,
  };
  return (
    <Stack>
      <AuthorForm {...initialValues} />
    </Stack>
  );
};

const RegisterNewAuthorPage = WithCatalogLayout(RegisterAuthor);

export default RegisterNewAuthorPage;
