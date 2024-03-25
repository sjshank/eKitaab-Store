import GenreForm, { TGenreFormProps } from "@/components/genres/genre-form";
import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import React, { useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { addNewGenre } from "@/services/genres-api";
import { useRouter } from "next/router";
import { TGenre } from "@/types/book";
import { FormContext, TFormContext } from "@/context/form-context";

const CreateGenre: NextPageWithLayout<{}> = () => {
  const router = useRouter();
  const { formLegends, updateFormLegends } =
    useContext<TFormContext>(FormContext);

  useEffect(() => {
    updateFormLegends({
      ...formLegends,
      formTitle: "Add New Genre",
      ctaLabel: "Submit",
    });
  }, []);

  const handleSubmitAction = async (genre: TGenre) => {
    const response = await addNewGenre(genre.name);
    if (response) {
      router.push("/catalog/genres");
    }
  };
  const initialValues: TGenreFormProps = {
    genre: { _id: "", name: "" },
    onSubmit: handleSubmitAction,
  };
  return (
    <Stack>
      <GenreForm {...initialValues} />
    </Stack>
  );
};

const CreateGenrePage = WithCatalogLayout(CreateGenre);

export default CreateGenrePage;
