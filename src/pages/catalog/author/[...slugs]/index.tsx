import WithCatalogLayout from "@/hoc/withCatalogLayout";
import { NextPageWithLayout } from "@/layouts/root";
import { TAuthor, TBook } from "@/types/book";
import type { GetStaticProps, GetStaticPaths } from "next";
import React, { useCallback, useContext } from "react";
import {
  deleteAuthorById,
  getAuthorDetailsById,
  retrieveAllRegisteredAuthors,
  updateAuthorDetailsById,
} from "@/services/authors-api";
import Stack from "@mui/material/Stack";
import AuthorDetailSummary from "@/components/authors/author-detail-summary";
import BooksTable from "@/components/common/books-table";
import WithDetailLayoutWrapper from "@/hoc/withDetailLayout";
import { useRouter } from "next/router";
import AuthorForm from "@/components/authors/author-form";
import { FormContext, TFormContext } from "@/context/form-context";
import useFormLegends from "@/hooks/useFormLegends";
import usePerformDelete from "@/hooks/usePerformDelete";
import useInitialValues from "@/hooks/useInitialValues";
import MuiSkeleton from "@/ui/MuiSkeleton";
import { AlertContext, TAlertContext } from "@/context/alert-context";
import { RECORD_UPDATED_SUCCESS_MSG } from "@/utils/constants";

type TAuthorDetail = {
  author: TAuthor | null;
  books: TBook[];
  title: string;
};

const AuthorDetailPage: NextPageWithLayout<TAuthorDetail> = ({
  author,
  books,
  title,
}: TAuthorDetail) => {
  useFormLegends("Update Author Details", "Update");
  //@ts-ignore
  usePerformDelete(deleteAuthorById.bind(null, author._id), "authors");

  const router = useRouter();
  const { formLegends, updateFormLegends } =
    useContext<TFormContext>(FormContext);
  const { isEdit } = formLegends;
  const { updateAlert } = useContext<TAlertContext>(AlertContext);

  const handleSubmitAction = useCallback(
    async (author: TAuthor, setIsSubmitting: (flag: boolean) => void) => {
      const response = await updateAuthorDetailsById(author);
      if (response.status == 202) {
        updateAlert({
          show: true,
          message: RECORD_UPDATED_SUCCESS_MSG,
          type: "success",
        });
        router.push(author._id);
        setIsSubmitting(false);
        updateFormLegends({ ...formLegends, isEdit: false });
      } else {
        const data = await response.json();
        updateAlert({ show: true, message: data.message, type: "error" });
      }
    },
    //@ts-ignore
    [author, formLegends, router]
  );

  const initialValues = useInitialValues({
    author: { ...author },
    onSubmit: handleSubmitAction,
  });

  return (
    <Stack>
      {!author ?? <MuiSkeleton />}
      {!isEdit && (
        <>
          {/* @ts-ignore */}
          <AuthorDetailSummary {...author} />
          <BooksTable books={books} />
        </>
      )}
      {isEdit && <AuthorForm {...initialValues} />}
    </Stack>
  );
};

export const getStaticProps: GetStaticProps = (async (context) => {
  const { params } = await context;
  const { author, books } = await getAuthorDetailsById(
    params?.slugs?.[0] as string
  );
  return {
    props: {
      author,
      books,
      title: `${author.first_name}, ${author.family_name}`,
    },
    revalidate: 60,
  };
}) as GetStaticProps<TAuthorDetail>;

export const getStaticPaths = (async () => {
  const response = (await retrieveAllRegisteredAuthors()) as TAuthor[];
  const paths = await response.map((author) => ({
    params: { slugs: [author._id] },
  }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export default WithCatalogLayout(WithDetailLayoutWrapper(AuthorDetailPage));
