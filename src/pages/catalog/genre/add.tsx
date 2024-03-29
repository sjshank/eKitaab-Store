import GenreForm from "@/components/genres/genre-form";
import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import React, { useCallback } from "react";
import Stack from "@mui/material/Stack";
import { addNewGenre } from "@/services/genres-api";
import { useRouter } from "next/router";
import { TGenre } from "@/types/book";
import useFormLegends from "@/hooks/useFormLegends";
import useInitialValues from "@/hooks/useInitialValues";

const CreateGenre: NextPageWithLayout<{}> = (): React.JSX.Element => {
  useFormLegends("Add New Genre", "Submit");
  const router = useRouter();

  const handleSubmitAction = useCallback(async (genre: TGenre) => {
    const response = await addNewGenre(genre.name);
    if (response.status == 201) {
      router.push("/catalog/genres");
    } else {
      const message = await response.json();
    }
  }, []);

  const initialValues = useInitialValues({
    genre: {} as TGenre,
    onSubmit: handleSubmitAction,
  });

  return (
    <Stack>
      <GenreForm {...initialValues} />
    </Stack>
  );
};

const CreateGenrePage = WithCatalogLayout(CreateGenre);

export default CreateGenrePage;
