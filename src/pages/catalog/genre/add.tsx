import GenreForm from "@/components/genres/genre-form";
import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import React, { useCallback, useContext } from "react";
import Stack from "@mui/material/Stack";
import { addNewGenre } from "@/services/genres-api";
import { useRouter } from "next/router";
import { TGenre } from "@/types/book";
import useFormLegends from "@/hooks/useFormLegends";
import useInitialValues from "@/hooks/useInitialValues";
import { AlertContext, TAlertContext } from "@/context/alert-context";
import { RECORD_SUCCESS_MSG } from "@/utils/constants";

const CreateGenre: NextPageWithLayout<{}> = (): React.JSX.Element => {
  useFormLegends("Add New Genre", "Submit");
  const router = useRouter();
  const { updateAlert } = useContext<TAlertContext>(AlertContext);

  const handleSubmitAction = useCallback(
    async (genre: TGenre, setIsSubmitting: (flag: boolean) => void) => {
      const response = await addNewGenre(genre.name);
      if (response.status == 201) {
        updateAlert({
          show: true,
          message: RECORD_SUCCESS_MSG,
          type: "success",
        });
        router.push("/catalog/genres");
        setIsSubmitting(false);
      } else {
        const data = await response.json();
        updateAlert({ show: true, message: data.message, type: "error" });
      }
    },
    [updateAlert]
  );

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
